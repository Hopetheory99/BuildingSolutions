
import React, { useState, useRef } from 'react';
import { ArrowLeftIcon, PackageIcon, WarningIcon, SuccessIcon } from './Icons';
import { materialsData } from '../data/materials';

interface MaterialDetailProps {
  materialId: number;
  onBack: () => void;
  onNavigateToMaterial: (id: number) => void;
}

type QuoteFormState = {
  quantity: string;
  phone: string;
  name: string;
  email: string;
  requirements: string;
};

const MaterialDetail: React.FC<MaterialDetailProps> = ({ materialId, onBack, onNavigateToMaterial }) => {
  const material = materialsData.find(m => m.id === materialId);
  const [formData, setFormData] = useState<QuoteFormState>({ quantity: '1', phone: '', name: '', email: '', requirements: '' });
  const [errors, setErrors] = useState<Partial<QuoteFormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!material) {
    return <div className="text-center text-white py-20">Material not found. <button onClick={onBack} className="text-accent underline">Go back</button></div>;
  }

  const relatedMaterials = materialsData
    .filter(m => m.category === material.category && m.id !== material.id)
    .slice(0, 4);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<QuoteFormState> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-()]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Sanitize data
      const cleanData = {
        material: material.name,
        quantity: formData.quantity.trim(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        requirements: formData.requirements.trim()
      };
      
      console.log('Quote Request (Safe):', cleanData);
      setSubmitted(true);
      // Simulate API response delay for better UX
      // setTimeout(() => setSubmitted(false), 5000); 
    } else {
       // Focus first error
       if (formRef.current) {
         const firstError = formRef.current.querySelector('[aria-invalid="true"]');
         if (firstError instanceof HTMLElement) firstError.focus();
       }
    }
  };

  const getInputClass = (name: keyof QuoteFormState) => `
    w-full bg-gray-700 border rounded-lg px-4 py-2 text-white text-base focus:outline-none focus:ring-2 transition-all
    ${errors[name] ? 'border-red-500 focus:ring-red-500 bg-red-900/10' : 'border-gray-600 focus:ring-accent focus:border-accent'}
  `;

  return (
    <section className="py-24 bg-gray-900 min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" /> Back to Catalog
        </button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column: Image & Specs */}
          <div>
            <div className="rounded-xl overflow-hidden shadow-2xl mb-8 border border-gray-700 relative bg-gray-800 min-h-[300px]">
              {!isImageLoaded && (
                 <div 
                   className="absolute inset-0 animate-shimmer z-10"
                   style={{ 
                     background: 'linear-gradient(to right, #1f2937 8%, #374151 18%, #1f2937 33%)', 
                     backgroundSize: '1000px 100%' 
                   }}
                 ></div>
              )}
              <img 
                src={material.image} 
                alt={material.name} 
                className={`w-full h-auto object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsImageLoaded(true)}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Technical Specifications</h3>
              <div className="space-y-3">
                {material.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-700 pb-2 last:border-0">
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Info & Quote Form */}
          <div>
            <span className="text-accent font-bold tracking-wider text-sm uppercase">{material.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-4">{material.name}</h1>
            <p className="text-2xl text-white font-bold mb-6">{material.price}</p>
            
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-gray-300 leading-relaxed mb-4">{material.longDescription}</p>
              <ul className="space-y-2 mt-4">
                {material.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specific Quote Form */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <PackageIcon className="h-5 w-5 text-accent" /> Request Quote for this Item
              </h3>
              
              {submitted ? (
                 <div className="text-center py-8 bg-green-900/10 rounded-lg border border-green-500/20 animate-fade-in">
                    <div className="flex justify-center mb-4">
                      <SuccessIcon className="h-14 w-14 text-success" />
                    </div>
                    <p className="text-white font-bold text-xl mb-2">Quote Request Sent!</p>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">
                      We'll email you the price for <strong>{formData.quantity}</strong> of <strong>{material.name}</strong> shortly.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-accent text-sm hover:underline">Send another request</button>
                 </div>
              ) : (
                <form ref={formRef} onSubmit={handleQuoteSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label htmlFor="qty" className="block text-sm text-gray-400 mb-1">Quantity</label>
                       <input 
                         id="qty"
                         name="quantity"
                         type="text" 
                         value={formData.quantity}
                         onChange={handleChange}
                         className={getInputClass('quantity')}
                         aria-invalid={!!errors.quantity}
                       />
                       {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm text-gray-400 mb-1">Phone</label>
                        <input 
                          id="phone"
                          name="phone"
                          type="tel" 
                          placeholder="+880..." 
                          value={formData.phone}
                          onChange={handleChange}
                          className={getInputClass('phone')}
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleChange}
                      className={getInputClass('name')}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-1">Email</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={getInputClass('email')}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="req" className="block text-sm text-gray-400 mb-1">Additional Requirements</label>
                    <textarea 
                      id="req"
                      name="requirements"
                      rows={3} 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white text-base focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none" 
                      placeholder="Delivery location, urgency, etc."
                      value={formData.requirements}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 rounded-lg transition-colors shadow-lg hover:shadow-accent/20 transform hover:scale-[1.01]">
                    Get Price Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Related Materials */}
        {relatedMaterials.length > 0 && (
          <div className="border-t border-gray-800 pt-12">
            <h2 className="text-2xl font-bold text-white mb-8">Related Materials</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedMaterials.map(item => (
                <button 
                  key={item.id}
                  onClick={() => onNavigateToMaterial(item.id)}
                  className="text-left bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-accent/50 transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white group-hover:text-accent transition-colors">{item.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">{item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MaterialDetail;
