import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getHeadquarters } from '../data/headquartersData';

export default function Footer() {
  const { t, isRTL, currentCountry } = useLanguage();
  const hq = getHeadquarters(currentCountry);

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
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 px-2 py-1 rounded">
                    {hq.flag} {hq.city}
                  </span>
                  <span className="text-white-50 small">{hq.badge}</span>
                </div>
                <h6 className="text-white mb-2 fw-semibold" style={{ fontSize: '0.98rem' }}>
                  {hq.title}
                </h6>
                <Link 
                  to="/contact#headquarters" 
                  className="text-white-50 text-decoration-none d-flex align-items-start gap-2"
                  style={{ fontSize: '0.88rem', lineHeight: '1.45' }}
                  title="View Headquarters Details & Map"
                >
                  <i className="fa fa-map-marker-alt text-primary mt-1 flex-shrink-0"></i>
                  <span>{hq.address}</span>
                </Link>
              </div>
              <p className="text-white-50 mb-0">
                <i className="fa fa-envelope me-2 text-primary"></i>
                <a href={`mailto:${hq.email}`} className="text-white-50 text-decoration-none">
                  {hq.email}
                </a>
              </p>
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
              <div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
                <input 
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5 text-white border-secondary" 
                  type="email" 
                  placeholder="your.email@example.com" 
                />
                <button 
                  type="button" 
                  className={`btn btn-primary py-2 position-absolute top-0 ${isRTL ? 'start-0' : 'end-0'} mt-2 ${isRTL ? 'ms-2' : 'me-2'}`}
                >
                  {t('footer_signup_btn')}
                </button>
              </div>
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
