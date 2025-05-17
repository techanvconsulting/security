import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaShieldAlt, FaRobot, FaNetworkWired, FaServer, FaCogs, FaLock, FaBug } from "react-icons/fa";
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
      className="absolute text-blue-500/10 pointer-events-none"
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

// Angular decorative element component
const AngularDecoration = ({ className = "", delay = 0 }) => {
  const decorRef = useRef(null);

  useGSAP(() => {
    gsap.set(decorRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.to(decorRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      delay: delay,
      ease: "power3.out"
    });

    // Subtle rotation animation
    gsap.to(decorRef.current, {
      rotation: "+=360",
      duration: 60,
      repeat: -1,
      ease: "none"
    });
  }, { scope: decorRef });

  return (
    <div
      ref={decorRef}
      className={`absolute pointer-events-none ${className}`}
    >
      <div className="relative">
        <div className="absolute border border-blue-500/50 w-32 h-32 rotate-45"></div>
        <div className="absolute border border-blue-500/30 w-32 h-32 rotate-[30deg]"></div>
        <div className="absolute bg-blue-500/10 w-16 h-16 rotate-45 left-8 top-8"></div>
      </div>
    </div>
  );
};

// Glitch text effect
const GlitchText = ({ text, className = "" }) => {
  const textRef = useRef(null);

  useGSAP(() => {
    // Random glitch effect
    const createGlitch = () => {
      const duration = 0.05;
      const timeline = gsap.timeline({
        repeat: 1,
        yoyo: true,
        onComplete: () => {
          // Schedule next glitch
          gsap.delayedCall(Math.random() * 5 + 3, createGlitch);
        }
      });

      timeline
        .to(textRef.current, {
          skewX: Math.random() * 10 - 5,
          duration: duration,
          ease: "power1.inOut"
        })
        .to(textRef.current, {
          opacity: 0.8,
          duration: duration/2,
          ease: "power1.inOut"
        }, "<")
        .to(textRef.current, {
          x: Math.random() * 4 - 2,
          duration: duration,
          ease: "power1.inOut"
        }, "<");
    };

    // Start the glitch effect
    gsap.delayedCall(Math.random() * 2 + 1, createGlitch);

  }, { scope: textRef });

  return (
    <span ref={textRef} className={`inline-block ${className}`}>
      {text}
    </span>
  );
};

// Scanlines effect
const Scanlines = () => {
  return (
    <div className="scanlines pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-10">
      <div className="scanline"></div>
      <div className="scanline"></div>
      <div className="scanline"></div>
    </div>
  );
};

