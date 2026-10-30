import { useState } from 'react';
import { machines } from '../data/machines';
import { contactInfo } from '../data/content';
import './EnquiryForm.css';

const CATEGORIES = [
  { value: '', label: 'Select cutting category' },
  { value: 'circular-saw', label: 'Circular Saw Cutting' },
  { value: 'band-saw', label: 'Band Saw Cutting' },
  { value: 'custom-cutting', label: 'Customized Cutting' },
];

const MACHINE_OPTIONS = [
  { value: '', label: 'Select a machine (optional)' },
  ...machines.map((m) => ({
    value: m.id,
    label: m.spec ? `${m.name} — ${m.spec}` : m.name,
  })),
];

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Your name is required.';
  if (!fields.phone.trim() && !fields.email.trim())
    errors.contact = 'Please provide at least one contact method — phone or email.';
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Please enter a valid email address.';
  if (!fields.requirement.trim())
    errors.requirement = 'Please describe your cutting requirement.';
  return errors;
}

export default function EnquiryForm({ preselectedCategory = '', preselectedMachine = '', formRef }) {
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    category: preselectedCategory,
    machine: preselectedMachine,
    material: '',
    dimensions: '',
    quantity: '',
    requirement: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Sync preselected values when props change without setState-in-effect warning
  const [prevCategory, setPrevCategory] = useState(preselectedCategory);
  const [prevMachine, setPrevMachine] = useState(preselectedMachine);

  if (preselectedCategory !== prevCategory || preselectedMachine !== prevMachine) {
    setPrevCategory(preselectedCategory);
    setPrevMachine(preselectedMachine);
    setFields((prev) => ({
      ...prev,
      category: preselectedCategory || prev.category,
      machine: preselectedMachine || prev.machine,
    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear specific error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (name === 'phone' || name === 'email') setErrors((prev) => ({ ...prev, contact: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Focus first error field
      const firstKey = Object.keys(errs)[0];
      const el = document.getElementById(`form-${firstKey}`);
      el?.focus();
      return;
    }

    // Build mailto body
    const lines = [
      `Name: ${fields.name}`,
      fields.phone ? `Phone: ${fields.phone}` : null,
      fields.email ? `Email: ${fields.email}` : null,
      fields.category ? `Cutting Category: ${CATEGORIES.find(c => c.value === fields.category)?.label || fields.category}` : null,
      fields.machine ? `Machine of Interest: ${MACHINE_OPTIONS.find(m => m.value === fields.machine)?.label || fields.machine}` : null,
      fields.material ? `Material Description: ${fields.material}` : null,
      fields.dimensions ? `Dimensions/Specifications: ${fields.dimensions}` : null,
      fields.quantity ? `Quantity: ${fields.quantity}` : null,
      `\nCutting Requirement:\n${fields.requirement}`,
      fields.notes ? `\nAdditional Notes:\n${fields.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const subject = encodeURIComponent('Cutting Enquiry — Rainbow Metal Cutting');
    const body = encodeURIComponent(lines);
    window.location.href = `${contactInfo.email.link}?subject=${subject}&body=${body}`;

    setSubmitted(true);
  };

  const handleReset = () => {
    setFields({
      name: '', phone: '', email: '', category: '', machine: '',
      material: '', dimensions: '', quantity: '', requirement: '', notes: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="form-success-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h3 className="form-success-title">Enquiry prepared</h3>
        <p className="form-success-body">
          Your email client should have opened with the enquiry details pre-filled. Please
          send the email to complete your submission.
        </p>
        <p className="form-success-note">
          <strong>Note:</strong> This is a frontend-only contact method using a mailto link.
          Your enquiry will be sent directly from your email client to{' '}
          <a href={contactInfo.email.link}>{contactInfo.email.display}</a>.
        </p>
        <button className="btn btn-secondary btn-sm" onClick={handleReset}>
          Start a new enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="enquiry-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Cutting enquiry form"
    >
      <div className="form-section-label">Your Details</div>

      {/* Name */}
      <div className={`form-group ${errors.name ? 'form-group--error' : ''}`}>
        <label htmlFor="form-name" className="form-label">
          Full Name <span className="form-required" aria-label="required">*</span>
        </label>
        <input
          id="form-name"
          name="name"
          type="text"
          className="form-input"
          value={fields.name}
          onChange={handleChange}
          placeholder="Your full name"
          autoComplete="name"
          aria-required="true"
          aria-describedby={errors.name ? 'err-name' : undefined}
        />
        {errors.name && <span id="err-name" className="form-error" role="alert">{errors.name}</span>}
      </div>

      {/* Contact row */}
      <div className="form-row">
        <div className={`form-group ${errors.contact ? 'form-group--error' : ''}`}>
          <label htmlFor="form-phone" className="form-label">
            Phone Number <span className="form-required-note">(or email)</span>
          </label>
          <input
            id="form-phone"
            name="phone"
            type="tel"
            className="form-input"
            value={fields.phone}
            onChange={handleChange}
            placeholder="e.g. 99449 27389"
            autoComplete="tel"
            aria-describedby={errors.contact ? 'err-contact' : undefined}
          />
        </div>
        <div className={`form-group ${errors.email || errors.contact ? 'form-group--error' : ''}`}>
          <label htmlFor="form-email" className="form-label">
            Email Address <span className="form-required-note">(or phone)</span>
          </label>
          <input
            id="form-email"
            name="email"
            type="email"
            className="form-input"
            value={fields.email}
            onChange={handleChange}
            placeholder="your@email.com"
            autoComplete="email"
            aria-describedby={errors.email ? 'err-email' : errors.contact ? 'err-contact' : undefined}
          />
          {errors.email && <span id="err-email" className="form-error" role="alert">{errors.email}</span>}
        </div>
      </div>
      {errors.contact && (
        <span id="err-contact" className="form-error form-error--block" role="alert">{errors.contact}</span>
      )}

      <div className="form-divider" />
      <div className="form-section-label">Cutting Requirement</div>

      {/* Category + Machine */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="form-category" className="form-label">Cutting Category</label>
          <select
            id="form-category"
            name="category"
            className="form-select"
            value={fields.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="form-machine" className="form-label">Machine of Interest</label>
          <select
            id="form-machine"
            name="machine"
            className="form-select"
            value={fields.machine}
            onChange={handleChange}
          >
            {MACHINE_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Requirement */}
      <div className={`form-group ${errors.requirement ? 'form-group--error' : ''}`}>
        <label htmlFor="form-requirement" className="form-label">
          Cutting Requirement <span className="form-required" aria-label="required">*</span>
        </label>
        <textarea
          id="form-requirement"
          name="requirement"
          className="form-textarea"
          value={fields.requirement}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your cutting requirement. What do you need cut, how, and to what specifications?"
          aria-required="true"
          aria-describedby={errors.requirement ? 'err-requirement' : undefined}
        />
        {errors.requirement && (
          <span id="err-requirement" className="form-error" role="alert">{errors.requirement}</span>
        )}
      </div>

      <div className="form-divider" />
      <div className="form-section-label">Material &amp; Dimensions (optional)</div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="form-material" className="form-label">Material Description</label>
          <input
            id="form-material"
            name="material"
            type="text"
            className="form-input"
            value={fields.material}
            onChange={handleChange}
            placeholder="e.g. Mild steel round bar"
          />
        </div>
        <div className="form-group">
          <label htmlFor="form-quantity" className="form-label">Quantity</label>
          <input
            id="form-quantity"
            name="quantity"
            type="text"
            className="form-input"
            value={fields.quantity}
            onChange={handleChange}
            placeholder="e.g. 50 pieces"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="form-dimensions" className="form-label">Dimensions &amp; Specifications</label>
        <input
          id="form-dimensions"
          name="dimensions"
          type="text"
          className="form-input"
          value={fields.dimensions}
          onChange={handleChange}
          placeholder="e.g. 100 mm length, 50 mm diameter"
        />
      </div>

      <div className="form-group">
        <label htmlFor="form-notes" className="form-label">Additional Notes</label>
        <textarea
          id="form-notes"
          name="notes"
          className="form-textarea"
          value={fields.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any other details you'd like to share"
        />
      </div>

      <div className="form-mailto-note" role="note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Submitting will open your email client with your enquiry pre-filled.
        This is a frontend-only website — your email client sends the message.
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-lg form-submit-btn" id="form-submit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Send Enquiry
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={handleReset} id="form-reset">
          Reset
        </button>
      </div>
    </form>
  );
}
