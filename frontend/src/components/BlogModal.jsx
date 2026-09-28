import React, { useState, useEffect } from 'react';

const PRESET_IMAGES = [
  { label: 'Soil & Farm', url: '/img/blog-1.jpg' },
  { label: 'Wheat Field', url: '/img/blog-2.jpg' },
  { label: 'Fresh Harvest', url: '/img/blog-3.jpg' }
];

export default function BlogModal({ isOpen, onClose, blog, onSave }) {
  const isEditing = Boolean(blog);

  const [formData, setFormData] = useState({
    title: '',
    image: '/img/blog-1.jpg',
    excerpt: '',
    author: 'Admin',
    date: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        image: blog.image || '/img/blog-1.jpg',
        excerpt: blog.excerpt || '',
        author: blog.author || 'Admin',
        date: blog.date || ''
      });
    } else {
      const todayFormatted = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(new Date());

      setFormData({
        title: '',
        image: '/img/blog-1.jpg',
        excerpt: '',
        author: 'Admin',
        date: todayFormatted
      });
    }
    setError('');
  }, [blog, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please enter an article title.');
      return;
    }

    onSave({
      ...formData,
      id: blog ? blog.id : undefined
    });

    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1060 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '18px' }}>
          <div className="modal-header border-bottom px-4 py-3">
            <div className="d-flex align-items-center gap-2">
              <div
                className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '38px', height: '38px' }}
              >
                <i className={`fa ${isEditing ? 'fa-edit' : 'fa-feather-alt'}`}></i>
              </div>
              <h5 className="modal-title fw-bold mb-0">
                {isEditing ? 'Edit Blog Article' : 'Publish New Blog Article'}
              </h5>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body px-4 py-3">
              {error && (
                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                  <i className="fa fa-exclamation-circle me-1"></i>
                  {error}
                </div>
              )}

              {/* Title */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">
                  Article Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Sustainable soil conservation techniques"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  autoFocus
                  required
                />
              </div>

              {/* Excerpt / Summary */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">
                  Short Summary / Excerpt
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Brief summary of the article for the cards and listing..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                ></textarea>
              </div>

              {/* Image Selection */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted d-block">
                  Featured Image
                </label>
                <div className="d-flex gap-2 mb-2">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      type="button"
                      key={preset.url}
                      className={`btn btn-sm ${
                        formData.image === preset.url
                          ? 'btn-primary text-white'
                          : 'btn-outline-secondary'
                      } rounded-pill px-3`}
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Or enter custom image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                {formData.image && (
                  <div className="mt-2 text-center bg-light p-2 rounded-3 border">
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Author & Date Row */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Author Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small text-muted">Publish Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.date}
                    placeholder="e.g. 29 Sep, 2026"
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer border-top px-4 py-3 bg-light bg-opacity-50">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 text-white fw-semibold"
              >
                <i className={`fa ${isEditing ? 'fa-check' : 'fa-paper-plane'} me-1`}></i>
                {isEditing ? 'Save Changes' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
