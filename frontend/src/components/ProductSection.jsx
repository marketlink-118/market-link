/**
 * MarketLink - Featured Products Section
 * Dynamic harvest showcase component
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { productsData } from '../data/products';
import { getLocalizedProducts } from '../data/localizedProductsData';
import { productsAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function ProductSection() {
  const { t, currentCountry, currentLocale, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState(() => getLocalizedProducts(currentCountry, currentLocale));
  const [loading, setLoading] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Instantly re-localize products when country or language switches
  useEffect(() => {
    setProducts(getLocalizedProducts(currentCountry, currentLocale));
  }, [currentCountry, currentLocale]);

  // Optionally supplement from Laravel backend if online and matches country
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        const liveItems = await productsAPI.getAll();
        if (isMounted && liveItems && liveItems.length > 0) {
          // If country is PK, live items match; otherwise retain localized country catalog
          if (currentCountry === 'PK') {
            setProducts(liveItems);
          }
        }
      } catch (err) {
        // use localized products
      }
    }
    fetchProducts();
    return () => { isMounted = false; };
  }, [currentCountry]);

  // Sync WOW animations when categories switch or products load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.WOW) {
      const timer = setTimeout(() => {
        new window.WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          offset: 0,
          mobile: true,
          live: true
        }).init();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, products]);

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => {
        const cat = (p.category || '').toLowerCase();
        if (activeTab === 'vegetables') {
          return cat.includes('veg') || cat.includes('herb') || cat.includes('green');
        }
        if (activeTab === 'fruits') {
          return cat.includes('fruit') || cat.includes('citrus');
        }
        if (activeTab === 'dairy') {
          return cat.includes('dairy') || cat.includes('egg') || cat.includes('milk') || cat.includes('butter');
        }
        if (activeTab === 'bakery') {
          return cat.includes('baker') || cat.includes('honey') || cat.includes('grain');
        }
        return true;
      });

  const categoryOptions = [
    { key: 'all', label: t('all_categories') },
    { key: 'vegetables', label: t('vegetables') },
    { key: 'fruits', label: t('fruits') },
    { key: 'dairy', label: t('dairy') },
    { key: 'bakery', label: t('honey_essentials') || 'Honey & Essentials' }
  ];

  const currentCategoryLabel = categoryOptions.find(c => c.key === activeTab)?.label || t('all_categories');

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-0 gx-5 align-items-end">
          <div className="col-lg-5">
            <div className="section-header text-start mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '500px' }}>
              <h1 className="display-5 mb-3">{t('harvest_heading')}</h1>
              <p className="text-muted">{t('harvest_desc')}</p>
            </div>
          </div>
          <div className="col-lg-7 text-start text-lg-end mb-5 wow slideInRight" data-wow-delay="0.1s">
            <div className="position-relative d-inline-block text-start" ref={dropdownRef}>
              <button 
                type="button"
                className="btn btn-outline-primary border-2 bg-white d-inline-flex align-items-center justify-content-between gap-3 px-4 py-2 shadow-sm"
                onClick={() => setDropdownOpen(prev => !prev)}
                aria-expanded={dropdownOpen}
                style={{ minWidth: '200px' }}
              >
                <span className="fw-semibold">{currentCategoryLabel}</span>
                <i 
                  className="fa fa-chevron-down small" 
                  style={{ 
                    transition: 'transform 0.25s ease',
                    transform: dropdownOpen ? 'rotate(180deg)' : 'none'
                  }}
                ></i>
              </button>

              {dropdownOpen && (
                <div 
                  className="dropdown-menu show shadow-lg border-2 p-1 position-absolute"
                  style={{
                    borderColor: 'var(--primary, #3CB815)',
                    borderRadius: '8px',
                    minWidth: '100%',
                    top: 'calc(100% + 6px)',
                    [isRTL ? 'left' : 'right']: 0,
                    zIndex: 1050
                  }}
                >
                  {categoryOptions.map((cat) => {
                    const isSelected = activeTab === cat.key;
                    return (
                      <button
                        key={cat.key}
                        type="button"
                        className={`dropdown-item px-3 py-2 rounded-2 d-flex align-items-center justify-content-between fw-semibold ${isSelected ? 'active text-white' : 'text-dark'}`}
                        style={{
                          backgroundColor: isSelected ? 'var(--primary, #3CB815)' : 'transparent',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'rgba(60, 184, 21, 0.12)';
                            e.currentTarget.style.color = 'var(--primary, #3CB815)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#212529';
                          }
                        }}
                        onClick={() => {
                          setActiveTab(cat.key);
                          setDropdownOpen(false);
                        }}
                      >
                        <span>{cat.label}</span>
                        {isSelected && <i className="fa fa-check text-white small ms-2"></i>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading fresh harvest...</span>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No products available in this category.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.slice(0, 6).map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                colClass="col-lg-4 col-md-6"
                delay={`${0.1 + (index % 3) * 0.15}s`} 
                onOpenDetail={(prod) => {
                  setActiveModalProduct(prod);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        <div className="col-12 text-center mt-5">
          <Link className="btn btn-primary rounded-pill py-3 px-5 text-white" to="/products">
            {t('browse_more_btn')} <i className="fa fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>

      <ProductDetailModal
        product={activeModalProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
