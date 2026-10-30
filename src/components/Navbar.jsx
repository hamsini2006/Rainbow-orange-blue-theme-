import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#machinery', label: 'Machinery' },
  { href: '#special-cutting', label: 'Special Cutting' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onQuoteClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef(null);
  const menuBtnRef = useRef(null);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Trap focus in mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const focusable = mobileMenuRef.current?.querySelectorAll('a, button');
    if (focusable?.length) focusable[0].focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        {/* Logo */}
        <a
          href="#hero"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Rainbow Metal Cutting — Home"
        >
          <img
            src="/images/brand/logo.png"
            alt="Rainbow Metal Cutting Logo"
            className="navbar__logo-img"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">Rainbow</span>
            <span className="navbar__logo-sub">Metal Cutting</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Primary navigation">
          <ul className="navbar__links" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeSection === link.href.slice(1) ? 'navbar__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={activeSection === link.href.slice(1) ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <button
          className="btn btn-primary btn-sm navbar__cta"
          onClick={onQuoteClick}
          id="nav-quote-btn"
        >
          Get a Quote
        </button>

        {/* Mobile hamburger */}
        <button
          ref={menuBtnRef}
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`mobile-menu__link ${activeSection === link.href.slice(1) ? 'mobile-menu__link--active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="btn btn-primary mobile-menu__cta"
            onClick={() => { setMenuOpen(false); onQuoteClick(); }}
            tabIndex={menuOpen ? 0 : -1}
          >
            Get a Quote
          </button>
        </nav>
      </div>
    </header>
  );
}
