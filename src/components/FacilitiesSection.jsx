import ScrollReveal from './ScrollReveal';
import ImagePlaceholder from './ImagePlaceholder';
import { facilitiesItems } from '../data/content';
import './FacilitiesSection.css';

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="section section-alt facilities-section">
      <div className="container">
        <ScrollReveal className="section-header section-header-center">
          <div className="section-label">Where We Work</div>
          <h2 className="section-heading section-heading-lg">Our Facilities</h2>
          <p className="section-subtext">
            Our workshop is located in Ganapathy, Coimbatore. The following facilities
            support our metal cutting operations.
          </p>
        </ScrollReveal>

        {/* Building highlight */}
        <ScrollReveal className="facilities-building">
          <div className="facilities-building-image">
            <ImagePlaceholder
              src="/images/facilities/building.jpg"
              alt="Rainbow Metal Cutting workshop building, Ganapathy, Coimbatore"
              label="Building photograph to be added"
              category="facility"
              aspectRatio="16/7"
            />
          </div>
          <div className="facilities-building-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Our Workshop &amp; Building — Ganapathy, Coimbatore
          </div>
        </ScrollReveal>

        {/* Facilities grid */}
        <div className="facilities-grid">
          {facilitiesItems.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100} className="facility-card">
              <ImagePlaceholder
                src={item.image}
                alt={item.title}
                label={`${item.title} image to be added`}
                category="facility"
                aspectRatio="4/3"
              />
              <div className="facility-card-body">
                <h3 className="facility-card-title">{item.title}</h3>
                <p className="facility-card-desc">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="facilities-disclaimer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Facility descriptions are based on information from the company brochure.
          Contact us for specific operational queries.
        </ScrollReveal>
      </div>
    </section>
  );
}
