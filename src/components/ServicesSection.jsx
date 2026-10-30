import ScrollReveal from './ScrollReveal';
import { services } from '../data/content';
import './ServicesSection.css';

// SVG icons for service cards
function CircularSawIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="3"/>
      <line x1="12" y1="3" x2="12" y2="9"/>
      <line x1="12" y1="15" x2="12" y2="21"/>
      <line x1="3" y1="12" x2="9" y2="12"/>
      <line x1="15" y1="12" x2="21" y2="12"/>
    </svg>
  );
}

function BandSawIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <path d="M7 4v16M17 4v16"/>
      <path d="M3 9h18"/>
      <path d="M3 15h18"/>
    </svg>
  );
}

function CustomCutIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  );
}

const iconMap = {
  'circular-saw': <CircularSawIcon />,
  'band-saw': <BandSawIcon />,
  'custom': <CustomCutIcon />,
};

export default function ServicesSection({ onEnquireClick }) {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <ScrollReveal className="section-header section-header-center">
          <div className="section-label">What We Offer</div>
          <h2 className="section-heading section-heading-lg">Our Cutting Services</h2>
          <p className="section-subtext">
            We cut customer-supplied metal materials according to agreed requirements using
            our circular saw and band saw machinery. Customized cutting enquiries are welcome.
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((service, i) => (
            <ScrollReveal
              key={service.id}
              delay={i * 120}
              className="service-card"
            >
              <div className="service-card-icon">
                {iconMap[service.icon] || <CircularSawIcon />}
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.description}</p>
              <button
                className="btn btn-secondary btn-sm service-card-cta"
                onClick={() => onEnquireClick(service.formCategory)}
                id={`service-cta-${service.id}`}
              >
                {service.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
