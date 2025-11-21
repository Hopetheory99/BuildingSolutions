
import React, { useState, useMemo } from 'react';
import { SearchIcon, PackageIcon } from './Icons';

interface Material {
  id: number;
  category: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const materialsData: Material[] = [
  {
    id: 1,
    category: 'Cement',
    name: 'Portland Composite Cement',
    description: 'High durability cement suitable for foundations and structural columns. Brands: Crown, Metrocem.',
    price: 'BDT 450-550 / bag',
    image: 'https://images.unsplash.com/photo-1584804749387-5dbf747f7f8e?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    category: 'Aggregates',
    name: 'Sylhet Sand (Coarse)',
    description: 'Premium river sand essential for high-strength concrete mixes.',
    price: 'BDT 35-45 / cft',
    image: 'https://images.unsplash.com/photo-1624304701680-a0602d808357?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    category: 'Steel',
    name: 'TMT 500W Rebar',
    description: 'Earthquake-resistant 60-grade steel bars from top manufacturers (BSRM, AKS).',
    price: 'BDT 85,000 / ton',
    image: 'https://images.unsplash.com/photo-1535160974756-452595df0040?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    category: 'Bricks',
    name: 'Auto Bricks / AAC Blocks',
    description: 'Eco-friendly, uniform shape, heat-resistant blocks for modern walls.',
    price: 'BDT 12-15 / pc',
    image: 'https://images.unsplash.com/photo-1590224354705-a60679827b6c?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 5,
    category: 'Aggregates',
    name: 'Stone Chips (3/4")',
    description: 'Clean, hard crushed stone for superior concrete strength.',
    price: 'BDT 180-220 / cft',
    image: 'https://images.unsplash.com/photo-1569940073664-555d076dfa71?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 6,
    category: 'Finishing',
    name: 'Homogeneous Floor Tiles',
    description: '24x24 Mirror Polish tiles for elegant interiors.',
    price: 'BDT 85-120 / sqft',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 7,
    category: 'Electrical',
    name: 'Fire Resistant Cables',
    description: 'Safety-rated copper wiring for residential and commercial use.',
    price: 'Varies by gauge',
    image: 'https://images.unsplash.com/photo-1616698756796-66932344f391?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 8,
    category: 'Plumbing',
    name: 'UPVC Pipes & Fittings',
    description: 'Corrosion-free pipes for long-lasting water supply systems.',
    price: 'Varies by size',
    image: 'https://images.unsplash.com/photo-1608098447649-3365cb501703?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 9,
    category: 'Construction Chemicals',
    name: 'Waterproofing Admixture',
    description: 'Integral waterproofing liquid for concrete and plaster to prevent dampness. Brands: Berger, Fosroc.',
    price: 'BDT 180-250 / liter',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 10,
    category: 'Construction Chemicals',
    name: 'Heavy Duty Tile Adhesive',
    description: 'Polymer-modified adhesive for wall and floor tiles, ensuring long-lasting bond. Brands: Star, Akij.',
    price: 'BDT 550-700 / 25kg',
    image: 'https://images.unsplash.com/photo-1581093588402-0f9c1c7a169c?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 11,
    category: 'Hardware & Fasteners',
    name: 'SS Door Hinges (4")',
    description: 'Rust-proof stainless steel hinges with ball bearings for heavy door operation.',
    price: 'BDT 450 / pair',
    image: 'https://images.unsplash.com/photo-1533483603799-452d1dc325cb?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 12,
    category: 'Hardware & Fasteners',
    name: 'Industrial Steel Nails',
    description: 'High-tensile wire nails for formwork, shuttering, and general carpentry.',
    price: 'BDT 80-100 / kg',
    image: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?q=80&w=500&auto=format&fit=crop'
  }
];

const categories = ['All', ...Array.from(new Set(materialsData.map(m => m.category)))];

interface MaterialsCatalogProps {
  onQuoteRequest: () => void;
}

const MaterialsCatalog: React.FC<MaterialsCatalogProps> = ({ onQuoteRequest }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMaterials = useMemo(() => {
    return materialsData.filter(material => {
      const matchesCategory = activeCategory === 'All' || material.category === activeCategory;
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            material.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <section className="py-24 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Materials Catalog
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Browse our selection of premium construction materials available for immediate delivery in Dhaka.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg">
           <div className="relative w-full md:w-1/3">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <SearchIcon className="h-5 w-5 text-gray-400" />
             </div>
             <input
               type="text"
               className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm"
               placeholder="Search materials..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           
           <div className="flex flex-wrap justify-center gap-2">
             {categories.map(category => (
               <button
                 key={category}
                 onClick={() => setActiveCategory(category)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                   activeCategory === category 
                     ? 'bg-accent text-white' 
                     : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                 }`}
               >
                 {category}
               </button>
             ))}
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <div key={material.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-accent/50 transition-all duration-300 group flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={material.image} 
                    alt={material.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-gray-900/80 text-white text-xs font-bold px-2 py-1 rounded">
                    {material.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{material.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">{material.description}</p>
                  <div className="mt-auto">
                    <p className="text-accent font-bold mb-4">{material.price}</p>
                    <button 
                      onClick={onQuoteRequest}
                      className="w-full bg-gray-700 hover:bg-accent text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <PackageIcon className="h-4 w-4" /> Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <div className="col-span-full text-center py-12 text-gray-400">
               No materials found matching your search.
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MaterialsCatalog;
