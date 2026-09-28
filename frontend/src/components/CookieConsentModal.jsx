import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function CookieConsentModal({ isOpen, onClose }) {
  const { recordCookieConsent, currentUser } = useAuth();
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

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 1060,
        padding: '16px'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          maxWidth: '560px',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Header Bar */}
        <div
          className="p-4 text-white"
          style={{
            background: 'linear-gradient(135deg, #2e7d32 0%, #3cb815 100%)'
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <span
                className="d-inline-flex align-items-center justify-content-center bg-white text-success rounded-circle shadow-sm"
                style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
              >
                <i className="fa fa-cookie-bite"></i>
              </span>
              <div>
                <h5 className="mb-0 fw-bold text-white" id="cookie-consent-title">
                  Essential Cookies & Storage
                </h5>
                <small className="text-white-50">
                  Fair Data Privacy & Transparent Commerce
                </small>
              </div>
            </div>
            <span
              className="badge bg-white text-success fw-semibold px-2 py-1 text-uppercase"
              style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
            >
              {roleLabel}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="card-body p-4 bg-white text-dark">
          <p className="mb-3 text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.55' }}>
            Welcome to <strong>MarketLink</strong>. To provide a reliable, seamless session for your fresh harvest pre-orders and stall management, we use strictly essential browser storage and session cookies.
          </p>

          {/* Core Essentials Highlights */}
          <div className="row g-2 mb-3">
            <div className="col-12 col-sm-6">
              <div className="p-3 rounded-3 bg-light border h-100">
                <div className="d-flex align-items-start gap-2">
                  <i className="fa fa-shield-alt text-success mt-1"></i>
                  <div>
                    <strong className="d-block text-dark" style={{ fontSize: '0.88rem' }}>
                      Session & Security
                    </strong>
                    <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                      Sanctum JWT tokens to keep your login safe and authenticated.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="p-3 rounded-3 bg-light border h-100">
                <div className="d-flex align-items-start gap-2">
                  <i className="fa fa-shopping-basket text-success mt-1"></i>
                  <div>
                    <strong className="d-block text-dark" style={{ fontSize: '0.88rem' }}>
                      Basket & Market Cache
                    </strong>
                    <small className="text-muted" style={{ fontSize: '0.8rem' }}>
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
              className="btn btn-link btn-sm p-0 text-success text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
              onClick={() => setShowDetails((prev) => !prev)}
              aria-expanded={showDetails}
            >
              <span>{showDetails ? 'Hide Technical Details' : 'View Full Storage Details'}</span>
              <i className={`fa fa-chevron-${showDetails ? 'up' : 'down'} small`}></i>
            </button>

            {showDetails && (
              <div className="mt-2 p-3 rounded-3 bg-light border text-secondary small">
                <ul className="mb-2 ps-3" style={{ lineHeight: '1.6' }}>
                  <li>
                    <strong>Authentication Token:</strong> Stored securely in <code>localStorage</code> (<code>marketlink_token</code>) to verify API calls.
                  </li>
                  <li>
                    <strong>Regional Preferences:</strong> Stores selected language (English, Urdu, Arabic) and Theme (Light/Dark mode).
                  </li>
                  <li>
                    <strong>Zero Third-Party Advertising:</strong> We never share data with advertising networks or tracking brokers.
                  </li>
                </ul>
                <div className="text-success fw-semibold">
                  <i className="fa fa-check-circle me-1"></i> 100% compliant with standard privacy guidelines.
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="d-flex flex-column gap-2 pt-2">
            <button
              type="button"
              className="btn btn-success btn-lg w-100 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
              onClick={handleAccept}
              disabled={loading}
              style={{
                backgroundColor: '#3cb815',
                borderColor: '#3cb815',
                padding: '12px 20px',
                borderRadius: '10px'
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
            <small className="text-center text-muted" style={{ fontSize: '0.78rem' }}>
              Essential cookies cannot be deactivated as they are technically necessary for platform operation.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
