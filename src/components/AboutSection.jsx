import ScrollReveal from './ScrollReveal';
import ImagePlaceholder from './ImagePlaceholder';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <section id="about" className="section section-alt about-section">
      <div className="container">
        <div className="about-grid">
          {/* Image */}
          <ScrollReveal className="about-image-col">
            <ImagePlaceholder
              src="/images/facilities/building.jpg"
              alt="Rainbow Metal Cutting workshop building in Ganapathy, Coimbatore"
              label="Workshop image to be added"
              category="facility"
              aspectRatio="4/3"
              className="about-image"
            />
            {/* Tagline card */}
            <div className="about-tagline-card">
              <div className="about-tagline-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="about-tagline-text">Perfect Finish Quality</div>
                <div className="about-tagline-sub">ISO 9001:2015 Certified</div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal className="about-content" delay={150}>
            <div className="section-label">About Us</div>
            <h2 className="section-heading section-heading-lg">About Rainbow Metal Cutting</h2>

            <p className="about-lead">
              Rainbow Metal Cutting is a metal cutting service company based in Ganapathy, Coimbatore,
              Tamil Nadu. Our business model is straightforward: you supply the raw material, and we
              cut it to your requirements.
            </p>

            <div className="about-points">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                  ),
                  title: 'Customer-Supplied Material',
                  desc: 'You bring your metal material; we perform the cutting work. We do not supply raw materials.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  ),
                  title: 'Requirement-Based Cutting',
                  desc: 'All cutting is performed according to agreed requirements and specifications provided by the customer.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                    </svg>
                  ),
                  title: 'Circular Saw & Band Saw Machinery',
                  desc: 'We operate COSEN fully automatic band saws, LAXSON band saw, and MEGA & Din circular saw machines.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                  ),
                  title: 'Customized Cutting Enquiries Welcome',
                  desc: 'Customers with specific shapes, dimensions, or custom cutting requirements are welcome to enquire. Subject to feasibility confirmation.',
                },
              ].map((point, i) => (
                <div key={i} className="about-point">
                  <div className="about-point-icon">{point.icon}</div>
                  <div>
                    <div className="about-point-title">{point.title}</div>
                    <div className="about-point-desc">{point.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-cert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              ISO 9001:2015 Certified Company &nbsp;·&nbsp; "Perfect Finish Quality"
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
