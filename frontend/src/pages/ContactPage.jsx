import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../context/LanguageContext';
import { getHeadquarters } from '../data/headquartersData';

export default function ContactPage() {
  const { currentCountry } = useLanguage();
  const hq = getHeadquarters(currentCountry);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <>
      <PageHeader title="Contact Us" breadcrumb="Contact Us" badge="Direct Farmers Community" />

      <div className="container-xxl py-6">
        <div className="container">
          <div className="section-header text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h1 className="display-5 mb-3">Contact Us</h1>
            <p className="text-muted">Have questions about weekend market schedules, in-stall pre-orders, or becoming a farm vendor? Reach out to our community coordination team.</p>
          </div>

          <div className="row g-5 justify-content-center">
            <div className="col-lg-5 col-md-12">
              <div 
                className="bg-primary text-white d-flex flex-column justify-content-between h-100 p-4 p-md-5 rounded shadow-sm"
                style={{
                  background: 'linear-gradient(145deg, #2e7d32 0%, #3cb815 100%)',
                  minHeight: '440px'
                }}
              >
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span 
                      className="badge bg-white text-success px-3 py-2 rounded-pill fw-bold text-uppercase d-inline-flex align-items-center gap-1 shadow-sm"
                      style={{ fontSize: '0.78rem', letterSpacing: '0.5px' }}
                    >
                      <span>{hq.flag}</span>
                      <span>{hq.badge}</span>
                    </span>
                    <span className="badge bg-white bg-opacity-25 text-white fw-semibold px-2 py-1">
                      {hq.city}
                    </span>
                  </div>

                  <h3 className="text-white fw-bold mb-3" style={{ fontSize: '1.45rem' }}>
                    {hq.title}
                  </h3>

                  <div className="mb-4">
                    <h6 className="text-white text-uppercase mb-1 fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', opacity: 0.85 }}>
                      <i className="fa fa-map-marker-alt me-2"></i>Headquarters Location
                    </h6>
                    <p className="mb-0 text-white" style={{ fontSize: '0.96rem', lineHeight: '1.5' }}>
                      {hq.address}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-white text-uppercase mb-1 fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', opacity: 0.85 }}>
                      <i className="fa fa-store me-2"></i>Regional Market Desk
                    </h6>
                    <p className="mb-0 text-white" style={{ fontSize: '0.93rem', lineHeight: '1.5' }}>
                      {hq.liaisonDesk}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-white text-uppercase mb-1 fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', opacity: 0.85 }}>
                      <i className="fa fa-envelope me-2"></i>Official Inquiries
                    </h6>
                    <p className="mb-0">
                      <a href={`mailto:${hq.email}`} className="text-white text-decoration-none fw-semibold">
                        {hq.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-top border-white border-opacity-25">
                  <small className="text-white-50 d-block" style={{ fontSize: '0.78rem' }}>
                    <i className="fa fa-clock me-1"></i> Liaison Hours: <strong className="text-white">{hq.hours}</strong>
                  </small>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              {submitted && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Thank you!</strong> Your message has been sent successfully.
                </div>
              )}
              <p className="mb-4">
                Have questions or need assistance? Fill out the form below and our team will get in touch with you shortly.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="subject" 
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange} 
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea 
                        className="form-control" 
                        placeholder="Leave a message here" 
                        id="message" 
                        style={{ height: '200px' }}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary rounded-pill py-3 px-5" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl px-0" style={{ marginBottom: '-6px' }}>
        <iframe 
          className="w-100" 
          style={{ height: '450px', border: 0 }}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(hq.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen="" 
          loading="lazy"
          title={`${hq.title} Location Map`}
        ></iframe>
      </div>
    </>
  );
}
