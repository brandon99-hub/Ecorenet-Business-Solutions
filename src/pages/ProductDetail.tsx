import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, X, ChevronRight, Send, Loader2 } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';
import ContactModal from '../components/ContactModal';

const productsData: Record<string, any> = {
  'dynamics-365': {
    name: 'Dynamics 365',
    tagline: 'Unify your CRM and ERP capabilities',
    color: 'bg-blue-600',
    headerImg: '/Public/Dynamics 365.png',
    overview: 'Microsoft Dynamics 365 is a portfolio of intelligent business applications that empowers organizations to deliver operational excellence and create more engaging customer experiences. From sales and customer service to finance and supply chain, Dynamics 365 breaks down data silos to provide a single, comprehensive view of your business.',
    features: [
      { title: 'Intelligent Sales', desc: 'Accelerate revenue with AI-driven insights that guide sellers to the best outcomes.' },
      { title: 'Customer Service', desc: 'Deliver exceptional experiences across channels with unified case management.' },
      { title: 'Supply Chain Operations', desc: 'Build agile, connected supply chains with predictive analytics.' }
    ],
    integrations: 'Integrates natively with Microsoft 365 and Teams, allowing users to view customer records and update pipeline data directly within their chat and email clients.'
  },
  'business-central': {
    name: 'Business Central',
    tagline: 'The ultimate all-in-one business management solution for SMBs',
    color: 'bg-emerald-600',
    headerImg: '/Public/business central1.png',
    overview: 'Dynamics 365 Business Central enables mid-sized organizations to connect their finance, sales, service, and operations. Built for the modern workforce, it provides the agility needed to grow and the security needed to protect your data natively within the Microsoft Cloud.',
    features: [
      { title: 'Financial Management', desc: 'Accelerate financial close and report with accuracy, while ensuring global compliance.' },
      { title: 'Project Management', desc: 'Track project performance in real-time, matching capacity to demand.' },
      { title: 'Inventory Automation', desc: 'Optimize inventory levels using built-in intelligence predicting when and what to replenish.' }
    ],
    integrations: 'Fully integrated with Microsoft Excel for rapid data manipulation and Power Automate for custom approval workflows.'
  },
  'microsoft-365': {
    name: 'Microsoft 365',
    tagline: 'The productivity cloud that connects your workforce',
    color: 'bg-red-500',
    headerImg: '/Public/microsoft 365.jpg',
    overview: 'More than just Word and Excel, Microsoft 365 is the world\'s premiere collaboration suite. It empowers teams to work flexibly and securely from anywhere in the world. With built-in Enterprise Mobility + Security, it ensures that your corporate data remains protected across all devices.',
    features: [
      { title: 'Microsoft Teams', desc: 'Chat, call, and collaborate on documents in real-time within a single hub.' },
      { title: 'SharePoint & OneDrive', desc: 'Secure cloud storage that replaces outdated on-premise file servers.' },
      { title: 'Advanced Threat Protection', desc: 'Defend against phishing, ransomware, and zero-day malware attacks automatically.' }
    ],
    integrations: 'Serves as the foundational identity layer (Entra ID) and collaborative surface for all Dynamics 365 and Power Platform applications.'
  },
  'power-platform': {
    name: 'Power Platform',
    tagline: 'Analyze data, build apps, and automate workflows',
    color: 'bg-purple-600',
    headerImg: '/Public/Powerapp1.jpg',
    overview: 'The Microsoft Power Platform is a low-code/no-code suite that empowers anyone in your organization to build custom solutions. Stop waiting on expensive developer resources and start automating the tedious tasks that slow your business down.',
    features: [
      { title: 'Power BI', desc: 'Make informed, confident business decisions by putting data-driven insights into everyone\'s hands.' },
      { title: 'Power Apps', desc: 'Turn ideas into organizational solutions by enabling everyone to build custom apps that solve business challenges.' },
      { title: 'Power Automate', desc: 'Boost business productivity to get more done by giving everyone the ability to automate organizational processes.' }
    ],
    integrations: 'Connects to over 500+ data sources natively, including Salesforce, Oracle, and Google Workspace, acting as the universal glue for your IT stack.'
  },
  'azure': {
    name: 'Microsoft Azure',
    tagline: 'Invent with purpose, realize cost savings, and secure your future',
    color: 'bg-sky-600',
    headerImg: '/Public/Azure3.jpg',
    overview: 'Microsoft Azure is an ever-expanding set of cloud computing services to help your organization meet its business challenges. It provides the freedom to build, manage, and deploy applications on a massive, global network using your preferred tools and frameworks.',
    features: [
      { title: 'Infrastructure as a Service (IaaS)', desc: 'Scale compute resources on-demand and migrate legacy servers to the cloud.' },
      { title: 'Data & AI', desc: 'Harness the power of machine learning and large language models within secure boundaries.' },
      { title: 'Disaster Recovery', desc: 'Ensure business continuity with automated site recovery and geo-redundant backups.' }
    ],
    integrations: 'Provides the secure foundational architecture and compute layer that powers the entire Microsoft Cloud ecosystem.'
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? productsData[id] : null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f8faff]">
        <h1 className="text-4xl font-black text-primary mb-4">Product Not Found</h1>
        <Link to="/" className="text-brand-red font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Return Home
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-[#f8faff] min-h-screen">
      {/* Redesigned Product Hero */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden pt-24 pb-16">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${product.headerImg}')`, transform: 'scale(1.05)' }}
          />
          {/* Deep overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/40"></div>
          {/* Subtle colored tint matching the product */}
          <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${product.color}`}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full mt-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-white/60 text-sm font-medium mb-6">
               <Link to="/" className="hover:text-white transition-colors">Home</Link>
               <ChevronRight size={14} />
               <Link to="/#products" className="hover:text-white transition-colors">Products</Link>
               <ChevronRight size={14} />
               <span className="text-white">{product.name}</span>
            </nav>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              {product.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 leading-relaxed max-w-xl">
              {product.tagline}
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-brand-red text-white px-8 py-4 rounded-full font-bold inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-xl shadow-brand-red/20"
            >
              Consult an Expert <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Overview & Integrations */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-black text-primary mb-6">Overview</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              {product.overview}
            </p>
            
            <h3 className="text-2xl font-bold text-primary mb-6 mt-12 flex items-center gap-3">
              <Zap className="text-brand-red" /> Deep Integration
            </h3>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-600 leading-relaxed font-medium">
                {product.integrations}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-black text-primary mb-6">Key Features</h3>
            {product.features.map((feat: any, idx: number) => (
              <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-50">
                <CheckCircle2 className="text-brand-red flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-primary mb-1">{feat.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Reusable Modal Component */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName={product.name} 
      />
    </article>
  );
}
