import ScrollReveal from './ScrollReveal';
import { contactInfo } from '../data/content';
import './QualitySection.css';

export default function QualitySection() {
  return (
    <section id="quality" className="section section-navy quality-section">
      <div className="container">
        <div className="quality-inner">
          <ScrollReveal className="quality-logo-col">
            <img
              src="/images/brand/logo.png"
              alt="Rainbow Metal Cutting Logo"
              className="quality-logo"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="quality-logo-fallback" aria-hidden="true">
              <div className="quality-logo-r">R</div>
              <div className="quality-logo-name">
                <span>Rainbow</span>
                <span>Metal Cutting</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="quality-content" delay={150}>
            <div className="quality-tagline">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Perfect Finish Quality
            </div>

            <h2 className="quality-heading">Rainbow Metal Cutting</h2>
            <p className="quality-sub">All Kinds of Circular Saw Metal Cutting Works</p>

            <div className="quality-cert-badge">
              <div className="quality-cert-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="quality-cert-title">{contactInfo.certification}</div>
                <div className="quality-cert-note">
                  As stated in the company brochure. Please contact us to confirm certification status.
                </div>
              </div>
            </div>

            <div className="quality-proprietor">
              <div className="quality-proprietor-avatar">
                <img
                  src="/images/brand/proprietor.jpg"
                  alt={contactInfo.proprietor}
                  className="quality-proprietor-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextElementSibling) {
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }
                  }}
                />
                <span className="quality-proprietor-initials" style={{ display: 'none' }} aria-hidden="true">
                  {contactInfo.proprietor.split(' ').map((w) => w[0]).join('')}
                </span>
              </div>
              <div>
                <div className="quality-proprietor-name">{contactInfo.proprietor}</div>
                <div className="quality-proprietor-title">{contactInfo.proprietorTitle}, Rainbow Metal Cutting</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
