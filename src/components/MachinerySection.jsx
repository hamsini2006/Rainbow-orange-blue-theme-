import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import ImagePlaceholder from './ImagePlaceholder';
import { machines, machineCategories } from '../data/machines';
import './MachinerySection.css';

// Machine Details Modal
function MachineModal({ machine, onClose, onQuote }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === modalRef.current) onClose();
  };

  return (
    <div
      ref={modalRef}
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${machine.name}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-panel">
        <button
          ref={closeBtnRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close machine details"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-image">
          <ImagePlaceholder
            src={machine.image}
            alt={`${machine.name} — ${machine.spec || 'band saw / circular saw'}`}
            label="Machine image to be added"
            category="machinery"
            aspectRatio="16/9"
          />
        </div>

        <div className="modal-content">
          <div className="machine-cat-badge machine-cat-badge--modal">
            {machine.categoryLabel}
          </div>
          <h2 className="modal-title">{machine.name}</h2>
          {machine.spec && (
            <div className="modal-spec">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Specification: <strong>{machine.spec}</strong>
            </div>
          )}
          <p className="modal-desc">{machine.description}</p>
          <p className="modal-note">
            <em>
              Specifications are listed as shown in the company brochure. Contact us to
              confirm suitability for your specific material and cutting requirement.
            </em>
          </p>
          <button
            className="btn btn-primary"
            onClick={() => { onClose(); onQuote(machine.id); }}
          >
            Request a Quote for This Machine
          </button>
        </div>
      </div>
    </div>
  );
}

// Individual Machine Card
function MachineCard({ machine, onViewDetails, onQuote, index }) {
  return (
    <ScrollReveal delay={index * 80} className="machine-card">
      <div className="machine-card-image">
        <ImagePlaceholder
          src={machine.image}
          alt={`${machine.name}${machine.spec ? ' — ' + machine.spec : ''}`}
          label="Machine image to be added"
          category="machinery"
          aspectRatio="4/3"
        />
        <div className="machine-cat-badge">{machine.categoryLabel}</div>
      </div>

      <div className="machine-card-body">
        <h3 className="machine-card-name">{machine.name}</h3>
        {machine.spec ? (
          <div className="machine-card-spec">{machine.spec}</div>
        ) : (
          <div className="machine-card-spec machine-card-spec--contact">
            Contact us for details
          </div>
        )}
        <p className="machine-card-desc">{machine.description}</p>
      </div>

      <div className="machine-card-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => onViewDetails(machine)}
          id={`machine-details-${machine.id}`}
          aria-label={`View details for ${machine.name}`}
        >
          View Details
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onQuote(machine.id)}
          id={`machine-quote-${machine.id}`}
          aria-label={`Request a quote for ${machine.name}`}
        >
          Request a Quote
        </button>
      </div>
    </ScrollReveal>
  );
}

export default function MachinerySection({ onQuoteWithMachine }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const prevFocusRef = useRef(null);

  const filtered = activeFilter === 'all'
    ? machines
    : machines.filter((m) => m.category === activeFilter);

  const handleViewDetails = (machine) => {
    prevFocusRef.current = document.activeElement;
    setSelectedMachine(machine);
  };

  const handleCloseModal = () => {
    setSelectedMachine(null);
    prevFocusRef.current?.focus();
  };

  const handleQuote = (machineId) => {
    onQuoteWithMachine(machineId);
  };

  return (
    <section id="machinery" className="section section-alt machinery-section">
      <div className="container">
        <ScrollReveal className="section-header section-header-center">
          <div className="section-label">Our Equipment</div>
          <h2 className="section-heading section-heading-lg">Our Machinery</h2>
          <p className="section-subtext">
            We operate six machines covering both band saw and circular saw cutting.
            All machines are used for cutting customer-supplied metal materials.
          </p>
        </ScrollReveal>

        {/* Filters */}
        <div className="machinery-filters" role="group" aria-label="Filter machines by type">
          {machineCategories.map((cat) => (
            <button
              key={cat.id}
              className={`machinery-filter-btn ${activeFilter === cat.id ? 'machinery-filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
              aria-pressed={activeFilter === cat.id}
              id={`filter-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Machine Grid */}
        <div className="machinery-grid" aria-live="polite" aria-label="Filtered machines">
          {filtered.map((machine, i) => (
            <MachineCard
              key={machine.id}
              machine={machine}
              index={i}
              onViewDetails={handleViewDetails}
              onQuote={handleQuote}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedMachine && (
        <MachineModal
          machine={selectedMachine}
          onClose={handleCloseModal}
          onQuote={handleQuote}
        />
      )}
    </section>
  );
}
