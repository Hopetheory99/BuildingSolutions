
import React, { useState } from 'react';
import { ChevronDownIcon, CubeIcon, BuildingIcon, BrickIcon, WindowIcon, LightningBoltIcon, PaintBrushIcon, WrenchIcon, CheckCircleIcon } from './Icons';

const phases = [
  {
    id: 1,
    phase: "Phase 01",
    title: "Site Preparation & Foundation",
    description: "The most critical phase ensuring the longevity and stability of your structure.",
    icon: <CubeIcon className="h-6 w-6" />,
    items: [
      "Digital Land Survey & Soil Testing",
      "Excavation & Earth Removal",
      "Portland Cement (Foundation Grade)",
      "Coarse Sand (Sylhet Sand)",
      "Stone Chips (3/4 inch)",
      "TMT 500W Steel Rebar",
      "Waterproofing Admixtures"
    ]
  },
  {
    id: 2,
    phase: "Phase 02",
    title: "Structural Framework",
    description: "Erecting the skeleton of the building including columns, beams, and slabs.",
    icon: <BuildingIcon className="h-6 w-6" />,
    items: [
      "Formwork & Shuttering Materials",
      "Scaffolding (Bamboo/Steel)",
      "Ready-Mix Concrete or On-site Mix",
      "Steel Binding Wire",
      "Concrete Curing Compounds",
      "Vibrator Machine Service"
    ]
  },
  {
    id: 3,
    phase: "Phase 03",
    title: "Walls & Roofing",
    description: "Enclosing the structure to create defined spaces and weather protection.",
    icon: <BrickIcon className="h-6 w-6" />,
    items: [
      "Auto Bricks or AAC Blocks",
      "Mortar (Sand + Cement)",
      "Plastering Mesh (Chicken Mesh)",
      "Roofing Sheets (Industrial)",
      "Heat Insulation Layers",
      "Lintel Concrete"
    ]
  },
  {
    id: 4,
    phase: "Phase 04",
    title: "Doors, Windows & Exterior",
    description: "Securing the building and establishing its aesthetic appeal.",
    icon: <WindowIcon className="h-6 w-6" />,
    items: [
      "uPVC / Aluminum Window Frames",
      "Tempered Glass Panels",
      "Security Grills & Gates",
      "Exterior Weatherproof Paint",
      "Wall Cladding / Tiles",
      "Solid Wood Entrance Doors"
    ]
  },
  {
    id: 5,
    phase: "Phase 05",
    title: "Plumbing & Electrical",
    description: "Installing the vital arteries and veins of the building.",
    icon: <LightningBoltIcon className="h-6 w-6" />,
    items: [
      "PVC / CPVC / UPVC Pipes & Fittings",
      "Sanitary Ware (Commodes, Basins)",
      "Underground Water Reservoir",
      "Electrical Wiring (Fire Retardant)",
      "Distribution Boards & Circuit Breakers",
      "Switches & Sockets"
    ]
  },
  {
    id: 6,
    phase: "Phase 06",
    title: "Interior Finishing",
    description: "Turning bare walls into a livable, beautiful space.",
    icon: <PaintBrushIcon className="h-6 w-6" />,
    items: [
      "Floor Tiles (Homogeneous / Ceramic)",
      "Interior Wall Putty & Paint",
      "False Ceiling (Gypsum Board)",
      "Kitchen Cabinets & Countertops",
      "Bathroom Fixtures & Mirrors",
      "Lighting Fixtures (LED)"
    ]
  },
  {
    id: 7,
    phase: "Phase 07",
    title: "Utilities & Safety",
    description: "Final installations for comfort, safety, and functionality.",
    icon: <WrenchIcon className="h-6 w-6" />,
    items: [
      "Passenger Lifts / Elevators",
      "Diesel Generator (Backup Power)",
      "Fire Safety Equipment",
      "HVAC / Air Conditioning Systems",
      "Solar Panels",
      "Deep Tube Well Pump"
    ]
  }
];

const BuildingChecklist: React.FC = () => {
  const [openPhase, setOpenPhase] = useState<number | null>(1);

  const togglePhase = (id: number) => {
    setOpenPhase(openPhase === id ? null : id);
  };

  return (
    <section className="py-24 bg-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Everything You Need to Build
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A step-by-step guide to constructing a safe, modern building in Dhaka. 
            From the first shovel of earth to the final coat of paint, we supply it all.
          </p>
        </div>

        <div className="space-y-6">
          {phases.map((phase) => {
            const isOpen = openPhase === phase.id;
            return (
              <div 
                key={phase.id} 
                className={`rounded-2xl overflow-hidden border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isOpen 
                    ? 'bg-gray-800 border-accent shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)] translate-x-2' 
                    : 'bg-gray-800/40 border-gray-700 hover:border-gray-500 hover:bg-gray-800/60'
                }`}
              >
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-6">
                    <div className={`flex-shrink-0 p-4 rounded-xl transition-all duration-500 ${
                      isOpen 
                        ? 'bg-gradient-to-br from-accent to-orange-600 text-white shadow-lg scale-110' 
                        : 'bg-gray-700 text-gray-400 group-hover:text-white group-hover:bg-gray-600'
                    }`}>
                      {React.cloneElement(phase.icon as React.ReactElement, { className: "h-7 w-7" })}
                    </div>
                    <div>
                      <span className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                        isOpen ? 'text-accent' : 'text-gray-500'
                      }`}>
                        {phase.phase}
                      </span>
                      <h3 className={`text-xl md:text-2xl font-bold mt-1 transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {phase.title}
                      </h3>
                      <p className={`text-sm mt-2 transition-all duration-300 hidden sm:block max-w-xl ${
                        isOpen ? 'text-gray-300 opacity-100' : 'text-gray-500 opacity-80'
                      }`}>
                        {phase.description}
                      </p>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 ml-4 transform transition-transform duration-500 ${isOpen ? 'rotate-180 text-accent' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    <ChevronDownIcon className="h-6 w-6" />
                  </div>
                </button>

                <div 
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-0">
                       {/* Mobile Description Fallback */}
                       <p className="text-gray-400 text-sm sm:hidden mb-6 pt-4 border-t border-gray-700/50">{phase.description}</p>
                       
                       <div className="mt-2 p-6 bg-gray-900/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
                         <div className="flex items-center justify-between mb-6">
                           <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                             <span className="w-2 h-2 bg-accent rounded-full"></span>
                             Required Materials
                           </h4>
                           <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
                             {phase.items.length} Items
                           </span>
                         </div>
                         <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                           {phase.items.map((item, idx) => (
                             <li key={idx} className="flex items-start text-gray-300 group/item hover:text-white transition-colors">
                               <CheckCircleIcon className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5 group-hover/item:text-accent transition-colors duration-300" />
                               <span className="text-sm md:text-base leading-relaxed">{item}</span>
                             </li>
                           ))}
                         </ul>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-orange-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}); }}
              className="relative flex items-center bg-gray-900 text-white font-bold py-4 px-12 rounded-full border border-gray-700 hover:border-accent/50 transition-all duration-300"
            >
              <span className="mr-2">Ready to Build?</span>
              <span className="text-accent">Get a Quote</span>
            </a>
          </div>
          <p className="mt-4 text-gray-500 text-sm">
            We supply materials for every phase listed above.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuildingChecklist;
