import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function CookieConsentModal({ isOpen, onClose }) {
  const { recordCookieConsent, currentUser } = useAuth();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  if (!isOpen) return null;

  const handleAccept = async () => {
    setLoading(true);
    try {
      if (recordCookieConsent) {
        await recordCookieConsent(true);
      }
      if (onClose) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const roleLabel = currentUser?.role === 'farmer' ? 'Farmer Stallholder' : 'Valued Customer';

  // Dynamic theme colors
  const themeStyles = {
    overlayBg: isDark ? 'rgba(5, 10, 20, 0.82)' : 'rgba(15, 23, 42, 0.55)',
    cardBg: isDark ? '#111827' : '#ffffff',
    cardBorder: isDark ? '1px solid rgba(74, 222, 128, 0.25)' : '1px solid rgba(60, 184, 21, 0.2)',
    cardShadow: isDark
      ? '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(74, 222, 128, 0.12)'
      : '0 20px 50px -10px rgba(0, 0, 0, 0.18), 0 0 20px rgba(60, 184, 21, 0.1)',
    headerGradient: isDark
      ? 'linear-gradient(135deg, #14532d 0%, #15803d 60%, #16a34a 100%)'
      : 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #3cb815 100%)',
    iconCircleBg: isDark ? 'rgba(255, 255, 255, 0.12)' : '#ffffff',
    iconColor: isDark ? '#4ade80' : '#2e7d32',
    iconBorder: isDark ? '1px solid rgba(74, 222, 128, 0.35)' : 'none',
    badgeBg: isDark ? 'rgba(74, 222, 128, 0.15)' : '#ffffff',
    badgeText: isDark ? '#4ade80' : '#1e7e34',
    badgeBorder: isDark ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid rgba(255, 255, 255, 0.8)',
    bodyText: isDark ? '#cbd5e1' : '#334155',
    bodyBrand: isDark ? '#4ade80' : '#2e7d32',
    featureCardBg: isDark ? '#1e293b' : '#f8fafc',
    featureCardBorder: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid #e2e8f0',
    featureCardTitle: isDark ? '#f8fafc' : '#0f172a',
    featureCardDesc: isDark ? '#94a3b8' : '#64748b',
    featureIconBg: isDark ? 'rgba(74, 222, 128, 0.15)' : 'rgba(60, 184, 21, 0.12)',
    featureIconColor: isDark ? '#4ade80' : '#2e7d32',
    linkText: isDark ? '#4ade80' : '#2e7d32',
    detailsBoxBg: isDark ? '#1e293b' : '#f8fafc',
    detailsBoxBorder: isDark ? '1px solid #334155' : '1px solid #e2e8f0',
    detailsBoxText: isDark ? '#cbd5e1' : '#334155',
    codeBg: isDark ? '#0f172a' : '#f1f5f9',
    codeText: isDark ? '#4ade80' : '#2e7d32',
    codeBorder: isDark ? 'rgba(74, 222, 128, 0.25)' : '#cbd5e1',
    btnGradient: isDark
      ? 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)'
      : 'linear-gradient(135deg, #2e7d32 0%, #3cb815 100%)',
    btnShadow: isDark
      ? '0 4px 18px rgba(34, 197, 94, 0.35)'
      : '0 4px 15px rgba(60, 184, 21, 0.35)',
    noteText: isDark ? '#94a3b8' : '#64748b'
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: themeStyles.overlayBg,
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1060,
        padding: '16px',
        transition: 'background-color 0.25s ease'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div
        className="card border-0"
        style={{
          maxWidth: '560px',
          width: '100%',
          borderRadius: '18px',
          overflow: 'hidden',
          backgroundColor: themeStyles.cardBg,
          border: themeStyles.cardBorder,
          boxShadow: themeStyles.cardShadow,
          transition: 'all 0.25s ease'
        }}
      >
        {/* Header Bar */}
        <div
          className="p-4 text-white"
          style={{
            background: themeStyles.headerGradient
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-1">
            <div className="d-flex align-items-center gap-3">
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: '42px',
                  height: '42px',
                  fontSize: '1.25rem',
                  backgroundColor: themeStyles.iconCircleBg,
                  color: themeStyles.iconColor,
                  border: themeStyles.iconBorder,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <i className="fa fa-cookie-bite"></i>
              </span>
              <div>
                <h5 className="mb-0 fw-bold text-white" id="cookie-consent-title" style={{ fontSize: '1.2rem', letterSpacing: '-0.2px' }}>
                  Essential Cookies & Storage
                </h5>
                <small style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.82rem' }}>
                  Fair Data Privacy & Transparent Commerce
                </small>
              </div>
            </div>
            <span
              className="badge fw-semibold px-2 py-1 text-uppercase"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.6px',
                backgroundColor: themeStyles.badgeBg,
                color: themeStyles.badgeText,
                border: themeStyles.badgeBorder
              }}
            >
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div
          className="card-body p-4"
          style={{
            backgroundColor: themeStyles.cardBg,
            color: themeStyles.bodyText,
            transition: 'background-color 0.25s ease, color 0.25s ease'
          }}
        >
          <p
            className="mb-3"
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: themeStyles.bodyText
            }}
          >
            Welcome to <strong style={{ color: themeStyles.bodyBrand }}>MarketLink</strong>. To provide a reliable, seamless session for your fresh harvest pre-orders and stall management, we use strictly essential browser storage and session cookies.
          </p>

          {/* Core Essentials Highlights */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-sm-6">
              <div
                className="p-3 rounded-3 h-100"
                style={{
                  backgroundColor: themeStyles.featureCardBg,
                  border: themeStyles.featureCardBorder,
                  transition: 'background-color 0.25s ease, border-color 0.25s ease'
                }}
              >
                <div className="d-flex align-items-start gap-2">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0 mt-1"
                    style={{
                      width: '28px',
                      height: '28px',
                      backgroundColor: themeStyles.featureIconBg,
                      color: themeStyles.featureIconColor,
                      fontSize: '0.85rem'
                    }}
                  >
                    <i className="fa fa-shield-alt"></i>
                  </span>
                  <div>
                    <strong
                      className="d-block"
                      style={{
                        fontSize: '0.88rem',
                        color: themeStyles.featureCardTitle,
                        fontWeight: '600'
                      }}
                    >
                      Session & Security
                    </strong>
                    <small
                      style={{
                        fontSize: '0.8rem',
                        lineHeight: '1.4',
                        color: themeStyles.featureCardDesc,
                        display: 'block',
                        marginTop: '2px'
                      }}
                    >
                      Sanctum JWT tokens to keep your login safe and authenticated.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div
                className="p-3 rounded-3 h-100"
                style={{
                  backgroundColor: themeStyles.featureCardBg,
                  border: themeStyles.featureCardBorder,
                  transition: 'background-color 0.25s ease, border-color 0.25s ease'
                }}
              >
                <div className="d-flex align-items-start gap-2">
                  <span
                    className="d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0 mt-1"
                    style={{
                      width: '28px',
                      height: '28px',
                      backgroundColor: themeStyles.featureIconBg,
                      color: themeStyles.featureIconColor,
                      fontSize: '0.85rem'
                    }}
                  >
                    <i className="fa fa-shopping-basket"></i>
                  </span>
                  <div>
                    <strong
                      className="d-block"
                      style={{
                        fontSize: '0.88rem',
                        color: themeStyles.featureCardTitle,
                        fontWeight: '600'
                      }}
                    >
                      Basket & Market Cache
                    </strong>
                    <small
                      style={{
                        fontSize: '0.8rem',
                        lineHeight: '1.4',
                        color: themeStyles.featureCardDesc,
                        display: 'block',
                        marginTop: '2px'
                      }}
                    >
                      Preserves your selected produce items & pickup location.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Collapsible */}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
              onClick={() => setShowDetails((prev) => !prev)}
              aria-expanded={showDetails}
              style={{
                color: themeStyles.linkText,
                fontSize: '0.88rem'
              }}
            >
              <span>{showDetails ? 'Hide Technical Details' : 'View Full Storage Details'}</span>
              <i className={`fa fa-chevron-${showDetails ? 'up' : 'down'} small`}></i>
            </button>

            {showDetails && (
              <div
                className="mt-2 p-3 rounded-3 small"
                style={{
                  backgroundColor: themeStyles.detailsBoxBg,
                  border: themeStyles.detailsBoxBorder,
                  color: themeStyles.detailsBoxText,
                  transition: 'all 0.25s ease'
                }}
              >
                <ul className="mb-2 ps-3" style={{ lineHeight: '1.6' }}>
                  <li className="mb-1">
                    <strong style={{ color: themeStyles.featureCardTitle }}>Authentication Token:</strong> Stored securely in{' '}
                    <code
                      style={{
                        backgroundColor: themeStyles.codeBg,
                        color: themeStyles.codeText,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.82rem',
                        border: `1px solid ${themeStyles.codeBorder}`
                      }}
                    >
                      localStorage (marketlink_token)
                    </code>{' '}
                    to verify API calls.
                  </li>
                  <li className="mb-1">
                    <strong style={{ color: themeStyles.featureCardTitle }}>Regional Preferences:</strong> Stores selected language (English, Urdu, Arabic) and Theme (Light/Dark mode).
                  </li>
                  <li>
                    <strong style={{ color: themeStyles.featureCardTitle }}>Zero Third-Party Advertising:</strong> We never share data with advertising networks or tracking brokers.
                  </li>
                </ul>
                <div
                  className="fw-semibold d-flex align-items-center gap-1"
                  style={{ color: themeStyles.linkText, fontSize: '0.85rem' }}
                >
                  <i className="fa fa-check-circle"></i>
                  <span>100% compliant with standard privacy guidelines.</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="d-flex flex-column gap-2 pt-2">
            <button
              type="button"
              className="btn btn-lg w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
              onClick={handleAccept}
              disabled={loading}
              style={{
                background: themeStyles.btnGradient,
                color: '#ffffff',
                border: 'none',
                boxShadow: themeStyles.btnShadow,
                padding: '13px 20px',
                borderRadius: '12px',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Saving Preference...</span>
                </>
              ) : (
                <>
                  <i className="fa fa-check"></i>
                  <span>Accept Essential Cookies</span>
                </>
              )}
            </button>
            <div
              className="text-center d-flex align-items-center justify-content-center gap-1 mt-1"
              style={{ fontSize: '0.78rem', color: themeStyles.noteText }}
            >
              <i className="fa fa-info-circle"></i>
              <span>Essential cookies cannot be deactivated as they are technically necessary for platform operation.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
