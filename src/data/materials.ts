export interface Material {
  id: number;
  category: string;
  name: string;
  description: string;
  longDescription: string;
  price: string;
  image: string;
  features: string[];
  specifications: { label: string; value: string }[];
}

export const materialsData: Material[] = [
  {
    id: 1,
    category: 'Cement',
    name: 'Portland Composite Cement',
    description: 'High durability cement suitable for foundations and structural columns. Brands: Crown, Metrocem.',
    longDescription: 'Our Portland Composite Cement (PCC) is engineered for high-performance concrete structures. It offers superior long-term strength and durability, making it the ideal choice for Dhaka’s humid climate and soil conditions. Perfectly suited for heavy foundations, columns, beams, and slabs.',
    price: 'BDT 450-550 / bag',
    image: 'https://images.unsplash.com/photo-1584804749387-5dbf747f7f8e?q=80&w=800&auto=format&fit=crop',
    features: ['High Early Strength', 'Sulfate Resistant', 'Low Heat of Hydration', 'Eco-friendly Production'],
    specifications: [
      { label: 'Grade', value: '42.5 N' },
      { label: 'Weight', value: '50kg / bag' },
      { label: 'Setting Time', value: 'Initial: 145 mins' },
      { label: 'Origin', value: 'Bangladesh' }
    ]
  },
  {
    id: 2,
    category: 'Aggregates',
    name: 'Sylhet Sand (Coarse)',
    description: 'Premium river sand essential for high-strength concrete mixes.',
    longDescription: 'Sourced directly from the riverbeds of Sylhet, this coarse sand is free from clay and silt. Its angular particles provide excellent bonding with cement, ensuring high compressive strength for RCC work. A mandatory component for safe high-rise construction.',
    price: 'BDT 35-45 / cft',
    image: 'https://images.unsplash.com/photo-1624304701680-a0602d808357?q=80&w=800&auto=format&fit=crop',
    features: ['FM 2.5 - 2.8', 'Silt Free', 'High Compressive Strength', 'Washed & Screened'],
    specifications: [
      { label: 'FM Value', value: '2.5+' },
      { label: 'Source', value: 'Sylhet Rivers' },
      { label: 'Type', value: 'Coarse Aggregate' },
      { label: 'Moisture', value: '< 5%' }
    ]
  },
  {
    id: 3,
    category: 'Steel',
    name: 'TMT 500W Rebar',
    description: 'Earthquake-resistant 60-grade steel bars from top manufacturers (BSRM, AKS).',
    longDescription: 'Thermo-Mechanically Treated (TMT) 500W bars provide the perfect balance of strength and ductility. Essential for earthquake-prone zones like Dhaka, these bars allow structures to absorb shock without collapsing. Available in various diameters.',
    price: 'BDT 85,000 / ton',
    image: 'https://images.unsplash.com/photo-1535160974756-452595df0040?q=80&w=800&auto=format&fit=crop',
    features: ['Earthquake Resistant', 'High Ductility', 'Corrosion Resistant', 'Superior Weldability'],
    specifications: [
      { label: 'Grade', value: '500W (60 Grade)' },
      { label: 'Diameter', value: '8mm - 32mm' },
      { label: 'Standard', value: 'BDS ISO 6935-2' },
      { label: 'Brand', value: 'BSRM / AKS / KSRM' }
    ]
  },
  {
    id: 4,
    category: 'Bricks',
    name: 'Auto Bricks / AAC Blocks',
    description: 'Eco-friendly, uniform shape, heat-resistant blocks for modern walls.',
    longDescription: 'Modern Automatic Bricks and Autoclaved Aerated Concrete (AAC) blocks offer a sustainable alternative to traditional red clay bricks. They are lighter, reduce structural load, offer better thermal insulation, and require less mortar for plastering.',
    price: 'BDT 12-15 / pc',
    image: 'https://images.unsplash.com/photo-1590224354705-a60679827b6c?q=80&w=800&auto=format&fit=crop',
    features: ['Lightweight', 'Thermal Insulation', 'Sound Proofing', 'Eco-friendly'],
    specifications: [
      { label: 'Size', value: 'Standard / Customized' },
      { label: 'Compressive Strength', value: '> 3000 PSI' },
      { label: 'Water Absorption', value: '< 12%' },
      { label: 'Type', value: 'Solid / Perforated' }
    ]
  },
  {
    id: 5,
    category: 'Aggregates',
    name: 'Stone Chips (3/4")',
    description: 'Clean, hard crushed stone for superior concrete strength.',
    longDescription: 'High-quality crushed stone chips, vital for casting columns, beams, and roof slabs. Our chips are hard, angular, and graded to minimize voids in concrete, saving cement and increasing strength.',
    price: 'BDT 180-220 / cft',
    image: 'https://images.unsplash.com/photo-1569940073664-555d076dfa71?q=80&w=800&auto=format&fit=crop',
    features: ['High Hardness', 'Clean & Graded', 'Low Porosity', 'Excellent Bonding'],
    specifications: [
      { label: 'Size', value: '3/4 inch (20mm)' },
      { label: 'Source', value: 'Bhutan / India / Local' },
      { label: 'Color', value: 'Grey / Black' },
      { label: 'Dust Content', value: '< 1%' }
    ]
  },
  {
    id: 6,
    category: 'Finishing',
    name: 'Homogeneous Floor Tiles',
    description: '24x24 Mirror Polish tiles for elegant interiors.',
    longDescription: 'Add elegance to your floors with our range of Mirror Polished Homogeneous tiles. Stain-resistant and highly durable, they retain their shine for years. Available in various patterns suitable for residential and commercial spaces.',
    price: 'BDT 85-120 / sqft',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=800&auto=format&fit=crop',
    features: ['Mirror Polish', 'Stain Resistant', 'Nano Technology', 'Double Loading'],
    specifications: [
      { label: 'Size', value: '24" x 24"' },
      { label: 'Thickness', value: '8-10mm' },
      { label: 'Water Absorption', value: '< 0.05%' },
      { label: 'Brand', value: 'RAK / Akij / CBC' }
    ]
  },
  {
    id: 7,
    category: 'Electrical',
    name: 'Fire Resistant Cables',
    description: 'Safety-rated copper wiring for residential and commercial use.',
    longDescription: 'Ensure the safety of your building with Fire Retardant (FR) and Fire Resistant (FRLS) cables. Manufactured with 99.99% pure copper conductivity and high-grade PVC insulation to prevent short circuits and fire hazards.',
    price: 'Varies by gauge',
    image: 'https://images.unsplash.com/photo-1616698756796-66932344f391?q=80&w=800&auto=format&fit=crop',
    features: ['99.9% Copper', 'Fire Retardant', 'High Insulation Resistance', 'Low Smoke'],
    specifications: [
      { label: 'Type', value: 'BYA / NYY' },
      { label: 'Voltage', value: '450/750V' },
      { label: 'Standard', value: 'BDS / IEC' },
      { label: 'Brand', value: 'BRB / BBS / Paradise' }
    ]
  },
  {
    id: 8,
    category: 'Plumbing',
    name: 'UPVC Pipes & Fittings',
    description: 'Corrosion-free pipes for long-lasting water supply systems.',
    longDescription: 'Top-grade UPVC pipes designed for high-pressure water supply and sanitary drainage. They are lead-free, chemical resistant, and have a smooth inner surface to prevent scaling and ensure uninterrupted flow.',
    price: 'Varies by size',
    image: 'https://images.unsplash.com/photo-1608098447649-3365cb501703?q=80&w=800&auto=format&fit=crop',
    features: ['Lead Free', 'High Pressure Rating', 'Chemical Resistant', 'Long Lifespan'],
    specifications: [
      { label: 'Diameter', value: '0.5" - 6"' },
      { label: 'Pressure Class', value: 'Class B / C / D' },
      { label: 'Material', value: 'Unplasticized PVC' },
      { label: 'Brand', value: 'RFL / National / Lira' }
    ]
  },
  {
    id: 9,
    category: 'Construction Chemicals',
    name: 'Waterproofing Admixture',
    description: 'Integral waterproofing liquid for concrete and plaster to prevent dampness. Brands: Berger, Fosroc.',
    longDescription: 'Protect your building from dampness and leakage with our high-performance integral waterproofing compounds. When mixed with cement, it fills the capillaries in concrete, making it watertight. Essential for basements, roof slabs, and water tanks.',
    price: 'BDT 180-250 / liter',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    features: ['Reduces Permeability', 'Increases Durability', 'Chloride Free', 'Improves Workability'],
    specifications: [
      { label: 'Dosage', value: '200ml / 50kg cement' },
      { label: 'Appearance', value: 'Dark Brown Liquid' },
      { label: 'Packaging', value: '1L, 5L, 20L' },
      { label: 'Brand', value: 'Berger / Fosroc / Dr. Fixit' }
    ]
  },
  {
    id: 10,
    category: 'Construction Chemicals',
    name: 'Heavy Duty Tile Adhesive',
    description: 'Polymer-modified adhesive for wall and floor tiles, ensuring long-lasting bond. Brands: Star, Akij.',
    longDescription: 'A premium polymer-modified cementitious adhesive for fixing all types of ceramic, vitrified tiles, and natural stones. It offers superior bond strength compared to traditional cement mortar, preventing hollow sounds and tile debonding.',
    price: 'BDT 550-700 / 25kg',
    image: 'https://images.unsplash.com/photo-1581093588402-0f9c1c7a169c?q=80&w=800&auto=format&fit=crop',
    features: ['High Bond Strength', 'No Curing Required', 'Slip Resistant', 'Easy Application'],
    specifications: [
      { label: 'Coverage', value: '30-40 sqft / 25kg' },
      { label: 'Pot Life', value: '2 Hours' },
      { label: 'Color', value: 'Grey / White' },
      { label: 'Standard', value: 'ANSI 118.4' }
    ]
  },
  {
    id: 11,
    category: 'Hardware & Fasteners',
    name: 'SS Door Hinges (4")',
    description: 'Rust-proof stainless steel hinges with ball bearings for heavy door operation.',
    longDescription: 'Heavy-duty Stainless Steel (SS) hinges designed for main doors and heavy wooden frames. Equipped with smooth ball bearings for silent operation and high load-bearing capacity. Rust and corrosion-resistant for lifelong performance.',
    price: 'BDT 450 / pair',
    image: 'https://images.unsplash.com/photo-1533483603799-452d1dc325cb?q=80&w=800&auto=format&fit=crop',
    features: ['SS 304 Grade', 'Ball Bearing', 'Rust Proof', 'Silent Operation'],
    specifications: [
      { label: 'Size', value: '4 inch x 3 inch' },
      { label: 'Thickness', value: '3mm' },
      { label: 'Finish', value: 'Matt / Glossy' },
      { label: 'Load Capacity', value: '60kg / hinge' }
    ]
  },
  {
    id: 12,
    category: 'Hardware & Fasteners',
    name: 'Industrial Steel Nails',
    description: 'High-tensile wire nails for formwork, shuttering, and general carpentry.',
    longDescription: 'Premium quality mild steel wire nails with sharp points and flat heads. Essential for construction formwork (shuttering), scaffolding, and general woodwork. Available in a wide range of lengths to suit different applications.',
    price: 'BDT 80-100 / kg',
    image: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=800&auto=format&fit=crop',
    features: ['Sharp Point', 'Flat Head', 'Bend Resistant', 'Galvanized Options'],
    specifications: [
      { label: 'Sizes', value: '1.5" - 4"' },
      { label: 'Material', value: 'Mild Steel' },
      { label: 'Packaging', value: 'Loose / 5kg Box' },
      { label: 'Finish', value: 'Polished' }
    ]
  }
];
