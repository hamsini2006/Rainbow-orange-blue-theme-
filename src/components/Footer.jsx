import { contactInfo } from '../data/content';
import './Footer.css';

const footerLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#machinery', label: 'Machinery' },
  { href: '#special-cutting', label: 'Special Cutting' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#contact', label: 'Contact' },
];

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const year = CURRENT_YEAR;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        {/* Brand col */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img
              src="/images/brand/logo.png"
              alt="Rainbow Metal Cutting Logo"
              className="footer-logo"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="footer-logo-text">
              <span className="footer-logo-name">Rainbow</span>
              <span className="footer-logo-sub">Metal Cutting</span>
            </div>
          </div>
          <p className="footer-desc">
            Metal cutting services for customer-supplied materials.
            Circular saw and band saw cutting per agreed specifications.
            Customized cutting enquiries welcome.
          </p>
          <div className="footer-cert">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            {contactInfo.certification}
          </div>
          <div className="footer-tagline">"{contactInfo.tagline}"</div>
        </div>

        {/* Nav col */}
        <div className="footer-nav-col">
          <h3 className="footer-col-heading">Navigate</h3>
          <ul className="footer-links" role="list">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="footer-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact col */}
        <div className="footer-contact-col">
          <h3 className="footer-col-heading">Contact Us</h3>
          <address className="footer-address">
            {contactInfo.address.line1}<br />
            {contactInfo.address.line2}<br />
            {contactInfo.address.line3}
          </address>
          <div className="footer-contact-items">
            {contactInfo.phones.map((p) => (
              <a key={p.link} href={p.link} className="footer-contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 13.5a19.79 19.79 0 01-3.03-8.63 2 2 0 011.72-2.18H7a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.04z"/>
                </svg>
                {p.display}
              </a>
            ))}
            <a href={contactInfo.email.link} className="footer-contact-link footer-email">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {contactInfo.email.display}
            </a>
          </div>
          <div className="footer-gstin">GSTIN: {contactInfo.gstin}</div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>
            © {year} {contactInfo.company}. All rights reserved.
          </span>
          <span className="footer-bottom-note">
            Frontend only — no website domain or social accounts have been created.
          </span>
        </div>
      </div>
    </footer>
  );
}
