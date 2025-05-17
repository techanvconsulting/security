import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaShieldAlt, FaRobot, FaNetworkWired, FaServer, FaCogs } from "react-icons/fa";
import AnimatedTitle from "./AnimatedTitle";
import { useIntersection } from "react-use";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Security-themed particle component
const SecurityParticle = ({ delay }) => {
  const particleRef = useRef(null);

  useGSAP(() => {
    // Random positions and sizes for security symbols
    const randomX = Math.random() * 100;
    const randomSize = Math.random() * 0.5 + 0.2;
    const randomDuration = Math.random() * 20 + 15;

    gsap.set(particleRef.current, {
      y: 0,
      x: `${randomX}%`,
      opacity: 0,
      scale: randomSize,
      fontSize: `${Math.floor(randomSize * 24 + 12)}px`
    });

    gsap.to(particleRef.current, {
      y: "100%",
      opacity: [0, 0.7, 0],
      rotate: 180,
      duration: randomDuration,
      delay: delay,
      repeat: -1,
      ease: "none"
    });
  }, { scope: particleRef });

  return (
    <div
      ref={particleRef}
      className="absolute text-blue-900/5 pointer-events-none"
    >
      {Math.random() > 0.5 ? "0" : "1"}
    </div>
  );
};

const SecurityParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
      {[...Array(20)].map((_, index) => (
        <SecurityParticle key={index} delay={index * 0.2} />
      ))}
    </div>
  );
};

// Enhanced AcronymItem with GSAP animations
const AcronymItem = ({ letter, word, description, icon, index }) => {
  const itemRef = useRef(null);
  const iconRef = useRef(null);
  const letterRef = useRef(null);
  const contentRef = useRef(null);
  const borderRefs = {
    top: useRef(null),
    right: useRef(null),
    bottom: useRef(null),
    left: useRef(null)
  };

  // Intersection observer for reveal animation
  const intersection = useIntersection(itemRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  });

  // Handle reveal animation on scroll
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      gsap.to(itemRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power2.out"
      });
    }
  }, [intersection, index]);

  // Setup initial state
  useEffect(() => {
    gsap.set(itemRef.current, {
      opacity: 0,
      y: 50
    });

    // Setup borders
    gsap.set(borderRefs.top.current, { x: "-100%" });
    gsap.set(borderRefs.right.current, { y: "-100%" });
    gsap.set(borderRefs.bottom.current, { x: "100%" });
    gsap.set(borderRefs.left.current, { y: "100%" });
  }, []);

  // Handle hover animations
  const handleMouseEnter = () => {
    // Icon animation
    gsap.to(iconRef.current, {
      scale: 1.05,
      duration: 0.3
    });

    // Letter animation
    gsap.to(letterRef.current, {
      color: "#1E40AF",
      textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
      scale: 1.1,
      duration: 0.3
    });

    // Content animation
    gsap.to(contentRef.current, {
      x: 5,
      duration: 0.3
    });

    // Border animations
    gsap.to(borderRefs.top.current, {
      x: "0%",
      duration: 0.8,
      ease: "power2.inOut"
    });

    gsap.to(borderRefs.right.current, {
      y: "0%",
      duration: 0.8,
      delay: 0.1,
      ease: "power2.inOut"
    });

    gsap.to(borderRefs.bottom.current, {
      x: "0%",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.inOut"
    });

    gsap.to(borderRefs.left.current, {
      y: "0%",
      duration: 0.8,
      delay: 0.3,
      ease: "power2.inOut"
    });

    // Background pulse for icon
    gsap.to(iconRef.current.querySelector('.icon-pulse'), {
      x: "100%",
      duration: 1,
      repeat: -1,
      repeatDelay: 0.5
    });
  };

  const handleMouseLeave = () => {
    // Reset animations
    gsap.to(iconRef.current, {
      scale: 1,
      duration: 0.3
    });

    gsap.to(letterRef.current, {
      color: "#1E40AF",
      textShadow: "none",
      scale: 1,
      duration: 0.3
    });

    gsap.to(contentRef.current, {
      x: 0,
      duration: 0.3
    });

    // Reset border animations
    gsap.to(borderRefs.top.current, {
      x: "-100%",
      duration: 0.4,
      ease: "power2.inOut"
    });

    gsap.to(borderRefs.right.current, {
      y: "-100%",
      duration: 0.4,
      delay: 0.1,
      ease: "power2.inOut"
    });

    gsap.to(borderRefs.bottom.current, {
      x: "100%",
      duration: 0.4,
      delay: 0.2,
      ease: "power2.inOut"
    });

    gsap.to(borderRefs.left.current, {
      y: "100%",
      duration: 0.4,
      delay: 0.3,
      ease: "power2.inOut"
    });

    // Stop icon pulse
    gsap.killTweensOf(iconRef.current.querySelector('.icon-pulse'));
    gsap.set(iconRef.current.querySelector('.icon-pulse'), { x: "-100%" });
  };

  return (
    <div
      ref={itemRef}
      className="relative flex items-start gap-4 p-6 rounded-lg bg-white backdrop-blur-sm hover:shadow-lg hover:bg-blue-50/70 transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated border */}
      <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
        <div
          ref={borderRefs.top}
          className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400"
          style={{ height: "2px", top: 0 }}
        />
        <div
          ref={borderRefs.right}
          className="absolute inset-0 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-400"
          style={{ width: "2px", right: 0 }}
        />
        <div
          ref={borderRefs.bottom}
          className="absolute inset-0 bg-gradient-to-l from-blue-500 via-blue-600 to-blue-400"
          style={{ height: "2px", bottom: 0 }}
        />
        <div
          ref={borderRefs.left}
          className="absolute inset-0 bg-gradient-to-t from-blue-500 via-blue-600 to-blue-400"
          style={{ width: "2px", left: 0 }}
        />
      </div>

      <div className="flex flex-col items-center z-10">
        <div
          ref={iconRef}
          className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-3 rounded-full mb-2 relative overflow-hidden"
        >
          {/* Icon background pulse effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 icon-pulse" style={{ transform: "translateX(-100%)" }}></div>
          {icon}
        </div>
        <div
          ref={letterRef}
          className="text-4xl font-bold text-blue-800 relative"
        >
          {letter}
        </div>
      </div>

      <div
        ref={contentRef}
        className="z-10"
      >
        <h3 className="text-xl font-bold mb-1 text-blue-900 inline-block">
          {word}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

// Enhanced CTA button component
const AnimatedCTA = () => {
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);
  const beamRef = useRef(null);

  useGSAP(() => {
    // Initial setup
    gsap.set(beamRef.current, { x: "-100%", opacity: 0 });
  }, { scope: ctaRef });

  const handleMouseEnter = () => {
    gsap.to(ctaRef.current, {
      scale: 1.03,
      boxShadow: "0 5px 15px rgba(30, 64, 175, 0.25)",
      duration: 0.3
    });

    gsap.to(arrowRef.current, {
      x: 5,
      duration: 0.3
    });

    gsap.to(beamRef.current, {
      opacity: 1,
      x: "100%",
      duration: 0.8,
      repeat: -1
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ctaRef.current, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3
    });

    gsap.to(arrowRef.current, {
      x: 0,
      duration: 0.3
    });

    gsap.killTweensOf(beamRef.current);
    gsap.to(beamRef.current, {
      opacity: 0,
      x: "-100%",
      duration: 0.3
    });
  };

  return (
    <div
      ref={ctaRef}
      className="relative mt-4 inline-block bg-white text-blue-900 rounded-lg px-6 py-3 font-semibold overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow effect */}
      <div
        ref={beamRef}
        className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50"
      />

      <div className="flex items-center gap-2 relative z-10">
        <span>Discover Our Solutions</span>
        <span ref={arrowRef}>→</span>
      </div>
    </div>
  );
};

