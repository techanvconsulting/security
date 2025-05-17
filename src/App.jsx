import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import SecurityServices from "./components/SecurityServices";
import TechANVDetails from "./components/TechANVDetails";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
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
  );
}

export default App;
