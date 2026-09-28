import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getHeadquarters } from '../data/headquartersData';

export default function Footer() {
  const { t, isRTL, currentCountry } = useLanguage();
  const hq = getHeadquarters(currentCountry);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <>
      <div className="container-fluid bg-dark footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h1 className="fw-bold text-primary mb-4">
                Market<span className="text-secondary">Link</span>
              </h1>
              <p className="text-white-50">{t('footer_tagline')}</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">{t('footer_address_title')}</h4>
              
              <div className="mb-3">
                <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                  <span 
                    className="badge rounded-pill px-2 py-1 d-inline-flex align-items-center gap-1 shadow-sm"
                    style={{
                      backgroundColor: 'rgba(60, 184, 21, 0.18)',
                      border: '1px solid rgba(60, 184, 21, 0.45)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.3px'
                    }}
                  >
                    <span>{hq.flag}</span>
                    <span className="text-white fw-bold">{hq.city}</span>
                  </span>
                  <small 
                    className="fw-medium" 
                    style={{ color: '#94a3b8', fontSize: '0.76rem', letterSpacing: '0.2px' }}
                  >
                    {hq.badge}
                  </small>
                </div>

                <h6 className="text-white mb-2 fw-bold" style={{ fontSize: '1.02rem', letterSpacing: '-0.2px' }}>
                  {hq.title}
                </h6>

                <Link 
                  to="/contact#headquarters" 
                  className="text-decoration-none d-flex align-items-start gap-2 mb-3 footer-hq-link"
                  style={{ 
                    color: '#cbd5e1', 
                    fontSize: '0.88rem', 
                    lineHeight: '1.5',
                    transition: 'color 0.2s ease'
                  }}
                  title="View Headquarters Details & Map"
                >
                  <span 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: 'rgba(60, 184, 21, 0.15)',
                      color: 'var(--primary)',
                      fontSize: '0.75rem'
                    }}
                  >
                    <i className="fa fa-map-marker-alt"></i>
                  </span>
                  <span className="hq-address-text">{hq.address}</span>
                </Link>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'rgba(60, 184, 21, 0.15)',
                    color: 'var(--primary)',
                    fontSize: '0.75rem'
                  }}
                >
                  <i className="fa fa-envelope"></i>
                </span>
                <a 
                  href={`mailto:${hq.email}`} 
                  className="text-decoration-none footer-hq-link"
                  style={{ 
                    color: '#cbd5e1', 
                    fontSize: '0.88rem',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {hq.email}
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">{t('footer_links_title')}</h4>
              <Link className="btn btn-link text-decoration-none" to="/about">{t('nav_about')}</Link>
              <Link className="btn btn-link text-decoration-none" to="/markets">{t('nav_markets')}</Link>
              <Link className="btn btn-link text-decoration-none" to="/products">{t('nav_products')}</Link>
              <Link className="btn btn-link text-decoration-none" to="/features">{t('nav_features')}</Link>
              <Link className="btn btn-link text-decoration-none" to="/contact">{t('nav_contact')}</Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-light mb-4">{t('footer_newsletter_title')}</h4>
              <p className="text-white-50">{t('footer_newsletter_desc')}</p>
              <form onSubmit={handleSubscribe} className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                <input 
                  className="form-control rounded-pill bg-transparent w-100 py-3 text-white border-secondary" 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your.email@example.com" 
                  required
                  style={{
                    paddingRight: isRTL ? '18px' : '118px',
                    paddingLeft: isRTL ? '118px' : '18px',
                    fontSize: '0.88rem'
                  }}
                />
                <button 
                  type="submit" 
                  className={`btn btn-primary rounded-pill px-3 py-2 position-absolute top-50 translate-middle-y ${isRTL ? 'start-0 ms-1' : 'end-0 me-1'}`}
                  style={{ fontSize: '0.82rem', fontWeight: 600 }}
                >
                  {t('footer_signup_btn')}
                </button>
              </form>
              {subscribed && (
                <div className="mt-2 text-success small d-flex align-items-center gap-1">
                  <i className="fa fa-check-circle"></i>
                  <span>Subscribed successfully! Thank you.</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container-fluid copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0 text-white-50">
                &copy; <span className="text-white">{t('footer_copyright')}</span>
              </div>
              <div className="col-md-6 text-center text-md-end text-muted">
                All Rights Reserved. | Farm Fresh Harvest Pre-Orders
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
