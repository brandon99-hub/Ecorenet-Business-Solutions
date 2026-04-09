import { 
  ArrowRight, 
  Calendar, 
  Layout, 
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
  Loader2,
  Award,
  Building,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence, animate, useInView } from 'motion/react';
import { useState, useEffect, ReactNode, ChangeEvent, FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[75vh] flex items-center hero-diagonal overflow-hidden pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <span className="text-brand-red font-bold tracking-widest text-[10px] uppercase mb-2 block">Microsoft Solutions Partner</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              Your Partner for Digital Transformation That Delivers
            </h1>
            <p className="text-base text-white/70 mb-6 max-w-md leading-relaxed">
              Modernise systems, automate workflows, and scale with Dynamics 365, Azure, and Power Platform.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#products" className="bg-brand-red text-white px-5 py-2.5 rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-brand-red/20 flex items-center gap-2 text-xs">
                Explore Products <ArrowRight size={16} />
              </a>
              <a href="#contact" className="flex items-center gap-2 text-white font-bold hover:text-brand-red transition-colors group text-xs">
                <Calendar className="text-white group-hover:text-brand-red transition-colors" size={16} />
                Book a Consultation
              </a>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 grid grid-cols-1 md:grid-cols-6 gap-4 relative mt-12 lg:mt-0"
          >
            {/* Top Row: 2 Cards */}
            <div className="md:col-span-3">
              <ProductCard 
                icon={<img src="/Dynamics 365.png" alt="Dynamics 365" className="w-full h-full object-contain" />} 
                title="Dynamics 365" 
                desc="CRM and ERP that connect your teams."
              />
            </div>
            <div className="md:col-span-3">
              <ProductCard 
                icon={<img src="/microsoft 365.jpg" alt="Microsoft 365" className="w-full h-full object-contain" />} 
                title="Microsoft 365" 
                desc="Productivity, collaboration, and security."
              />
            </div>

            {/* Bottom Row: 3 Cards */}
            <div className="md:col-span-2">
              <ProductCard 
                plainIcon={true}
                icon={<img src="/azure.jpg" alt="Azure" className="w-12 h-12 object-contain" />} 
                title="Azure" 
                desc="Secure cloud, AI, and data infrastructure."
              />
            </div>
            <div className="md:col-span-2">
              <ProductCard 
                icon={<img src="/powerlogo.jpg" alt="Power Platform" className="w-full h-full object-contain" />} 
                title="Power Platform" 
                desc="Apps, automation, and insights."
              />
            </div>
            <div className="md:col-span-2">
              <ProductCard 
                icon={<img src="/business central.jpg" alt="Business Central" className="w-full h-full object-contain" />} 
                title="Business Central" 
                desc="All-in-one business management."
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const ProductCard = ({ icon, title, desc, plainIcon = false, headerImage }: { icon: ReactNode, title: string, desc: string, plainIcon?: boolean, headerImage?: string }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    }}
    className="h-full bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm transition-all duration-300 flex flex-col items-start group overflow-hidden"
  >
    {headerImage && (
      <div className="w-full h-32 overflow-hidden">
        <img 
          src={headerImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>
    )}
    <div className="p-6 flex flex-col items-start w-full">
      <div className={`flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
        plainIcon 
          ? "w-12 h-12 bg-transparent" 
          : "w-12 h-12 bg-white/80 rounded-xl shadow-sm"
      }`}>
        {icon}
      </div>
      <h3 className="text-primary font-extrabold text-xl mb-2 tracking-tight group-hover:text-brand-red transition-colors duration-300">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

const Philosophy = () => {
  const pillars = [
    {
      icon: <Lightbulb className="text-brand-red" size={32} />,
      title: "Innovate",
      desc: "Pushing the boundaries of what's possible with AI, low-code solutions, and cloud-native architecture."
    },
    {
      icon: <Network className="text-brand-red" size={32} />,
      title: "Connect",
      desc: "Breaking silos and connecting data, processes, and people through unified Microsoft ecosystems."
    },
    {
      icon: <Sparkles className="text-brand-red" size={32} />,
      title: "Inspire",
      desc: "Enabling your workforce to reach their full potential through intuitive tools and modern workflows."
    }
  ];

  return (
    <section className="py-24 bg-surface" id="Why">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 md:px-8 text-center mb-20"
      >
        <span className="text-brand-red font-bold tracking-widest text-sm uppercase mb-4 block">Our Philosophy</span>
        <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Innovate. Connect. Inspire.</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          We don't just provide technology; we architect transformation through three core pillars of excellence.
        </p>
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {pillars.map((pillar, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="p-10 rounded-xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 bg-brand-red/10 rounded-xl flex items-center justify-center mb-8">
              {pillar.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
            <p className="text-slate-500 leading-relaxed">{pillar.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProductsGrid = () => {
  const products = [
    {
      icon: <img src="/Dynamics 365.png" alt="Microsoft Dynamics 365 CRM and ERP implementation East Africa" className="w-full h-full object-contain" />,
      title: "Dynamics 365",
      desc: "Sales, service, and operations in one platform."
    },
    {
      icon: <img src="/microsoft 365.jpg" alt="Microsoft 365 collaboration and productivity suite Kenya" className="w-full h-full object-contain" />,
      title: "Microsoft 365",
      desc: "Word, Excel, Teams, and secure cloud storage."
    },
    {
      icon: <img src="/azure.jpg" alt="Microsoft Azure cloud compute and AI services Kenya" className="w-12 h-12 object-contain" />,
      title: "Azure",
      desc: "Cloud compute, AI, and data services.",
      plain: true,
      headerImage: "/Azure3.jpg"
    },
    {
      icon: <img src="/powerlogo.jpg" alt="Microsoft Power Platform low-code development and automation" className="w-full h-full object-contain" />,
      title: "Power Platform",
      desc: "Power BI, Apps, Automate, and Virtual Agents.",
      headerImage: "/Powerapp1.jpg"
    },
    {
      icon: <img src="/business central.jpg" alt="Dynamics 365 Business Central ERP system Nairobi" className="w-full h-full object-contain" />,
      title: "Business Central",
      desc: "Finance, supply chain, and project management.",
      headerImage: "/business central1.png"
    }
  ];

  return (
    <section className="py-24 bg-[#f8faff]" id="products">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <span className="text-brand-red font-bold tracking-widest text-sm uppercase mb-4 block">OUR PRODUCTS</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8">Frontline software products</h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed">Integrated Microsoft solutions that streamline operations, enhance collaboration, and scale with your growth.</p>
            <a href="#products">
              <button className="border border-brand-red text-brand-red px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-brand-red hover:text-white transition-all w-fit">
                View All Products <ArrowRight size={16} />
              </button>
            </a>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-6 gap-4"
          >
            {/* Top Row: 2 Cards */}
            <div className="md:col-span-3">
              <Link to="/products/dynamics-365" className="block h-full outline-none focus:ring-4 focus:ring-brand-red/20 rounded-2xl">
                <ProductCard {...products[0]} />
              </Link>
            </div>
            <div className="md:col-span-3">
              <Link to="/products/microsoft-365" className="block h-full outline-none focus:ring-4 focus:ring-brand-red/20 rounded-2xl">
                <ProductCard {...products[1]} />
              </Link>
            </div>

            {/* Bottom Row: 3 Cards */}
            <div className="md:col-span-2">
              <Link to="/products/azure" className="block h-full outline-none focus:ring-4 focus:ring-brand-red/20 rounded-2xl">
                <ProductCard {...products[2]} plainIcon={products[2].plain} headerImage={products[2].headerImage} />
              </Link>
            </div>
            <div className="md:col-span-2">
              <Link to="/products/power-platform" className="block h-full outline-none focus:ring-4 focus:ring-brand-red/20 rounded-2xl">
                <ProductCard {...products[3]} headerImage={products[3].headerImage} />
              </Link>
            </div>
            <div className="md:col-span-2">
              <Link to="/products/business-central" className="block h-full outline-none focus:ring-4 focus:ring-brand-red/20 rounded-2xl">
                <ProductCard {...products[4]} headerImage={products[4].headerImage} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Solutions = () => {
  const industries = [
    { icon: <Factory size={20} />, name: "Manufacturing", desc: <>Production planning, inventory managed by <Link to="/products/business-central" className="text-brand-red font-semibold hover:underline">Business Central</Link>.</> },
    { icon: <Activity size={20} />, name: "Healthcare", desc: <>Patient management, compliance, and secure <Link to="/products/microsoft-365" className="text-brand-red font-semibold hover:underline">Teams collaboration</Link>.</> },
    { icon: <Sprout size={20} />, name: "Agribusiness", desc: <>Supply chain traceability effectively managed through <Link to="/products/dynamics-365" className="text-brand-red font-semibold hover:underline">Dynamics 365</Link>.</> },
    { icon: <GraduationCap size={20} />, name: "Education", desc: <>Admin workflows, learning tools, and insights powered by <Link to="/products/power-platform" className="text-brand-red font-semibold hover:underline">Power BI</Link>.</> },
    { icon: <Wallet size={20} />, name: "FinTech", desc: <>Secure data hosted on <Link to="/products/azure" className="text-brand-red font-semibold hover:underline">Azure</Link>, reporting, and automation.</> },
    { icon: <Landmark size={20} />, name: "Governance", desc: <>Transparent operations and efficient <Link to="/products/microsoft-365" className="text-brand-red font-semibold hover:underline">Microsoft 365</Link> document management.</> }
  ];

  return (
    <section className="py-20 bg-white" id="solutions">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-red font-bold tracking-widest text-[10px] uppercase mb-2 block">INDUSTRY SOLUTIONS</span>
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-4">A solution for every industry</h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">Customized Microsoft-powered solutions aligned to your workflows.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-100/50 border border-slate-50 hover:shadow-2xl transition-all group"
            >
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-6 text-brand-red">
                {ind.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">{ind.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Settings size={20} />, title: 'Implementation', desc: 'End-to-end deployment with minimal downtime.' },
    { icon: <Puzzle size={20} />, title: 'Customization', desc: 'Tailored workflows and API integrations.' },
    { icon: <Users size={20} />, title: 'Training & Support', desc: 'Role-based learning and responsive help.' },
    { icon: <RefreshCw size={20} />, title: 'Change Enablement', desc: 'Adoption plans that stick.' }
  ];

  return (
    <section className="relative py-24 overflow-hidden" id="services">
      {/* Diagonal Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white"></div>
        <div 
          className="absolute inset-0 bg-brand-red" 
          style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 45% 100%)' }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-red font-bold tracking-widest text-xs uppercase mb-4 block">OUR SERVICES</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 leading-tight max-w-md">
              Comprehensive services for every stage
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-md leading-relaxed">
              From strategy and implementation to training and ongoing support.
            </p>
            <a href="#services">
              <button className="bg-brand-red text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-brand-red/20">
                Explore Services <ArrowRight size={20} />
              </button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-8 rounded-3xl shadow-xl flex flex-col items-start transition-all duration-300 ${i % 2 === 0 ? 'bg-white' : 'bg-white/90 backdrop-blur-sm'}`}
              >
                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-6 text-primary">
                  {s.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-primary">{s.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const AnimatedCounter = ({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 2,
        delay: 0.2,
        onUpdate(value) {
          setCount(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [to, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const WhyEcorenet = () => {
  const points = [
    "Microsoft-certified consultants",
    "Proven implementations across East Africa",
    "Fast response times and local presence",
    "Flexible engagement models"
  ];

  const counters = [
    { icon: <Award className="text-brand-red" size={32} />, value: 70, suffix: '+', label: 'Successful Implementations', prefix: '' },
    { icon: <Building className="text-brand-red" size={32} />, value: 30, suffix: '+', label: 'Enterprise Clients', prefix: '' },
    { icon: <Users className="text-brand-red" size={32} />, value: 15, suffix: '+', label: 'Certified Experts', prefix: '' },
    { icon: <Clock className="text-brand-red" size={32} />, value: 24, suffix: '/7', label: 'Priority Support', prefix: '' }
  ];

  return (
    <section className="py-24 bg-surface" id="why-ecorenet">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-red font-bold tracking-widest text-xs uppercase mb-4 block">WHY ECORENET</span>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 leading-tight">
              Certified expertise. Local support. Real outcomes.
            </h2>
            <ul className="space-y-4">
              {points.map((point, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                    <Check className="text-brand-red" size={12} strokeWidth={4} />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {counters.map((counter, i) => (
              <div 
                key={i} 
                className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {counter.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-black text-primary mb-2 flex items-center justify-center">
                  <AnimatedCounter to={counter.value} prefix={counter.prefix} suffix={counter.suffix} />
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{counter.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WA_LINK = "https://wa.me/254796801946?text=Hello%2C%20I%27d%20like%20to%20request%20a%20call%20from%20Ecorenet%20Business%20Solutions.";

const contactInfo = [
  { icon: <Mail size={24} />, label: 'Email us', value: 'info@ecorenet.co.ke', href: 'mailto:info@ecorenet.co.ke' },
  { icon: <Phone size={24} />, label: 'Chat on WhatsApp', value: '+254 796 801 946', href: WA_LINK },
  { icon: <MapPin size={24} />, label: 'Visit us', value: 'Lanphil Arcade, Ridgeways, Off Kiambu Rd', href: 'https://www.google.com/maps/place/Ecorenet+Business+Solutions+Limited/@-1.223681,36.8373898,174m/data=!3m1!1e3!4m6!3m5!1s0x182f1702832fa5d3:0xf9e4ac2491d055b5!8m2!3d-1.2241709!4d36.8373448!16s%2Fg%2F11nb1rr7sm?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D' },
];

const Contact = () => {
  const emptyForm = { firstName: '', lastName: '', phone: '', email: '', company: '', service: '', message: '' };
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setForm(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 bg-white rounded-3xl p-10 shadow-xl shadow-slate-200/50 border border-slate-100"
        >
          <h2 className="text-3xl font-black text-primary mb-8">Send us an inquiry</h2>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="text-green-600" size={32} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-2">Message Sent!</h3>
              <p className="text-slate-500 mb-6">Thank you — we will respond within one business day.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-brand-red font-bold hover:underline text-sm"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="firstName" value={form.firstName} onChange={handleChange} required
                  className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-brand-red/20 outline-none"
                  placeholder="First Name" type="text" />
                <input name="lastName" value={form.lastName} onChange={handleChange} required
                  className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-brand-red/20 outline-none"
                  placeholder="Last Name" type="text" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="phone" value={form.phone} onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-brand-red/20 outline-none"
                  placeholder="Phone Number" type="tel" />
                <input name="email" value={form.email} onChange={handleChange} required
                  className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-brand-red/20 outline-none"
                  placeholder="Email Address" type="email" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="company" value={form.company} onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-brand-red/20 outline-none"
                  placeholder="Company Name" type="text" />
                <select name="service" value={form.service} onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-lg p-4 focus:ring-2 focus:ring-brand-red/20 outline-none text-slate-500">
                  <option value="">Select Service</option>
                  <option>Microsoft 365</option>
                  <option>Dynamics 365</option>
                  <option>Azure</option>
                  <option>Power Platform</option>
                  <option>Business Central</option>
                  <option>Custom Development</option>
                </select>
              </div>
              <textarea name="message" value={form.message} onChange={handleChange} required
                className="w-full bg-slate-50 border-none rounded-lg p-4 h-32 focus:ring-2 focus:ring-brand-red/20 outline-none resize-none"
                placeholder="Write your message here" />
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again or email us directly at{' '}
                  <a href="mailto:info@ecorenet.co.ke" className="underline">info@ecorenet.co.ke</a>.
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-red text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === 'loading'
                  ? <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  : <><Send size={18} /> Send Message</>}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <h2 className="text-5xl font-black text-primary mb-6 leading-tight">Ready to transform your operations?</h2>
          <p className="text-slate-500 text-lg mb-12">Tell us what you are building. We will respond within one business day.</p>
          <div className="space-y-4">
            {contactInfo.map((item, i) =>
              item.href ? (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl hover:bg-slate-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-red group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-primary font-bold group-hover:text-brand-red transition-colors">{item.value}</p>
                  </div>
                </a>
              ) : (
                <div key={i} className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-brand-red">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-primary font-bold">{item.value}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};



export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <ProductsGrid />
      <Solutions />
      <Services />
      <WhyEcorenet />
      <Contact />
    </main>
  );
}
