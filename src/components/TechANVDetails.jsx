import React from "react";
import { FaShieldAlt, FaRobot, FaNetworkWired, FaServer, FaCogs } from "react-icons/fa";
import AnimatedTitle from "./AnimatedTitle";

const AcronymItem = ({ letter, word, description, icon }) => {
  return (
    <div className="flex items-start gap-4 p-6 transition-all duration-300 hover:bg-blue-50 rounded-lg">
      <div className="flex flex-col items-center">
        <div className="bg-blue-600 text-white p-3 rounded-full mb-2">
          {icon}
        </div>
        <div className="text-4xl font-bold text-blue-800">{letter}</div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1 text-blue-900">{word}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const TechANVDetails = () => {
  const acronymData = [
    {
      letter: "T",
      word: "Technology",
      description: "Cutting-edge security technologies and solutions that protect your organization's digital assets against sophisticated threats.",
      icon: <FaShieldAlt size={24} />
    },
    {
      letter: "E",
      word: "Ecosystem for",
      description: "An integrated ecosystem of security solutions that work together seamlessly to provide comprehensive protection across your entire infrastructure.",
      icon: <FaCogs size={24} />
    },
    {
      letter: "C",
      word: "Cybersecurity",
      description: "Enterprise-grade cybersecurity solutions including SIEM, XDR, EDR, and SOAR platforms that detect, analyze, and respond to security threats in real-time.",
      icon: <FaShieldAlt size={24} />
    },
    {
      letter: "H",
      word: "Hyperautomation",
      description: "Advanced security automation capabilities that streamline incident response, reduce manual interventions, and accelerate threat mitigation.",
      icon: <FaCogs size={24} />
    },
    {
      letter: "A",
      word: "Artificial Intelligence",
      description: "AI-powered security analytics that identify patterns, detect anomalies, and predict potential threats before they impact your organization.",
      icon: <FaRobot size={24} />
    },
    {
      letter: "N",
      word: "Network",
      description: "Comprehensive network security solutions that protect your critical infrastructure from perimeter to endpoint with advanced threat detection.",
      icon: <FaNetworkWired size={24} />
    },
    {
      letter: "V",
      word: "Virtualization",
      description: "Security solutions for virtual environments, cloud infrastructure, and containerized applications that ensure consistent protection across all deployments.",
      icon: <FaServer size={24} />
    }
  ];

  return (
    <section id="techanv-meaning" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-general text-sm uppercase md:text-[10px] mb-2">
            What TECHANV Stands For
          </p>
          
          <AnimatedTitle
            title="The Full Form of <b>TECHANV</b>"
            containerClass="mt-5 !text-black text-center"
          />
          
          <p className="max-w-2xl mx-auto mt-6 text-gray-600">
            At security.techanv.com, we deliver enterprise-grade security solutions 
            through our comprehensive technology ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {acronymData.map((item, index) => (
            <AcronymItem
              key={index}
              letter={item.letter}
              word={item.word}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
        
        <div className="mt-16 p-6 bg-blue-900 text-white rounded-lg text-center">
          <h3 className="text-xl font-bold mb-3">Visit security.techanv.com</h3>
          <p>
            Explore our complete suite of cybersecurity solutions designed to protect 
            your organization against evolving threats in the digital landscape.
          </p>
          <div className="mt-4 inline-block bg-white text-blue-900 rounded-lg px-6 py-3 font-semibold transition-all hover:bg-blue-100 cursor-pointer">
            Discover Our Solutions
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechANVDetails;