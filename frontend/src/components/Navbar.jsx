import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import AuthModal from './AuthModal';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';
import CartDrawer from './CartDrawer';
import CutoffBanner from './CutoffBanner';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  const { currentUser, role, logout } = useAuth();
  const { totalItems, setIsDrawerOpen } = useCart();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div
      className={`container-fluid fixed-top px-0 ${isScrolled ? 'scrolled bg-white shadow-sm' : ''}`}
      style={{
        top: '0px',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {/* Harvest Cutoff Announcement Banner */}
      <CutoffBanner />

      {/* TopBar included in header container */}
      <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
        <div className="col-lg-6 px-5 text-start">
          <small><i className="fa fa-envelope me-2 text-primary"></i>marketlink118@gmail.com</small>
        </div>
        <div className="col-lg-6 px-5 text-end d-flex align-items-center justify-content-end gap-3">
          <span className="badge bg-light text-dark border px-2 py-1" style={{ fontSize: '0.72rem' }}>
            <i className="fa fa-leaf text-success me-1"></i> {t('topbar_api_ready')}
          </span>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5">
        <Link to="/" className="navbar-brand ms-2 ms-lg-0 py-1">
          <h1 className="fw-bold text-primary m-0" style={{ fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
            Market<span className="text-secondary">Link</span>
          </h1>
        </Link>

        <div className="d-flex align-items-center d-lg-none gap-2 me-2">
          <ThemeToggle compact={true} />
          <LanguageSelector compact={true} />

          {/* Direct Mobile Basket Trigger */}
          <button
            type="button"
            className="btn-sm-square bg-white rounded-circle shadow-sm border position-relative"
            onClick={() => setIsDrawerOpen(true)}
            title={t('nav_basket')}
            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <small className="fa fa-shopping-basket text-primary" style={{ fontSize: '0.8rem' }}></small>
            {totalItems > 0 && (
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary text-white" 
                style={{ fontSize: '0.6rem', padding: '2px 4px' }}
              >
                {totalItems}
              </span>
            )}
          </button>

          <button 
            type="button" 
            className="navbar-toggler p-1 border-0" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            style={{ fontSize: '1.1rem' }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className={`nav-item nav-link ${isActive('/')}`}>{t('nav_home')}</Link>
            <Link to="/markets" className={`nav-item nav-link ${isActive('/markets')}`}>{t('nav_markets')}</Link>
            <Link to="/products" className={`nav-item nav-link ${isActive('/products')}`}>{t('nav_products')}</Link>
            
            <div 
              className={`nav-item dropdown ${pagesDropdownOpen ? 'show' : ''}`}
              onMouseEnter={() => setPagesDropdownOpen(true)}
              onMouseLeave={() => setPagesDropdownOpen(false)}
            >
              <a 
                href="#!" 
                className="nav-link dropdown-toggle" 
                onClick={(e) => { e.preventDefault(); setPagesDropdownOpen(!pagesDropdownOpen); }}
              >
                {t('nav_portals')}
              </a>
              <div className={`dropdown-menu m-0 shadow border-0 ${pagesDropdownOpen ? 'show' : ''}`} style={{ minWidth: '220px' }}>
                <h6 className="dropdown-header text-uppercase text-primary small fw-bold">Role Dashboards</h6>
                <Link to="/customer" className="dropdown-item py-2">
                  <i className="fa fa-user-circle me-2 text-primary"></i>{t('nav_customer')}
                </Link>
                <Link to="/farmer" className="dropdown-item py-2">
                  <i className="fa fa-tractor me-2 text-success"></i>{t('nav_farmer')}
                </Link>
                {role === 'admin' && (
                  <Link to="/admin" className="dropdown-item py-2">
                    <i className="fa fa-shield-alt me-2 text-danger"></i>{t('nav_admin')}
                  </Link>
                )}
                <div className="dropdown-divider"></div>
                <h6 className="dropdown-header text-uppercase text-secondary small fw-bold">Explore</h6>
                <Link to="/about" className="dropdown-item">{t('nav_about')}</Link>
                <Link to="/features" className="dropdown-item">{t('nav_features')}</Link>
                <Link to="/blog" className="dropdown-item">{t('nav_blog')}</Link>
                <Link to="/testimonial" className="dropdown-item">{t('nav_reviews')}</Link>
              </div>
            </div>

            <Link to="/contact" className={`nav-item nav-link ${isActive('/contact')}`}>{t('nav_contact')}</Link>
          </div>

          <div className="d-flex align-items-center ms-lg-3 flex-wrap gap-2 py-2 py-lg-0">
            {/* Theme & Language Switchers (Always accessible on desktop navbar) */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <ThemeToggle compact={true} />
              <LanguageSelector compact={true} />
            </div>

            {/* Direct Dashboard Shortcut */}
            <Link
              to={role === 'farmer' ? '/farmer' : role === 'admin' ? '/admin' : '/customer'}
              className="btn btn-sm btn-light border rounded-pill px-3 py-1 d-none d-xl-flex align-items-center text-decoration-none shadow-sm"
              title="Dashboard"
            >
              <i className="fa fa-tachometer-alt me-1 text-primary"></i>
              <span className="small fw-semibold text-dark">{t('nav_dashboard')}</span>
            </Link>

            {/* Real Authentication: Sign In if Guest, User Badge if Logged In */}
            {!currentUser ? (
              <button
                type="button"
                className="btn btn-sm btn-outline-success rounded-pill px-3 py-1 d-flex align-items-center shadow-sm"
                onClick={() => setIsAuthModalOpen(true)}
                title="Sign In or Register"
              >
                <i className="fa fa-sign-in-alt me-1 text-success"></i>
                <span className="small fw-semibold">{t('nav_signin')}</span>
              </button>
            ) : (
              <div className="d-flex align-items-center gap-1">
                <Link
                  to={role === 'admin' ? '/admin' : role === 'farmer' ? '/farmer' : '/customer'}
                  className={`btn btn-sm ${role === 'farmer' ? 'btn-success text-white' : role === 'admin' ? 'btn-danger text-white' : 'btn-primary text-white'} rounded-pill px-3 py-1 d-flex align-items-center shadow-sm text-decoration-none`}
                  title="Go to Dashboard"
                >
                  <i className={`fa ${role === 'farmer' ? 'fa-tractor' : role === 'admin' ? 'fa-shield-alt' : 'fa-user-circle'} me-1`}></i>
                  <span className="fw-semibold small">
                    {currentUser.name || currentUser.email}
                  </span>
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                  onClick={logout}
                  title="Sign Out"
                  style={{ width: '32px', height: '32px' }}
                >
                  <i className="fa fa-sign-out-alt text-danger" style={{ fontSize: '0.8rem' }}></i>
                </button>
              </div>
            )}

            {/* Cart Drawer Trigger */}
            <button
              type="button"
              className="btn-sm-square bg-white rounded-circle shadow-sm border position-relative"
              onClick={() => setIsDrawerOpen(true)}
              title={t('nav_basket')}
            >
              <small className="fa fa-shopping-basket text-primary"></small>
              {totalItems > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary text-white" 
                  style={{ fontSize: '0.65rem' }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
