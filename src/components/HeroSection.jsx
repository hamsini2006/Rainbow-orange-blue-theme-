import { useEffect, useRef } from 'react';
import './HeroSection.css';

export default function HeroSection({ onQuoteClick, onExploreClick }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroRef.current) return;
    const items = heroRef.current.querySelectorAll('[data-hero-item]');
    items.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`;
      el.classList.add('hero-animate-in');
    });
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef} aria-label="Hero">
      {/* Geometric accents */}
      <div className="hero-accent hero-accent--tl" aria-hidden="true" />
      <div className="hero-accent hero-accent--br" aria-hidden="true" />

      <div className="container hero-inner">
        {/* Left: Text */}
        <div className="hero-content">
          <div className="hero-badge" data-hero-item>
            <span className="hero-badge-dot" />
            Customer-Supplied Material · Requirement-Based Cutting
          </div>

          <h1 className="hero-heading" data-hero-item>
            Precision Metal Cutting.{' '}
            <span className="hero-heading-accent">Built Around Your Requirements.</span>
          </h1>

          <p className="hero-body" data-hero-item>
            Rainbow Metal Cutting provides cutting services for customer-supplied metal materials,
            working according to agreed cutting requirements and specifications.
            Customized cutting enquiries are welcome.
          </p>

          <div className="hero-ctas" data-hero-item>
            <button className="btn btn-primary btn-lg" onClick={onQuoteClick} id="hero-quote-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
              Request a Cutting Quote
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onExploreClick} id="hero-explore-btn">
              Explore Our Machinery
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div className="hero-features" data-hero-item>
            {[
              'Customer-Supplied Material',
              'Requirement-Based Cutting',
              'Custom Enquiries Welcome',
            ].map((f) => (
              <span key={f} className="hero-feature-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {f}
              </span>
            ))}
          </div>

          {/* ISO tag */}
          <div className="hero-iso" data-hero-item>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            ISO 9001:2015 Certified Company
          </div>
        </div>

        {/* Right: Machine image */}
        <div className="hero-image-wrap" data-hero-item>
          <div className="hero-image-frame">
            <img
              src="/images/machinery/hero-machine.jpg"
              alt="Rainbow Metal Cutting — band saw and circular saw machinery at Ganapathy, Coimbatore"
              className="hero-img"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="hero-image-placeholder" aria-hidden="true">
              <div className="hero-placeholder-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                  <rect x="2" y="7" width="16" height="13" rx="2"/>
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                  <circle cx="18" cy="18" r="4"/>
                  <path d="M18 14v4l2 2"/>
                </svg>
              </div>
              <p>Machine photograph</p>
              <span>Replace: public/images/machinery/hero-machine.jpg</span>
            </div>
            <div className="hero-image-tag">
              <span className="hero-image-tag-dot" />
              COSEN · LAXSON · MEGA Machinery
            </div>
          </div>
          {/* Decorative orange strip */}
          <div className="hero-strip" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
