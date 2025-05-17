import React, { useRef, useEffect } from "react";
import { FaShieldAlt, FaSearch, FaDesktop, FaNetworkWired, FaRobot } from "react-icons/fa";
import { MdSecurity, MdOutlineSecurityUpdateGood } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import AnimatedTitle from "./AnimatedTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersection } from "react-use";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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

// Enhanced SecurityCard with Valorant aesthetic
const SecurityCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const hoverRef = useRef(null);
  const borderRefs = {
    top: useRef(null),
    right: useRef(null),
    bottom: useRef(null),
    left: useRef(null)
  };

  // Intersection observer for reveal animation
  const intersection = useIntersection(cardRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  });

  // Setup initial state
  useEffect(() => {
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 30
    });

    // Setup borders initial state
    gsap.set(borderRefs.top.current, { width: 0 });
    gsap.set(borderRefs.right.current, { height: 0 });
    gsap.set(borderRefs.bottom.current, { width: 0 });
    gsap.set(borderRefs.left.current, { height: 0 });

    gsap.set(iconRef.current, { scale: 0 });
    gsap.set(titleRef.current, { opacity: 0, y: 10 });
    gsap.set(descRef.current, { opacity: 0, y: 10 });
  }, []);

  // Handle reveal animation on scroll
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      // Reveal card
      gsap.to(cardRef.current, {
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

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1 + 0.5,
        ease: "power2.out"
      });

      gsap.to(descRef.current, {
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
      color: "#ffffff",
      backgroundColor: "#1d4ed8",
      duration: 0.3
    });

    // Title animation
    gsap.to(titleRef.current, {
      color: "#1d4ed8",
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
      color: "#ffffff",
      backgroundColor: "#050505",
      duration: 0.3
    });

    gsap.to(titleRef.current, {
      color: "#ffffff",
      x: 0,
      duration: 0.3
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-start p-6 rounded-lg bg-[#050505] text-white overflow-hidden"
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

      <div
        ref={iconRef}
        className="mb-4 p-3 bg-[#050505] text-white rounded-sm z-10 border border-blue-500/30"
      >
        {icon}
      </div>

      <h3 ref={titleRef} className="text-xl font-bold mb-2 text-white uppercase tracking-wider z-10 flex items-center">
        <span className="text-blue-500 mr-2">/</span>
        {title}
      </h3>

      <p ref={descRef} className="text-gray-400 text-sm z-10">
        {description}
      </p>
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

// Glitch scanline effect
const Scanlines = () => {
  return (
    <div className="scanlines pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-10">
      <div className="scanline"></div>
      <div className="scanline"></div>
      <div className="scanline"></div>
    </div>
  );
};

// Main SecurityServices component with Valorant theme
const SecurityServices = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const bottomSectionRef = useRef(null);

  useGSAP(() => {
    // Section intro animations
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
      y: 30,
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
      y: 30,
      duration: 0.8,
      delay: 0.4,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Bottom section animation
    gsap.from(bottomSectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: bottomSectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Text scramble animation for CTA
    const scrambleText = () => {
      const tl = gsap.timeline();
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const originalText = "SCHEDULE A DEMO";
      const chars = originalText.split("");
      let iterations = 0;

      const scramble = () => {
        if (ctaRef.current) {
          ctaRef.current.innerText = chars
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return originalText[index];
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

          iterations += 1 / 3;

          if (iterations < chars.length) {
            setTimeout(scramble, 30);
          }
        }
      };

      gsap.delayedCall(5, () => {
        iterations = 0;
        scramble();
        gsap.delayedCall(10, scrambleText);
      });
    };

    scrambleText();

  }, { scope: sectionRef });

  const securityServices = [
    {
      icon: <FaSearch size={24} />,
      title: "SIEM Solutions",
      description: "Our Security Information and Event Management solutions provide real-time analysis of security alerts generated by applications and network hardware. Advanced correlation, AI analysis, and comprehensive dashboards ensure total visibility."
    },
    {
      icon: <MdSecurity size={24} />,
      title: "XDR Platform",
      description: "Extended Detection and Response solutions that unify security telemetry across endpoints, networks, cloud workloads, and applications. Get integrated threat protection with automated incident response capabilities."
    },
    {
      icon: <FaDesktop size={24} />,
      title: "EDR Protection",
      description: "Endpoint Detection and Response systems monitor endpoint and network events and record the information in a central database for analysis, detection, investigation, reporting, and alerting."
    },
    {
      icon: <FaRobot size={24} />,
      title: "SOAR Integration",
      description: "Security Orchestration, Automation and Response platforms that coordinate automated responses to security events, streamlining workflows and integrating with your existing security infrastructure."
    },
    {
      icon: <IoIosAlert size={24} />,
      title: "Threat Intelligence",
      description: "Proactive threat hunting and intelligence services to identify emerging threats before they impact your organization, with actionable insights from global threat landscapes."
    },
    {
      icon: <MdOutlineSecurityUpdateGood size={24} />,
      title: "Managed Security",
      description: "24/7 security monitoring and management services from our expert team, ensuring continuous protection and rapid response to security incidents."
    },
    {
      icon: <FaNetworkWired size={24} />,
      title: "Network Security",
      description: "Comprehensive network protection including firewalls, intrusion detection/prevention, secure access solutions, and network monitoring to safeguard your critical infrastructure."
    },
    {
      icon: <FaShieldAlt size={24} />,
      title: "Cloud Security",
      description: "Specialized protection for cloud environments, ensuring data security, compliance, and threat protection across multi-cloud and hybrid deployments."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#030303] text-white relative overflow-hidden">
      {/* Valorant-style decorative elements */}
      <AngularDecoration className="top-20 left-10" delay={0.2} />
      <AngularDecoration className="bottom-40 right-10" delay={0.5} />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-5"></div>

      {/* Scan lines effect */}
      <Scanlines />

      {/* Custom CSS for scanlines */}
      <style jsx global>{`
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
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <div className="mb-8">
            <p
              ref={subtitleRef}
              className="font-general text-sm uppercase tracking-wider text-blue-500 mb-2 inline-block py-1 px-2 border-l-2 border-blue-500"
            >
              security.techanv.com
            </p>

            <div ref={titleRef}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase text-white">
                <span className="relative inline-block mr-2">
                  <span className="relative z-10">CYBER</span>
                  <span className="absolute bottom-0 left-0 w-full h-[6px] bg-blue-500"></span>
                </span>
                <span className="text-blue-500">SECURITY</span>
                <br />
                <span className="text-3xl md:text-4xl">SOLUTIONS</span>
              </h1>
            </div>

            <p
              ref={descriptionRef}
              className="max-w-2xl mt-6 text-gray-400 relative"
            >
              <span className="text-blue-500 mr-2">//</span>
              TECHANV provides enterprise-grade security solutions to protect your organization's
              most valuable assets. Our integrated security platform combines cutting-edge
              technologies with expert management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityServices.map((service, index) => (
              <SecurityCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <ValorantButton text="EXPLORE OUR SOLUTIONS" className="mb-6" />

            <p className="text-gray-400">
              Contact us at <span className="text-blue-500 font-medium">security@techanv.com</span> for a personalized security assessment
            </p>
          </div>
        </div>

        <div
          ref={bottomSectionRef}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/10 blur-xl"></div>

          <div className="bg-[#050505] rounded-none md:rounded-lg p-8 md:p-10 relative overflow-hidden border border-blue-500/20">
            {/* Decorative lines */}
            <div className="absolute top-0 left-0 w-[150px] h-[1px] bg-blue-500/50"></div>
            <div className="absolute top-0 left-0 w-[1px] h-[150px] bg-blue-500/50"></div>
            <div className="absolute bottom-0 right-0 w-[150px] h-[1px] bg-blue-500/50"></div>
            <div className="absolute bottom-0 right-0 w-[1px] h-[150px] bg-blue-500/50"></div>

            {/* Decorative angular shape */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 overflow-hidden">
              <div className="absolute -right-20 top-10 w-80 h-80 border border-blue-500/30 rotate-45"></div>
              <div className="absolute -right-10 top-5 w-60 h-60 border border-blue-500/20 rotate-45"></div>
            </div>

            <div className="relative z-10 max-w-2xl">
              <div className="mb-2 flex items-center">
                <div className="w-10 h-[2px] bg-blue-500 mr-4"></div>
                <GlitchText text="DEFENSIVE CAPABILITIES" className="text-sm font-bold tracking-wider text-blue-500" />
              </div>

              <h2 className="text-3xl font-bold mb-6 uppercase tracking-wider">
                Full-Spectrum Security Protection
              </h2>

              <p className="mb-8 text-gray-300">
                The TECHANV security platform integrates SIEM, XDR, EDR, and SOAR capabilities
                to provide comprehensive defense against modern cyber threats. Our solution
                creates a security ecosystem that provides:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-500 p-1">
                    <FaShieldAlt />
                  </div>
                  <span className="text-gray-300">Real-time threat detection across all network endpoints and cloud resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-500 p-1">
                    <FaShieldAlt />
                  </div>
                  <span className="text-gray-300">Automated incident response for immediate threat containment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-500 p-1">
                    <FaShieldAlt />
                  </div>
                  <span className="text-gray-300">Continuous security monitoring with 24/7 expert oversight</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-500 p-1">
                    <FaShieldAlt />
                  </div>
                  <span className="text-gray-300">Advanced security analytics and threat intelligence</span>
                </li>
              </ul>

              <div className="mt-10">
                <div className="relative inline-block bg-transparent border border-blue-500 uppercase text-white font-bold px-6 py-3 overflow-hidden group cursor-pointer">
                  {/* Hover effect */}
                  <div className="absolute inset-0 w-0 bg-blue-500 transition-all duration-300 ease-out group-hover:w-full"></div>
                  {/* Text with scramble effect */}
                  <span ref={ctaRef} className="relative z-10 uppercase">SCHEDULE A DEMO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityServices;
