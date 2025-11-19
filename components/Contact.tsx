
import React, { useState, useEffect } from 'react';
import { MailIcon, PhoneIcon, LocationIcon, WarningIcon, SuccessIcon } from './Icons';
import InteractiveMap from './InteractiveMap';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type Errors = {
  [key in keyof FormState]?: string;
};

const disposableEmailDomains = [
  'mailinator.com', 'temp-mail.org', '10minutemail.com', 'guerrillamail.com' 
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;

  const validate = (data: FormState): Errors => {
    const newErrors: Errors = {};
    if (!data.name.trim()) newErrors.name = 'Full name is required.';
    
    if (!data.email) {
      newErrors.email = 'A valid email is required to send your quote.';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email format (e.g., name@domain.com).';
    } else if (disposableEmailDomains.some(domain => data.email.endsWith('@' + domain))) {
      newErrors.email = 'Disposable email addresses are not permitted.';
    }

    if (!data.phone) {
      newErrors.phone = 'A contact phone number is required.';
    } else if (!/^\+?[0-9\s-()]{7,}$/.test(data.phone)) {
        newErrors.phone = 'Please enter a valid phone number (min 7 digits).'
    }

    if (!data.message) {
      newErrors.message = 'Please tell us a bit about your project.';
    } else if (data.message.length < 10) {
      newErrors.message = 'Description must be at least 10 characters.';
    }
    
    return newErrors;
  };
  
  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTouched({});
    setErrors({});
    setSubmitted(false);
    setShake(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
    } else {
      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      // Focus first invalid field
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField instanceof HTMLElement) {
        firstErrorField.focus();
      }
    }
  };

  const getInputClassName = (name: keyof FormState) => {
    const base = "w-full bg-gray-700 border rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 transition-all duration-300";
    if (!touched[name]) return `${base} border-gray-600 focus:border-accent focus:ring-accent`;
    return errors[name] 
      ? `${base} border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-900/10` 
      : `${base} border-green-500 focus:ring-green-500 focus:border-green-500 bg-green-900/10`;
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Get Your Quote</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Have a project in mind? We'd love to hear from you.
          </p>
        </div>
        <div ref={ref} className="grid md:grid-cols-2 gap-12">
          <div className={`space-y-8 opacity-0 ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <div className="flex items-start space-x-4 group">
              <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-gray-600 transition-colors">
                <LocationIcon className="h-6 w-6 text-accent" title="Location" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Our Office</h3>
                <p className="text-gray-400 mt-1">123 Construction Ave, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-gray-600 transition-colors">
                <MailIcon className="h-6 w-6 text-accent" title="Email" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Email Us</h3>
                <p className="text-gray-400 mt-1 hover:text-accent transition-colors"><a href="mailto:contact@buildingsolution.com">contact@buildingsolution.com</a></p>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
               <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-gray-600 transition-colors">
                <PhoneIcon className="h-6 w-6 text-accent" title="Phone" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Call Us</h3>
                <p className="text-gray-400 mt-1 hover:text-accent transition-colors"><a href="tel:+1234567890">+1 (234) 567-890</a></p>
              </div>
            </div>
            <div className="mt-6">
              <InteractiveMap />
            </div>
          </div>
          <div className={`bg-gray-900 p-8 rounded-lg shadow-xl opacity-0 ${isVisible ? 'animate-fade-in-up animate-delay' : ''}`} style={{ '--animation-delay': '150ms' } as React.CSSProperties}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
                <div className="w-24 h-24 bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                   <SuccessIcon className="h-12 w-12 text-success" title="Success" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-300 max-w-sm mb-4">
                  Thank you for reaching out. We have received your message and will get back to you within 24 hours.
                </p>
                <p className="text-gray-400 text-sm mb-8">For urgent inquiries, please call us directly.</p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} onBlur={handleBlur} className={getInputClassName('name')} placeholder="John Doe" aria-invalid={touched.name && !!errors.name} aria-describedby={touched.name && errors.name ? "name-error" : undefined} />
                  {touched.name && errors.name && <div id="name-error" className="flex items-center text-red-500 text-xs mt-1 ml-1 animate-fade-in" role="alert"><WarningIcon className="h-3 w-3 mr-1 flex-shrink-0" /><span>{errors.name}</span></div>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Email Address</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} onBlur={handleBlur} className={getInputClassName('email')} placeholder="john@example.com" aria-invalid={touched.email && !!errors.email} aria-describedby={touched.email && errors.email ? "email-error" : undefined} />
                  {touched.email && errors.email && <div id="email-error" className="flex items-center text-red-500 text-xs mt-1 ml-1 animate-fade-in" role="alert"><WarningIcon className="h-3 w-3 mr-1 flex-shrink-0" /><span>{errors.email}</span></div>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Phone Number</label>
                  <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={getInputClassName('phone')} placeholder="+880 1..." aria-invalid={touched.phone && !!errors.phone} aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined} />
                  {touched.phone && errors.phone && <div id="phone-error" className="flex items-center text-red-500 text-xs mt-1 ml-1 animate-fade-in" role="alert"><WarningIcon className="h-3 w-3 mr-1 flex-shrink-0" /><span>{errors.phone}</span></div>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Project Details</label>
                  <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} onBlur={handleBlur} className={getInputClassName('message')} placeholder="Tell us about your project requirements..." aria-invalid={touched.message && !!errors.message} aria-describedby={touched.message && errors.message ? "message-error" : undefined}></textarea>
                  {touched.message && errors.message && <div id="message-error" className="flex items-center text-red-500 text-xs mt-1 ml-1 animate-fade-in" role="alert"><WarningIcon className="h-3 w-3 mr-1 flex-shrink-0" /><span>{errors.message}</span></div>}
                </div>
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className={`w-full bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-accent-hover transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed ${shake ? 'animate-shake' : ''}`}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