const TechANVDetails = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dividerRef = useRef(null);
  const ctaSectionRef = useRef(null);

  // Setup section animations
  useGSAP(() => {
    // Title animations
    gsap.from(titleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(subtitleRef.current, {
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(descriptionRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.4,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Divider animation
    gsap.from(dividerRef.current, {
      width: 0,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // CTA section animation
    gsap.from(ctaSectionRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: ctaSectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Light beam animation for CTA section
    const ctaBeam = ctaSectionRef.current.querySelector('.cta-beam');
    gsap.to(ctaBeam, {
      x: "100%",
      duration: 2,
      repeat: -1,
      repeatDelay: 5,
      ease: "power1.inOut"
    });

  }, { scope: sectionRef });

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
    <section id="techanv-meaning" ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background security animation */}
      <SecurityParticles />

      {/* Cyber security grid background */}
      <div className="absolute inset-0 bg-grid-blue-100/20 bg-[length:50px_50px] opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p
            ref={subtitleRef}
            className="font-general text-sm uppercase md:text-[10px] mb-2 text-blue-600 tracking-wider"
          >
            What TECHANV Stands For
          </p>

          <div ref={titleRef}>
            <AnimatedTitle
              title="The Full Form of <b>TECHANV</b>"
              containerClass="mt-5 !text-black text-center"
            />
          </div>

          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto mt-6 text-gray-600"
          >
            At security.techanv.com, we deliver enterprise-grade security solutions
            through our comprehensive technology ecosystem.
          </p>

          {/* Animated divider */}
          <div
            ref={dividerRef}
            className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto mt-8"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {acronymData.map((item, index) => (
            <AcronymItem
              key={index}
              letter={item.letter}
              word={item.word}
              description={item.description}
              icon={item.icon}
              index={index}
            />
          ))}
        </div>

        <div
          ref={ctaSectionRef}
          className="mt-16 p-6 bg-gradient-to-br from-blue-800 to-blue-900 text-white rounded-lg text-center relative overflow-hidden"
        >
          {/* Security-themed background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px"
            }}/>
          </div>

          {/* Animated light beam effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 cta-beam" style={{ transform: "translateX(-100%)" }}></div>

          <h3 className="text-xl font-bold mb-3 relative">
            Visit security.techanv.com
          </h3>

          <p className="relative">
            Explore our complete suite of cybersecurity solutions designed to protect
            your organization against evolving threats in the digital landscape.
          </p>

          <AnimatedCTA />
        </div>
      </div>
    </section>
  );
};

export default TechANVDetails;
