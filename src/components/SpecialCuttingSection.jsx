import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import { specialCuttingItems } from '../data/content';
import './SpecialCuttingSection.css';

// Lightbox component
function Lightbox({ item, onClose, items, currentIndex, onNavigate }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNavigate, currentIndex, items.length]);

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox — ${item.title}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="lightbox-inner">
        <button
          ref={closeBtnRef}
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <button
          className="lightbox-nav lightbox-nav--prev"
          onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
          aria-label="Previous image"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div className="lightbox-content">
          <div className="lightbox-image-wrap">
            <img
              src={item.image}
              alt={item.title}
              className="lightbox-img"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="lightbox-placeholder" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>Image to be added</span>
              <code>{item.image.replace('/images/', 'public/images/')}</code>
            </div>
          </div>
          <div className="lightbox-caption">
            <h3 className="lightbox-title">{item.title}</h3>
            <p className="lightbox-caption-text">{item.caption}</p>
            <div className="lightbox-counter">{currentIndex + 1} / {items.length}</div>
          </div>
        </div>

        <button
          className="lightbox-nav lightbox-nav--next"
          onClick={() => onNavigate((currentIndex + 1) % items.length)}
          aria-label="Next image"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SpecialCuttingSection({ onEnquireClick }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const prevFocusRef = useRef(null);

  const openLightbox = (index) => {
    prevFocusRef.current = document.activeElement;
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    prevFocusRef.current?.focus();
  };

  return (
    <section id="special-cutting" className="section special-cutting-section">
      <div className="container">
        <ScrollReveal className="section-header section-header-center">
          <div className="section-label">Gallery</div>
          <h2 className="section-heading section-heading-lg">Our Special Cutting Works</h2>
          <p className="section-subtext">
            The forms below represent examples of cutting work as depicted in our company brochure.
            These are illustrative examples of cut profiles and components. Contact us to discuss
            your specific cutting requirement.
          </p>
        </ScrollReveal>

        <div className="cutting-gallery">
          {specialCuttingItems.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 80} className="cutting-gallery-item">
              <button
                className="cutting-item-btn"
                onClick={() => openLightbox(i)}
                aria-label={`View enlarged — ${item.title}`}
                id={`gallery-item-${item.id}`}
              >
                <div className="cutting-item-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="cutting-item-img"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="cutting-item-placeholder" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
                      <circle cx="6" cy="6" r="3"/>
                      <circle cx="6" cy="18" r="3"/>
                      <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                      <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                    </svg>
                    <span>Image to be added</span>
                  </div>
                  <div className="cutting-item-overlay">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                    Enlarge
                  </div>
                </div>
                <div className="cutting-item-label">{item.title}</div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="cutting-cta-wrap">
          <p className="cutting-note">
            Cutting examples shown are representative of forms depicted in our brochure.
            Custom cutting is subject to feasibility confirmation.
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => onEnquireClick('custom-cutting')}
            id="special-cutting-cta"
          >
            Discuss a Custom Cutting Requirement
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </button>
        </ScrollReveal>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          item={specialCuttingItems[lightboxIndex]}
          items={specialCuttingItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