// Enhanced AcronymItem with GSAP animations and Valorant styling
const AcronymItem = ({ letter, word, description, icon, index }) => {
  const itemRef = useRef(null);
  const iconRef = useRef(null);
  const letterRef = useRef(null);
  const contentRef = useRef(null);
  const hoverRef = useRef(null);
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

  // Setup initial state
  useEffect(() => {
    gsap.set(itemRef.current, {
      opacity: 0,
      y: 30
    });

    // Setup borders initial state
    gsap.set(borderRefs.top.current, { width: 0 });
    gsap.set(borderRefs.right.current, { height: 0 });
    gsap.set(borderRefs.bottom.current, { width: 0 });
    gsap.set(borderRefs.left.current, { height: 0 });

    gsap.set(iconRef.current, { scale: 0 });
    gsap.set(letterRef.current, { opacity: 0, y: 10 });
    gsap.set(contentRef.current, { opacity: 0, y: 10 });
  }, []);

  // Handle reveal animation on scroll
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      // Reveal card
      gsap.to(itemRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: index * 0.1,
        ease: "power2.out"
      });

      // Reveal borders with staggered effect
      gsap.to(borderRefs.top.current, {
        width: "100%",
        duration: 0.4,
        delay: index * 0.1 + 0.1,
        ease: "power2.inOut"
      });

      gsap.to(borderRefs.right.current, {
        height: "100%",
        duration: 0.4,
        delay: index * 0.1 + 0.2,
        ease: "power2.inOut"
      });

      gsap.to(borderRefs.bottom.current, {
        width: "100%",
        duration: 0.4,
        delay: index * 0.1 + 0.3,
        ease: "power2.inOut"
      });

      gsap.to(borderRefs.left.current, {
        height: "100%",
        duration: 0.4,
        delay: index * 0.1 + 0.4,
        ease: "power2.inOut"
      });

      // Reveal content
      gsap.to(iconRef.current, {
        scale: 1,
        duration: 0.6,
        delay: index * 0.1 + 0.4,
        ease: "back.out(1.7)"
      });

      gsap.to(letterRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1 + 0.5,
        ease: "power2.out"
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1 + 0.6,
        ease: "power2.out"
      });
    }
  }, [intersection, index]);

  // Handle hover animations
  const handleMouseEnter = () => {
    // Glow effect
    gsap.to(hoverRef.current, {
      opacity: 0.8,
      duration: 0.3
    });

    // Icon animation
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 0.3
    });

    // Letter animation
    gsap.to(letterRef.current, {
      color: "#1d4ed8",
      textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
      scale: 1.1,
      duration: 0.3
    });

    // Content animation
    gsap.to(contentRef.current, {
      x: 5,
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    // Reset animations
    gsap.to(hoverRef.current, {
      opacity: 0,
      duration: 0.3
    });

    gsap.to(iconRef.current, {
      scale: 1,
      duration: 0.3
    });

    gsap.to(letterRef.current, {
      color: "#f0f9ff",
      textShadow: "none",
      scale: 1,
      duration: 0.3
    });

    gsap.to(contentRef.current, {
      x: 0,
      duration: 0.3
    });
  };

  return (
    <div
      ref={itemRef}
      className="relative flex items-start gap-4 p-6 rounded-lg bg-[#050505] text-white overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Valorant-style border animation */}
      <div ref={borderRefs.top} className="absolute top-0 left-0 h-[2px] bg-blue-500"></div>
      <div ref={borderRefs.right} className="absolute top-0 right-0 w-[2px] bg-blue-500"></div>
      <div ref={borderRefs.bottom} className="absolute bottom-0 right-0 h-[2px] bg-blue-500"></div>
      <div ref={borderRefs.left} className="absolute bottom-0 left-0 w-[2px] bg-blue-500"></div>

      {/* Hover effect overlay */}
      <div
        ref={hoverRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/5 opacity-0 pointer-events-none"
      ></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="flex flex-col items-center z-10">
        <div
          ref={iconRef}
          className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-3 rounded-sm mb-2 relative overflow-hidden border border-blue-500/30"
        >
          {/* Icon background pulse effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 icon-pulse" style={{ transform: "translateX(-100%)" }}></div>
          {icon}
        </div>
        <div
          ref={letterRef}
          className="text-4xl font-bold text-blue-50 relative"
        >
          {letter}
        </div>
      </div>

      <div
        ref={contentRef}
        className="z-10"
      >
        <h3 className="text-xl font-bold mb-1 text-blue-50 uppercase tracking-wider flex items-center">
          <span className="text-blue-500 mr-2">/</span>
          {word}
        </h3>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

// Valorant-style button
const ValorantButton = ({ text, className = "" }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const bgRef = useRef(null);
  const borderRefs = {
    top: useRef(null),
    right: useRef(null),
    bottom: useRef(null),
    left: useRef(null)
  };

  const handleMouseEnter = () => {
    gsap.to(bgRef.current, {
      opacity: 1,
      duration: 0.3
    });

    gsap.to(textRef.current, {
      color: "#ffffff",
      letterSpacing: "1px",
      duration: 0.3
    });

    // Animate borders
    gsap.to(borderRefs.top.current, {
      width: "100%",
      left: 0,
      duration: 0.2
    });

    gsap.to(borderRefs.right.current, {
      height: "100%",
      top: 0,
      duration: 0.2,
      delay: 0.1
    });

    gsap.to(borderRefs.bottom.current, {
      width: "100%",
      right: 0,
      duration: 0.2,
      delay: 0.2
    });

    gsap.to(borderRefs.left.current, {
      height: "100%",
      bottom: 0,
      duration: 0.2,
      delay: 0.3
    });
  };

  const handleMouseLeave = () => {
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.3
    });

    gsap.to(textRef.current, {
      color: "#1d4ed8",
      letterSpacing: "0px",
      duration: 0.3
    });

    // Reset borders
    gsap.to([
      borderRefs.top.current,
      borderRefs.right.current,
      borderRefs.bottom.current,
      borderRefs.left.current
    ], {
      width: 0,
      height: 0,
      duration: 0.2
    });
  };

  useEffect(() => {
    // Initialize borders
    gsap.set(borderRefs.top.current, { width: 0, left: "50%" });
    gsap.set(borderRefs.right.current, { height: 0, top: "50%" });
    gsap.set(borderRefs.bottom.current, { width: 0, right: "50%" });
    gsap.set(borderRefs.left.current, { height: 0, bottom: "50%" });
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`relative inline-block cursor-pointer py-3 px-6 overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-blue-500 opacity-0 transition-opacity duration-300"
      ></div>

      {/* Animated borders */}
      <div ref={borderRefs.top} className="absolute top-0 h-[2px] bg-blue-500"></div>
      <div ref={borderRefs.right} className="absolute right-0 w-[2px] bg-blue-500"></div>
      <div ref={borderRefs.bottom} className="absolute bottom-0 h-[2px] bg-blue-500"></div>
      <div ref={borderRefs.left} className="absolute left-0 w-[2px] bg-blue-500"></div>

      {/* Text */}
      <div
        ref={textRef}
        className="relative z-10 uppercase font-bold tracking-wide text-blue-500"
      >
        {text}
      </div>
    </div>
  );
};

const TechANVSecurityPlatform = () => {
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
      word: "Threat",
      description: "Advanced threat detection capabilities leveraging AI-driven analytics to identify sophisticated attacks across your entire security infrastructure.",
      icon: <FaShieldAlt size={24} />
    },
    {
      letter: "E",
      word: "Extended",
      description: "Comprehensive protection extending beyond endpoints to cloud workloads, networks, and identity management through our XDR platform architecture.",
      icon: <FaNetworkWired size={24} />
    },
    {
      letter: "C",
      word: "Contextual",
      description: "Risk-based contextual analysis that prioritizes alerts and correlates data from multiple security tools to provide a unified view of security incidents.",
      icon: <FaServer size={24} />
    },
    {
      letter: "H",
      word: "Hardened",
      description: "Security-hardened architecture built with defensive programming principles to ensure the platform itself remains secure against evolving threats.",
      icon: <FaLock size={24} />
    },
    {
      letter: "A",
      word: "Automated",
      description: "Intelligent security automation with self-healing capabilities that eliminate manual interventions and accelerate incident response workflows.",
      icon: <FaRobot size={24} />
    },
    {
      letter: "N",
      word: "Neutralization",
      description: "Advanced threat neutralization with real-time response actions that rapidly contain and remediate security incidents across your environment.",
      icon: <FaCogs size={24} />
    },
    {
      letter: "V",
      word: "Vulnerability",
      description: "Offensive security capabilities (OXDR) that continuously test your environment for vulnerabilities in people, processes, and technology.",
      icon: <FaBug size={24} />
    }
  ];

  // Custom CSS for scanlines
  const scanlinesStyle = `
    @keyframes scanline {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(1000%);
      }
    }

    .scanlines .scanline {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: rgba(37, 99, 235, 0.1);
      animation: scanline 10s linear infinite;
    }

    .scanlines .scanline:nth-child(2) {
      animation-delay: 3.33s;
    }

    .scanlines .scanline:nth-child(3) {
      animation-delay: 6.66s;
    }
  `;

  return (
    <section id="techanv-security-platform" ref={sectionRef} className="py-20 bg-[#030303] text-white relative overflow-hidden">
      {/* Background security animation */}
      <SecurityParticles />

      {/* Valorant-style decorative elements */}
      <AngularDecoration className="top-20 left-10" delay={0.2} />
      <AngularDecoration className="bottom-40 right-10" delay={0.5} />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-5"></div>

      {/* Scan lines effect */}
      <Scanlines />
      <style jsx>{scanlinesStyle}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="w-10 h-[2px] bg-blue-500 mb-4 mx-auto"></div>
          <p
            ref={subtitleRef}
            className="font-general text-sm uppercase tracking-wider md:text-[10px] mb-2 text-blue-500 inline-block py-1 px-2 border-l-2 border-blue-500"
          >
            <GlitchText text="ADVANCED THREAT PROTECTION" />
          </p>

          <div ref={titleRef}>
            <AnimatedTitle
              title="The <b>TECHANV</b> Security Platform"
              containerClass="mt-5 !text-white text-center uppercase tracking-wide"
            />
          </div>

          <p
            ref={descriptionRef}
            className="max-w-2xl mx-auto mt-6 text-gray-400"
          >
            <span className="text-blue-500 mr-2">//</span>
            Our unified XDR/OXDR platform delivers enterprise-grade security through
            attacker-minded defenses and intelligent threat response.
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
          className="mt-16 p-6 bg-[#050505] rounded-none md:rounded-lg text-white text-center relative overflow-hidden border border-blue-500/20"
        >
          {/* Decorative lines */}
          <div className="absolute top-0 left-0 w-[150px] h-[1px] bg-blue-500/50"></div>
          <div className="absolute top-0 left-0 w-[1px] h-[150px] bg-blue-500/50"></div>
          <div className="absolute bottom-0 right-0 w-[150px] h-[1px] bg-blue-500/50"></div>
          <div className="absolute bottom-0 right-0 w-[1px] h-[150px] bg-blue-500/50"></div>

          {/* Security-themed background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "24px 24px"
            }}/>
          </div>

          {/* Animated light beam effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 cta-beam" style={{ transform: "translateX(-100%)" }}></div>

          <div className="mb-2 flex items-center justify-center">
            <div className="w-10 h-[2px] bg-blue-500 mr-4"></div>
            <GlitchText text="UNIFIED SECURITY PLATFORM" className="text-sm font-bold tracking-wider text-blue-500" />
          </div>

          <h3 className="text-xl font-bold mb-3 relative uppercase tracking-wider">
            Deep Dive into TECHANV XDR/OXDR
          </h3>

          <p className="relative text-gray-300 max-w-2xl mx-auto">
            Our security platform combines defensive XDR capabilities with offensive OXDR
            techniques to provide comprehensive threat detection, vulnerability testing,
            and automated incident response.
          </p>

          <div className="mt-8">
            <ValorantButton text="REQUEST A DEMO" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechANVSecurityPlatform;
