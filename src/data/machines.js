// Machine data for Rainbow Metal Cutting
// Source: Company brochure — do not invent specifications not listed

export const machines = [
  {
    id: 'cosen-320',
    name: 'COSEN 320 mm',
    spec: 'Fully Automatic',
    category: 'band-saw',
    categoryLabel: 'Band Saw',
    image: '/images/machinery/cosen-320.jpg',
    description:
      'The COSEN 320 mm fully automatic band saw machine provides precision cutting for customer-supplied metal materials. Suitable for a wide range of profiles. Contact us to discuss your cutting requirements.',
    details: null, // No additional brochure specs
  },
  {
    id: 'cosen-250',
    name: 'COSEN 250 mm',
    spec: 'Fully Automatic',
    category: 'band-saw',
    categoryLabel: 'Band Saw',
    image: '/images/machinery/cosen-250.jpg',
    description:
      'The COSEN 250 mm fully automatic band saw machine offers reliable cutting performance for customer-supplied metal bar stock and profiles. Contact us to discuss your cutting requirements.',
    details: null,
  },
  {
    id: 'laxson-band-saw',
    name: 'LAXSON Band Saw Cutting Machine',
    spec: null,
    category: 'band-saw',
    categoryLabel: 'Band Saw',
    image: '/images/machinery/laxson-band-saw.jpg',
    description:
      'The LAXSON Band Saw Cutting Machine is part of our band saw cutting facility for customer-supplied metal materials. Contact us to discuss your cutting requirements and feasibility.',
    details: null,
  },
  {
    id: 'circular-din-110',
    name: 'Circular Saw Machines',
    spec: 'Dia 110 mm',
    category: 'circular-saw',
    categoryLabel: 'Circular Saw',
    image: '/images/machinery/circular-din-110.jpg',
    description:
      'The perfect solution for cutting bar material with highest precision with minimized costing. Circular saw machine with Dia 110 mm capacity for customer-supplied metal materials.',
    details: 'The perfect solution for cutting bar material with highest precision with minimized costing.',
  },
  {
    id: 'mega-75',
    name: 'Circular Saw — MEGA',
    spec: '75 mm',
    category: 'circular-saw',
    categoryLabel: 'Circular Saw',
    image: '/images/machinery/mega-75.jpg',
    description:
      'MEGA circular saw machine with 75 mm specification. Designed for precise circular saw cutting of customer-supplied metal materials per agreed cutting requirements.',
    details: null,
  },
  {
    id: 'mega-100',
    name: 'Circular Saw — MEGA',
    spec: '100 mm',
    category: 'circular-saw',
    categoryLabel: 'Circular Saw',
    image: '/images/machinery/mega-100.jpg',
    description:
      'MEGA circular saw machine with 100 mm specification. Used for circular saw cutting of customer-supplied metal materials. Contact us to confirm feasibility for your specific requirements.',
    details: null,
  },
];

export const machineCategories = [
  { id: 'all', label: 'All Machines' },
  { id: 'band-saw', label: 'Band Saw' },
  { id: 'circular-saw', label: 'Circular Saw' },
];
