
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { PhoneIcon, SuccessIcon, WarningIcon, CloseIcon } from './Icons';

interface RequestCallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

type CallbackFormState = {
  name: string;
  phone: string;
  preferredTime: string;
};

const RequestCallbackModal: React.FC<RequestCallbackModalProps> = ({ isOpen, onClose, triggerRef }) => {
  const [formData, setFormData] = useState<CallbackFormState>({ name: '', phone: '', preferredTime: 'Anytime' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', phone: '', preferredTime: 'Anytime' });
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
      setShake(false);
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-()]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      ariaLabelledById="callback-modal-title"
      ariaDescribedById="callback-modal-desc"
    >
      <div className="relative bg-gray-800 text-white max-w-md w-full mx-auto p-0 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gray-900/50">
          <h2 id="callback-modal-title" className="text-2xl font-bold flex items-center gap-2">
            <PhoneIcon className="h-6 w-6 text-accent" title="Request Callback" />
            Request a Callback
          </h2>
          <p id="callback-modal-desc" className="text-gray-400 mt-1 text-sm">
            Leave your details and we'll get back to you.
          </p>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="flex justify-center mb-4">
                <SuccessIcon className="h-16 w-16 text-success" title="Success" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
              <p className="text-gray-300 mb-6">
                Our team will call you at <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={onClose}
                className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors w-full"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="callback-name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="callback-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'
                  }`}
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center animate-fade-in">
                    <WarningIcon className="h-3 w-3 mr-1" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="callback-phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="callback-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 border rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                    errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-600'
                  }`}
                  placeholder="+880 1XXX NNNNNN"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center animate-fade-in">
                    <WarningIcon className="h-3 w-3 mr-1" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="callback-time" className="block text-sm font-medium text-gray-300 mb-1">
                  Best Time to Call
                </label>
                <select
                  id="callback-time"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="Anytime">Anytime</option>
                  <option value="Morning">Morning (9AM - 12PM)</option>
                  <option value="Afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="Evening">Evening (5PM - 8PM)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-accent hover:bg-accent-hover text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 ${shake ? 'animate-shake' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <PhoneIcon className="h-5 w-5" /> Call Me Back
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RequestCallbackModal;
