import ScrollReveal from './ScrollReveal';
import EnquiryForm from './EnquiryForm';
import { contactInfo } from '../data/content';
import './ContactSection.css';

export default function ContactSection({ formRef, preselectedCategory, preselectedMachine }) {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <ScrollReveal className="section-header section-header-center">
          <div className="section-label">Get in Touch</div>
          <h2 className="section-heading section-heading-lg">Discuss Your Cutting Requirements</h2>
          <p className="section-subtext">
            Ready to enquire about a cutting job? Fill in the form below and we'll get back to you.
            You can also call or email us directly.
          </p>
        </ScrollReveal>

        <div className="contact-grid">
          {/* Contact Info Column */}
          <ScrollReveal className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-info-heading">Contact Information</h3>

              {/* Address */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="contact-item-content">
                  <div className="contact-item-label">Address</div>
                  <address className="contact-address">
                    <strong>{contactInfo.company}</strong><br />
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.line2}<br />
                    {contactInfo.address.line3}
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.9 13.5 19.79 19.79 0 011.87 4.9 2 2 0 013.85 2.72h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 10.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.04z"/>
                  </svg>
                </div>
                <div className="contact-item-content">
                  <div className="contact-item-label">Phone</div>
                  {contactInfo.phones.map((p) => (
                    <a key={p.link} href={p.link} className="contact-link contact-phone">
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-item-content">
                  <div className="contact-item-label">Email</div>
                  <a href={contactInfo.email.link} className="contact-link contact-email">
                    {contactInfo.email.display}
                  </a>
                </div>
              </div>

              {/* GSTIN */}
              <div className="contact-item contact-item--small">
                <div className="contact-item-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div className="contact-item-content">
                  <div className="contact-item-label">GSTIN</div>
                  <div className="contact-gstin">{contactInfo.gstin}</div>
                  <div className="contact-gstin-note">Verify against original brochure before publishing.</div>
                </div>
              </div>

              {/* Location QR Code from brochure */}
              <div className="contact-qr-wrap">
                <img
                  src="/images/brand/qr-location.jpg"
                  alt="Scan for Location QR Code"
                  className="contact-qr-img"
                  onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
                />
                <div className="contact-qr-text">
                  <span className="contact-qr-title">Scan for Location</span>
                  <span className="contact-qr-subtitle">Scan to open workshop location in maps</span>
                </div>
              </div>

              {/* ISO badge */}
              <div className="contact-cert-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {contactInfo.certification}
              </div>
            </div>
          </ScrollReveal>

          {/* Form Column */}
          <ScrollReveal className="contact-form-col" delay={150}>
            <div className="contact-form-card">
              <h3 className="contact-form-heading">Send an Enquiry</h3>
              <EnquiryForm
                formRef={formRef}
                preselectedCategory={preselectedCategory}
                preselectedMachine={preselectedMachine}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
