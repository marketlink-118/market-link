/**
 * MarketLink - Orders Management Context
 * Order state and customer history provider
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { customerOrdersAPI } from '../services/api';

const OrderContext = createContext(null);
const ORDERS_STORAGE_PREFIX = 'marketlink_orders_u';

export function OrderProvider({ children }) {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Clean up any legacy shared localStorage cache once
  useEffect(() => {
    try {
      localStorage.removeItem('marketlink_orders_list');
    } catch {
      // storage unavailable
    }
  }, []);

  // Load customer's live orders whenever currentUser changes
  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      if (!currentUser) {
        setOrders([]);
        return;
      }

      const storageKey = `${ORDERS_STORAGE_PREFIX}_${currentUser.id}`;
      // Load user-scoped cache immediately if available
      try {
        const cached = localStorage.getItem(storageKey);
        if (cached && isMounted) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setOrders(parsed);
          }
        }
      } catch {
        // ignore cache parse error
      }

      const token = localStorage.getItem('marketlink_token');
      if (token && !token.startsWith('offline_')) {
        setLoading(true);
        try {
          const liveOrders = await customerOrdersAPI.getMyOrders();
          if (isMounted) {
            const finalOrders = Array.isArray(liveOrders) ? liveOrders : [];
            setOrders(finalOrders);
            try {
              localStorage.setItem(storageKey, JSON.stringify(finalOrders));
            } catch {
              // ignore
            }
          }
        } catch (err) {
          console.warn('Could not load live orders:', err);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    }

    loadOrders();
    return () => { isMounted = false; };
  }, [currentUser?.id]);

  // Sync state to current user's scoped storage
  useEffect(() => {
    if (!currentUser?.id) return;
    try {
      const storageKey = `${ORDERS_STORAGE_PREFIX}_${currentUser.id}`;
      localStorage.setItem(storageKey, JSON.stringify(orders));
    } catch {
      // storage unavailable
    }
  }, [orders, currentUser?.id]);

  /**
   * Inject orders created from Cart Checkout into state
   */
  const addCreatedOrders = (newOrders) => {
    if (!Array.isArray(newOrders)) newOrders = [newOrders];
    setOrders((prev) => [...newOrders, ...prev]);
  };

  /**
   * Create order locally (fallback for offline demo)
   */
  const placeOrder = ({ items, pickupDate, timeSlot, notes, customer, subtotal }) => {
    const primaryFarmerName = items[0]?.product?.farmerName || 'Oak Ridge Organics';
    const primaryFarmerId = items[0]?.product?.farmerId || '2';
    const primaryMarketName = items[0]?.product?.marketName || 'Liberty Farmers Market';
    const primaryStallNumber = 'Stall A-04';

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: customer?.id || null,
      customerName: customer?.name || 'Customer',
      customerPhone: customer?.phone || '',
      farmerId: primaryFarmerId,
      farmerName: primaryFarmerName,
      marketName: primaryMarketName,
      stallNumber: primaryStallNumber,
      pickupDate,
      timeSlot,
      items: items.map((it) => ({
        id: it.product.id,
        name: it.product.name,
        quantity: it.quantity,
        unit: it.product.unit,
        price: it.product.price
      })),
      totalAmount: subtotal,
      pickupToken: `PKP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'placed',
      payOnPickup: true,
      placedAt: new Date().toISOString(),
      notes: notes || 'Cash-on-pickup order'
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (String(ord.id) === String(orderId) ? { ...ord, status: newStatus } : ord))
    );
  };

  const cancelOrder = async (orderId, reason = '') => {
    try {
      await customerOrdersAPI.cancelOrder(orderId, reason);
    } catch {
      // Local state update
    }
    updateOrderStatus(orderId, 'cancelled');
  };

  const addReview = async (orderId, rating, comment) => {
    try {
      await customerOrdersAPI.submitReview({
        order_id: orderId,
        rating,
        comment
      });
    } catch {
      // Local state update
    }
    setOrders((prev) =>
      prev.map((ord) =>
        String(ord.id) === String(orderId)
          ? { ...ord, ratingGiven: rating, reviewGiven: comment }
          : ord
      )
    );
  };

  const value = {
    orders,
    loading,
    placeOrder,
    addCreatedOrders,
    updateOrderStatus,
    cancelOrder,
    addReview
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
