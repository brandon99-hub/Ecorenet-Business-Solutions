import { 
  ArrowRight, 
  Calendar, 
  Database, 
  Zap, 
  BarChart3, 
  FileText, 
  Lightbulb, 
  Network, 
  Sparkles,
  Factory,
  Landmark,
  Activity,
  Send,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Settings,
  Puzzle,
  Users,
  RefreshCw,
  Check,
  Quote,
  Sprout,
  GraduationCap,
  Wallet,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, ReactNode, ChangeEvent, FormEvent } from 'react';
import { Outlet, Link } from 'react-router-dom';
import ContactModal from './ContactModal';

const Navbar = ({ onOpenContact }: { onOpenContact: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/#products' },
    { name: 'Solutions', href: '/#solutions' },
    { name: 'Services', href: '/#services' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect border-b border-slate-100 py-2' : 'bg-[#0B1B32] py-4 shadow-xl'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
        <div className="flex-shrink-0 py-1 overflow-visible">
          <img
            src="/Public/logo.png"
            alt="Ecorenet Business Solutions Limited"
            className={`w-auto object-contain transition-all duration-300 scale-[2.5] origin-left ${
              isScrolled ? 'h-10' : 'h-12'
            }`}
          />
        </div>
        
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className={`font-medium transition-colors hover:text-brand-red ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={onOpenContact} className="bg-brand-red text-white px-6 py-2.5 rounded-lg font-bold transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-brand-red/20">
            Book a call
          </button>
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className={isScrolled ? 'text-primary' : 'text-white'} /> : <Menu className={isScrolled ? 'text-primary' : 'text-white'} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href} 
                className="text-slate-600 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const WA_LINK = "https://wa.me/254796801946?text=Hello%2C%20I%27d%20like%20to%20request%20a%20call%20from%20Ecorenet%20Business%20Solutions.";

const contactInfo = [
  { icon: <Mail size={24} />, label: 'Email us', value: 'info@ecorenet.co.ke', href: 'mailto:info@ecorenet.co.ke' },
  { icon: <Phone size={24} />, label: 'Chat on WhatsApp', value: '+254 796 801 946', href: WA_LINK },
  { icon: <MapPin size={24} />, label: 'Visit us', value: 'Lanphil Arcade, Ridgeways, Off Kiambu Rd', href: 'https://www.google.com/maps/place/Ecorenet+Business+Solutions+Limited/@-1.223681,36.8373898,174m/data=!3m1!1e3!4m6!3m5!1s0x182f1702832fa5d3:0xf9e4ac2491d055b5!8m2!3d-1.2241709!4d36.8373448!16s%2Fg%2F11nb1rr7sm?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D' },
];


const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">Let us build something that works.</h2>
            <p className="text-white/60 text-lg mb-10">Reliable Microsoft solutions for organizations across East Africa.</p>
            <Link to="/#contact" className="bg-brand-red inline-flex text-white px-8 py-4 rounded-full font-bold items-center gap-2 hover:opacity-90 transition-opacity">
              Book a Call <ArrowRight size={20} />
            </Link>
          </div>
          <div className="space-y-8 lg:pl-20">
            {[
              { icon: <Mail size={24} />, label: 'Email', value: 'info@ecorenet.co.ke', href: 'mailto:info@ecorenet.co.ke' },
              { icon: <Phone size={24} />, label: 'WhatsApp', value: '+254 796 801 946', href: WA_LINK },
              { icon: <MapPin size={24} />, label: 'Address', value: 'Lanphil Arcade, Ridgeways, Off Kiambu Rd', href: 'https://www.google.com/maps/place/Ecorenet+Business+Solutions+Limited/@-1.223681,36.8373898,174m/data=!3m1!1e3!4m6!3m5!1s0x182f1702832fa5d3:0xf9e4ac2491d055b5!8m2!3d-1.2241709!4d36.8373448!16s%2Fg%2F11nb1rr7sm?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D' },
            ].map((item, i) =>
              item.href ? (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-6 group hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-red">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-bold text-lg group-hover:text-brand-red transition-colors">{item.value}</p>
                  </div>
                </a>
              ) : (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-red">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-bold text-lg">{item.value}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2026 Ecorenet Business Solutions Ltd. All rights reserved.</p>
          <div className="flex gap-8 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/#products" className="hover:text-white transition-colors">Products</Link>
            <Link to="/#services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};



export default function Layout() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
