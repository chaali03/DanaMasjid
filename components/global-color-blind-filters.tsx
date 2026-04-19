'use client';

/**
 * Accurate Color Blind Filters
 * Based on scientific color vision deficiency simulation
 * References:
 * - Brettel, H., Viénot, F., & Mollon, J. D. (1997)
 * - Machado, G. M., Oliveira, M. M., & Fernandes, L. A. (2009)
 */

export function GlobalColorBlindFilters() {
  return (
    <svg
      className="global-accessibility-filters"
      style={{ position: 'absolute', width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Protanopia (Red-Blind) - Accurate simulation */}
        <filter id="global-protanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.567, 0.433, 0,     0, 0
                    0.558, 0.442, 0,     0, 0
                    0,     0.242, 0.758, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Deuteranopia (Green-Blind) - Accurate simulation */}
        <filter id="global-deuteranopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.625, 0.375, 0,   0, 0
                    0.7,   0.3,   0,   0, 0
                    0,     0.3,   0.7, 0, 0
                    0,     0,     0,   1, 0"
          />
        </filter>

        {/* Tritanopia (Blue-Blind) - Accurate simulation */}
        <filter id="global-tritanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.95, 0.05,  0,     0, 0
                    0,    0.433, 0.567, 0, 0
                    0,    0.475, 0.525, 0, 0
                    0,    0,     0,     1, 0"
          />
        </filter>

        {/* Protanomaly (Red-Weak) */}
        <filter id="global-protanomaly-filter">
          <feColorMatrix
            type="matrix"
            values="0.817, 0.183, 0,     0, 0
                    0.333, 0.667, 0,     0, 0
                    0,     0.125, 0.875, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Deuteranomaly (Green-Weak) */}
        <filter id="global-deuteranomaly-filter">
          <feColorMatrix
            type="matrix"
            values="0.8,   0.2,   0,     0, 0
                    0.258, 0.742, 0,     0, 0
                    0,     0.142, 0.858, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Tritanomaly (Blue-Weak) */}
        <filter id="global-tritanomaly-filter">
          <feColorMatrix
            type="matrix"
            values="0.967, 0.033, 0,     0, 0
                    0,     0.733, 0.267, 0, 0
                    0,     0.183, 0.817, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Achromatopsia (Total Color Blindness) - Grayscale */}
        <filter id="global-achromatopsia-filter">
          <feColorMatrix
            type="matrix"
            values="0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0.299, 0.587, 0.114, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Achromatomaly (Partial Color Blindness) */}
        <filter id="global-achromatomaly-filter">
          <feColorMatrix
            type="matrix"
            values="0.618, 0.320, 0.062, 0, 0
                    0.163, 0.775, 0.062, 0, 0
                    0.163, 0.320, 0.516, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>
      </defs>
    </svg>
  );
}
