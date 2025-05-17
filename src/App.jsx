import { HelmetProvider } from 'react-helmet-async';
import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import SecurityServices from "./components/SecurityServices";
import TechANVDetails from "./components/TechANVDetails";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEOHelmet from "./components/SEOHelmet";

function App() {
  // Homepage schema for structured data
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".hero-heading"]
    },
    "name": "TECHANV Security - Enterprise Cybersecurity Solutions",
    "description": "Enterprise-grade security solutions including SIEM, XDR, EDR, and SOAR at security.techanv.com",
    "mainEntity": {
      "@type": "Product",
      "name": "TECHANV Security Platform",
      "description": "Comprehensive cybersecurity platform with SIEM, XDR, EDR, and SOAR capabilities",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "Contact for pricing",
        "availability": "https://schema.org/InStock"
      }
    }
  };

  return (
    <HelmetProvider>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <SEOHelmet
          title="Enterprise Cybersecurity Solutions"
          description="TECHANV provides enterprise-grade security solutions including SIEM, XDR, EDR, and SOAR with advanced threat detection and response capabilities."
          keywords="enterprise security, SIEM, XDR, EDR, SOAR, cybersecurity solutions, threat detection, incident response"
          ogImage="https://security.techanv.com/img/og-image.jpg"
          twitterImage="https://security.techanv.com/img/twitter-image.jpg"
          schema={homeSchema}
        />
        <NavBar />
        <Hero />
        <About />
        <TechANVDetails />
        <Features />
        <SecurityServices />
        <Story />
        <Contact />
        <Footer />
      </main>
    </HelmetProvider>
  );
}

export default App;
