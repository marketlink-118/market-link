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
                className="bg-primary bg-icon text-white d-flex flex-column justify-content-between h-100 p-4 p-md-5 rounded shadow-sm"
                style={{
                  minHeight: '440px'
                }}
              >
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                    <span 
                      className="badge bg-white text-primary px-3 py-2 rounded-pill fw-bold text-uppercase d-inline-flex align-items-center gap-2 shadow-sm"
                      style={{ fontSize: '0.8rem', letterSpacing: '0.5px' }}
                    >
                      <span>{hq.flag}</span>
                      <span>{hq.badge}</span>
                    </span>
                    <span 
                      className="badge bg-secondary text-white px-3 py-2 rounded-pill fw-bold text-uppercase shadow-sm"
                      style={{ fontSize: '0.78rem', letterSpacing: '0.5px' }}
                    >
                      <i className="fa fa-map-pin me-1"></i>{hq.city}
                    </span>
                  </div>

                  <h3 className="text-white fw-bold mb-4" style={{ fontSize: '1.45rem', letterSpacing: '-0.01em' }}>
                    {hq.title}
                  </h3>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                      style={{ width: '42px', height: '42px', backgroundColor: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                    >
                      <i className="fa fa-map-marker-alt text-warning fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-uppercase mb-1 fw-bold" style={{ fontSize: '0.76rem', letterSpacing: '0.08em', color: '#FFE082' }}>
                        Headquarters Location
                      </h6>
                      <p className="mb-0 text-white fw-medium" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {hq.address}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                      style={{ width: '42px', height: '42px', backgroundColor: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                    >
                      <i className="fa fa-store text-warning fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-uppercase mb-1 fw-bold" style={{ fontSize: '0.76rem', letterSpacing: '0.08em', color: '#FFE082' }}>
                        Regional Market Desk
                      </h6>
                      <p className="mb-0 text-white fw-medium" style={{ fontSize: '0.93rem', lineHeight: '1.5' }}>
                        {hq.liaisonDesk}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                      style={{ width: '42px', height: '42px', backgroundColor: 'rgba(255, 255, 255, 0.18)', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                    >
                      <i className="fa fa-envelope text-warning fs-5"></i>
                    </div>
                    <div>
                      <h6 className="text-uppercase mb-1 fw-bold" style={{ fontSize: '0.76rem', letterSpacing: '0.08em', color: '#FFE082' }}>
                        Official Inquiries
                      </h6>
                      <p className="mb-0">
                        <a 
                          href={`mailto:${hq.email}`} 
                          className="text-white text-decoration-none fw-bold"
                          style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.6)', paddingBottom: '2px' }}
                        >
                          {hq.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2" style={{ fontSize: '0.82rem' }}>
                    <span className="d-inline-flex align-items-center gap-2" style={{ color: '#E8F5E9' }}>
                      <i className="fa fa-clock text-warning"></i>
                      <span className="fw-semibold">Liaison Hours:</span>
                    </span>
                    <strong className="text-white fw-bold">{hq.hours}</strong>
                  </div>
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
