import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCutoffTimer } from '../hooks/useCutoffTimer';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export default function CutoffBanner() {
  const { hours, minutes, seconds, isUrgent, isCritical, isExpired } = useCutoffTimer();
  const { t, isRTL } = useLanguage();
  const { setIsDrawerOpen } = useCart();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const pad = (n) => String(n).padStart(2, '0');

  // Urgency status badge styling
  let statusBadgeClass = 'bg-success text-white';
  let statusText = t('cutoff_status_open');

  if (isExpired) {
    statusBadgeClass = 'bg-secondary text-white';
    statusText = t('cutoff_status_closed');
  } else if (isCritical) {
    statusBadgeClass = 'bg-danger text-white animate__animated animate__pulse animate__infinite';
    statusText = t('cutoff_status_closing_soon');
  } else if (isUrgent) {
    statusBadgeClass = 'bg-warning text-dark';
    statusText = t('cutoff_status_closing_soon');
  }

  return (
    <aside 
      className="cutoff-countdown-bar py-1 px-3 border-bottom shadow-sm position-relative text-white"
      style={{
        background: isCritical 
          ? 'linear-gradient(90deg, #3d1414 0%, #1f0b0b 100%)' 
          : 'linear-gradient(90deg, #13381e 0%, #0d2815 100%)',
        fontSize: '0.78rem',
        zIndex: 1040,
        transition: 'all 0.3s ease'
      }}
      aria-label="Pre-Order Cutoff Announcement"
    >
      <div className="container-fluid d-flex flex-nowrap align-items-center justify-content-between gap-2 py-0.5 px-2 px-sm-3">
        {/* Left / Info */}
        <div className="d-flex align-items-center gap-1.5 flex-nowrap text-truncate">
          <span className={`badge rounded-pill px-2 py-0.5 fw-bold ${statusBadgeClass} flex-shrink-0`} style={{ fontSize: '0.68rem' }}>
            <i className={`fa ${isExpired ? 'fa-lock' : 'fa-clock'} me-1`}></i>
            {statusText}
          </span>
          <span className="fw-semibold text-white text-truncate d-none d-sm-inline" style={{ fontSize: '0.78rem' }}>
            {t('cutoff_banner_title')}
          </span>
        </div>

        {/* Center / Timer Countdown Digits */}
        <div className="d-flex align-items-center gap-1 flex-shrink-0">
          <span className="text-white-50 me-1 d-none d-md-inline">{t('cutoff_closing_in')}:</span>
          
          <div className="d-inline-flex align-items-center gap-1 font-monospace fw-bold" style={{ fontSize: '0.8rem' }}>
            <span className="px-1.5 py-0.5 rounded bg-black bg-opacity-50 text-warning">
              {pad(hours)}h
            </span>
            <span className="text-white-50">:</span>
            <span className="px-1.5 py-0.5 rounded bg-black bg-opacity-50 text-warning">
              {pad(minutes)}m
            </span>
            <span className="text-white-50">:</span>
            <span className="px-1.5 py-0.5 rounded bg-black bg-opacity-50 text-warning">
              {pad(seconds)}s
            </span>
          </div>
        </div>

        {/* Right / CTA & Dismiss */}
        <div className="d-flex align-items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            className="btn btn-sm btn-outline-warning rounded-pill px-2.5 py-0 fw-semibold d-none d-sm-inline-flex align-items-center gap-1 text-decoration-none shadow-sm"
            style={{ fontSize: '0.7rem', height: '24px' }}
            onClick={() => setIsDrawerOpen(true)}
            title="Open Pre-Order Basket"
          >
            <i className="fa fa-shopping-basket"></i>
            <span>{t('cutoff_preorder_btn')}</span>
          </button>

          <button
            type="button"
            className="btn btn-sm btn-link text-white-50 p-0 text-decoration-none ms-1"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss cutoff banner"
            title="Dismiss"
            style={{ fontSize: '15px', lineHeight: 1 }}
          >
            &times;
          </button>
        </div>
      </div>
    </aside>
  );
}
