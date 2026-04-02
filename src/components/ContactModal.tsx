import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Send, Loader2 } from 'lucide-react';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function ContactModal({ isOpen, onClose, serviceName }: ContactModalProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: serviceName || 'General Inquiry' }),
      });
      if (!res.ok) throw new Error('Server error');
      setFormStatus('success');
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setFormStatus('idle');
          setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        }, 500); // Wait for modal exit animation before resetting state
      }, 3000);
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ textAlign: 'left' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-primary">Consult an Expert</h3>
                <p className="text-sm text-slate-500 mt-1">
                  {serviceName ? `Leave your details and we'll discuss ${serviceName}` : 'Leave your details and we\'ll get in touch.'}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-green-600" size={32} />
                  </div>
                  <h4 className="text-2xl font-black text-primary mb-2">Request Sent!</h4>
                  <p className="text-slate-500">
                    {serviceName ? `Thank you. An expert will reach out to you shortly regarding ${serviceName}.` : 'Thank you. An expert will reach out to you shortly.'}
                  </p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1 pl-1">Full Name *</label>
                    <input name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                      placeholder="John Doe" type="text" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1 pl-1">Work Email *</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                        placeholder="john@company.com" type="email" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-1 pl-1">Phone Number</label>
                      <input name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                        placeholder="+254..." type="tel" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1 pl-1">Company Name</label>
                    <input name="company" value={formData.company} onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
                      placeholder="E.g. Ecorenet Ltd" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-1 pl-1">How can we help? *</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 h-28 focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all resize-none"
                      placeholder={serviceName ? `Tell us about your requirements for ${serviceName}...` : "Tell us about your requirements..."} />
                  </div>
                  
                  {formStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                      Oops! Could not send. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
                  >
                    {formStatus === 'loading'
                      ? <><Loader2 size={18} className="animate-spin" /> Submitting...</>
                      : <><Send size={18} /> Request Consultation</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
