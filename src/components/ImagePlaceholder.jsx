import './ImagePlaceholder.css';

/**
 * ImagePlaceholder — shows the actual image if available,
 * or a designed placeholder when the file is missing.
 */
export default function ImagePlaceholder({
  src,
  alt,
  caption,
  label = 'Image to be added',
  category = '',
  className = '',
  aspectRatio = '4/3',
}) {
  return (
    <figure
      className={`img-placeholder-wrapper ${className}`}
      style={{ '--aspect': aspectRatio }}
    >
      <div className="img-placeholder-inner">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const ph = e.currentTarget.nextElementSibling;
            if (ph) ph.style.display = 'flex';
          }}
          onLoad={(e) => {
            const ph = e.currentTarget.nextElementSibling;
            if (ph) ph.style.display = 'none';
          }}
          className="img-placeholder-img"
        />
        {/* Fallback placeholder shown when image is missing */}
        <div className="img-placeholder-fallback" aria-hidden="true">
          <div className="img-placeholder-icon">
            {category === 'machinery' && (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="16" height="13" rx="2"/>
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                <line x1="12" y1="12" x2="12" y2="16"/>
                <line x1="10" y1="14" x2="14" y2="14"/>
              </svg>
            )}
            {category === 'cutting' && (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="6" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20"/>
              </svg>
            )}
            {category === 'facility' && (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            )}
            {!category && (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            )}
          </div>
          <span className="img-placeholder-label">{label}</span>
          {alt && <span className="img-placeholder-alt">{alt}</span>}
        </div>
      </div>
      {caption && <figcaption className="img-placeholder-caption">{caption}</figcaption>}
    </figure>
  );
}
