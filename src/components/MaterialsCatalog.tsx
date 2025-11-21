
import React, { useState, useMemo } from 'react';
import { SearchIcon, PackageIcon, ScaleIcon, CloseIcon } from './Icons';
import { materialsData } from '../data/materials';
import MaterialComparison from './MaterialComparison';

const categories = ['All', ...Array.from(new Set(materialsData.map(m => m.category)))];

interface MaterialsCatalogProps {
  onNavigate: (page: string, materialId?: number) => void;
}

const MaterialsCatalog: React.FC<MaterialsCatalogProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCompareIds, setSelectedCompareIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredMaterials = useMemo(() => {
    return materialsData.filter(material => {
      const matchesCategory = activeCategory === 'All' || material.category === activeCategory;
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            material.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const toggleCompare = (id: number) => {
    setSelectedCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        if (prev.length >= 4) return prev; // Limit to 4 items
        return [...prev, id];
      }
    });
  };

  if (showComparison) {
    return (
      <section className="py-24 bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MaterialComparison 
            selectedIds={selectedCompareIds} 
            onBack={() => setShowComparison(false)}
            onNavigate={onNavigate}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
            filteredMaterials.map((material) => {
              const isSelected = selectedCompareIds.includes(material.id);
              return (
                <div key={material.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-accent/50 transition-all duration-300 group flex flex-col relative">
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
                    {/* Compare Button on Card */}
                    <button
                      onClick={() => toggleCompare(material.id)}
                      className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${isSelected ? 'bg-accent text-white' : 'bg-black/50 text-gray-300 hover:bg-black/70'}`}
                      title={isSelected ? "Remove from comparison" : "Add to compare"}
                    >
                      <ScaleIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2">{material.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{material.description}</p>
                    <div className="mt-auto">
                      <p className="text-accent font-bold mb-4">{material.price}</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => onNavigate('material-detail', material.id)}
                          className="flex-1 bg-gray-700 hover:bg-accent text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          <PackageIcon className="h-4 w-4" /> Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
             <div className="col-span-full text-center py-12 text-gray-400">
               No materials found matching your search.
             </div>
          )}
        </div>

        {/* Floating Comparison Bar */}
        {selectedCompareIds.length > 0 && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
            <div className="bg-gray-800/95 backdrop-blur border border-gray-700 shadow-2xl rounded-xl p-4 flex items-center justify-between animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="bg-accent text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {selectedCompareIds.length}
                </div>
                <span className="text-white font-medium">Items selected</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedCompareIds([])}
                  className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setShowComparison(true)}
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition-colors shadow-lg flex items-center gap-2"
                >
                  <ScaleIcon className="h-5 w-5" /> Compare
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MaterialsCatalog;
