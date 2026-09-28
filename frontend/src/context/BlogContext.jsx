import React, { createContext, useContext, useState, useEffect } from 'react';

const BlogContext = createContext(null);

const STORAGE_KEY = 'marketlink_blogs';

const INITIAL_BLOGS = [
  {
    id: 1,
    image: '/img/blog-1.jpg',
    title: 'How organic soil rotation guarantees nutrient-dense vegetables',
    titleKey: 'blog_title_1',
    excerpt: 'Crop rotation practices preserve vital soil micronutrients and prevent mineral depletion in organic farming.',
    author: 'Admin',
    date: '14 Sep, 2026'
  },
  {
    id: 2,
    image: '/img/blog-2.jpg',
    title: 'The ecological impact of stall-pickup pre-orders vs grocery stores',
    titleKey: 'blog_title_2',
    excerpt: 'Discover how hyper-local market pickups reduce cold-storage waste and urban transportation emissions.',
    author: 'Admin',
    date: '20 Sep, 2026'
  },
  {
    id: 3,
    image: '/img/blog-3.jpg',
    title: 'Seasonal harvest calendar: What to pre-order this autumn',
    titleKey: 'blog_title_3',
    excerpt: 'A comprehensive guide to seasonal autumn produce, upcoming harvests, and farmers market schedules.',
    author: 'Admin',
    date: '24 Sep, 2026'
  }
];

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fall back to initial records
    }
    return INITIAL_BLOGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    } catch {
      // Handle storage quota or private browsing limits
    }
  }, [blogs]);

  const addBlog = (blogData) => {
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date());

    const newBlog = {
      id: Date.now(),
      image: blogData.image?.trim() || '/img/blog-1.jpg',
      title: blogData.title.trim(),
      excerpt: blogData.excerpt ? blogData.excerpt.trim() : '',
      author: blogData.author?.trim() || 'Admin',
      date: blogData.date?.trim() || formattedDate
    };

    setBlogs((prev) => [newBlog, ...prev]);
    return newBlog;
  };

  const updateBlog = (id, updatedFields) => {
    setBlogs((prev) =>
      prev.map((b) => {
        if (String(b.id) === String(id)) {
          return {
            ...b,
            ...updatedFields,
            titleKey: undefined // Direct title takes precedence once edited
          };
        }
        return b;
      })
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => String(b.id) !== String(id)));
  };

  const resetBlogs = () => {
    setBlogs(INITIAL_BLOGS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        resetBlogs
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
