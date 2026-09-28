import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import BlogModal from './BlogModal';

export default function BlogSection() {
  const { t } = useLanguage();
  const { role } = useAuth();
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlog();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const isAdmin = role === 'admin';

  const handleOpenAdd = () => {
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (blog, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteBlog(id);
    }
  };

  const handleSaveBlog = (blogData) => {
    if (blogData.id) {
      updateBlog(blogData.id, blogData);
    } else {
      addBlog(blogData);
    }
  };

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '650px' }}>
          <h1 className="display-5 mb-3">{t('blog_heading')}</h1>
          <p className="text-muted">{t('blog_desc')}</p>

          {isAdmin && (
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4 py-2 text-white fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                onClick={handleOpenAdd}
              >
                <i className="fa fa-plus-circle"></i>
                <span>Publish New Article</span>
                <span className="badge bg-white text-primary ms-1 small">Admin</span>
              </button>
            </div>
          )}
        </div>

        <div className="row g-4">
          {blogs.map((blog, idx) => {
            const displayTitle = (blog.titleKey && t(blog.titleKey)) ? t(blog.titleKey) : blog.title;

            return (
              <div 
                key={blog.id} 
                className="col-lg-4 col-md-6 wow fadeInUp" 
                data-wow-delay={`${0.1 + (idx % 3) * 0.2}s`}
              >
                <div className="blog-item shadow-sm rounded-4 border overflow-hidden h-100 bg-white d-flex flex-column position-relative">
                  {/* Admin Quick Action Controls */}
                  {isAdmin && (
                    <div
                      className="position-absolute top-0 end-0 m-3 d-flex gap-1"
                      style={{ zIndex: 10 }}
                    >
                      <button
                        type="button"
                        className="btn btn-sm btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center text-primary"
                        style={{ width: '32px', height: '32px' }}
                        title="Edit Article"
                        onClick={(e) => handleOpenEdit(blog, e)}
                      >
                        <i className="fa fa-pen" style={{ fontSize: '0.75rem' }}></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-light rounded-circle shadow-sm border d-flex align-items-center justify-content-center text-danger"
                        style={{ width: '32px', height: '32px' }}
                        title="Delete Article"
                        onClick={(e) => handleDelete(blog.id, e)}
                      >
                        <i className="fa fa-trash-alt" style={{ fontSize: '0.75rem' }}></i>
                      </button>
                    </div>
                  )}

                  <img 
                    className="img-fluid w-100" 
                    src={blog.image} 
                    alt={displayTitle} 
                    style={{ height: '230px', objectFit: 'cover' }} 
                    onError={(e) => {
                      e.target.src = '/img/blog-1.jpg';
                    }}
                  />

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <Link className="d-block h5 lh-base mb-2 text-decoration-none text-dark flex-grow-1" to="/blog">
                      {displayTitle}
                    </Link>

                    {blog.excerpt && (
                      <p className="text-muted small mb-3 line-clamp-2" style={{ maxHeight: '2.8rem', overflow: 'hidden' }}>
                        {blog.excerpt}
                      </p>
                    )}

                    <div className="text-muted border-top pt-3 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <small><i className="fa fa-user text-primary me-1"></i>{blog.author || 'Admin'}</small>
                        <small><i className="fa fa-calendar text-primary me-1"></i>{blog.date}</small>
                      </div>
                      <Link to="/blog" className="text-primary small fw-semibold text-decoration-none">
                        Read <i className="fa fa-arrow-right ms-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {isAdmin && (
        <BlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          blog={selectedBlog}
          onSave={handleSaveBlog}
        />
      )}
    </div>
  );
}
