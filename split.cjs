const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf8');

// Match until the end of the imports
const importEnd = appTsx.indexOf('\n\nconst Navbar');
const imports = appTsx.substring(0, importEnd);

const navbarStart = appTsx.indexOf('const Navbar');
const heroStart = appTsx.indexOf('const Hero');
const footerStart = appTsx.indexOf('const Footer');

// We also need WA_LINK and contactInfo which are right before Contact
const contactStart = appTsx.indexOf('const Contact');
const beforeContact = appTsx.substring(appTsx.lastIndexOf('const WA_LINK', contactStart), contactStart);

const defaultExportStart = appTsx.indexOf('export default function App');

const navbarCode = appTsx.substring(navbarStart, heroStart);
const mainComponents = appTsx.substring(heroStart, footerStart);
const footerCode = appTsx.substring(footerStart, defaultExportStart);

// Create Layout.tsx that contains Navbar and Footer
const layoutCode = `${imports}
import { Outlet } from 'react-router-dom';

${navbarCode}
${beforeContact}
${footerCode}

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
`;

fs.writeFileSync('src/components/Layout.tsx', layoutCode);

// Extract the imports only needed for Home
// We'll just pass all imports for simplicity
const homeCode = `${imports}

${mainComponents}

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
`;

fs.writeFileSync('src/pages/Home.tsx', homeCode);

console.log('Split into Layout and Home successfully.');
