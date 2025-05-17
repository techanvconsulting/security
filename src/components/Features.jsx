import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaShieldAlt, FaLock, FaServer, FaNetworkWired } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersection } from "react-use";

// Register ScrollTrigger
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

// Security badge component
const SecurityBadge = ({ icon, delay = 0, className = "" }) => {
  const badgeRef = useRef(null);

  useGSAP(() => {
    gsap.set(badgeRef.current, {
      scale: 0,
      opacity: 0
    });

    gsap.to(badgeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      delay: delay,
      ease: "back.out(1.7)"
    });

    // Pulse animation
    gsap.to(badgeRef.current, {
      boxShadow: "0 0 15px 2px rgba(37, 99, 235, 0.7)",
      repeat: -1,
      yoyo: true,
      duration: 2,
      delay: delay + 0.5
    });

  }, { scope: badgeRef });

  return (
    <div
      ref={badgeRef}
      className={`absolute z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#050505] text-blue-500 shadow-lg border border-blue-500/30 ${className}`}
    >
      {icon}
    </div>
  );
};

// Enhanced BentoTilt with GSAP
export const BentoTilt = ({ children, className = "", index = 0 }) => {
  const tiltRef = useRef(null);
  const borderRefs = {
    top: useRef(null),
    right: useRef(null),
    bottom: useRef(null),
    left: useRef(null)
  };

  // Intersection observer for reveal animation
  const intersection = useIntersection(tiltRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  });

  // Setup initial state
  useEffect(() => {
    gsap.set(tiltRef.current, {
      opacity: 0,
      y: 50,
    });

    // Setup borders initial state
    gsap.set(borderRefs.top.current, { width: 0 });
    gsap.set(borderRefs.right.current, { height: 0 });
    gsap.set(borderRefs.bottom.current, { width: 0 });
    gsap.set(borderRefs.left.current, { height: 0 });
  }, []);

  // Handle reveal animation on scroll
  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      gsap.to(tiltRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power2.out"
      });

      // Reveal borders with staggered effect
      gsap.to(borderRefs.top.current, {
        width: "100%",
        duration: 0.4,
        delay: index * 0.15 + 0.1,
        ease: "power2.inOut"
      });

      gsap.to(borderRefs.right.current, {
        height: "100%",
        duration: 0.4,
        delay: index * 0.15 + 0.2,
        ease: "power2.inOut"
      });

      gsap.to(borderRefs.bottom.current, {
        width: "100%",
        duration: 0.4,
        delay: index * 0.15 + 0.3,
        ease: "power2.inOut"
      });

      gsap.to(borderRefs.left.current, {
        height: "100%",
        duration: 0.4,
        delay: index * 0.15 + 0.4,
        ease: "power2.inOut"
      });
    }
  }, [intersection, index]);

  // Handle mouse movement for the tilt effect
  const handleMouseMove = (event) => {
    if (!tiltRef.current) return;

    const rect = tiltRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    // Use GSAP to animate the tilt smoothly
    gsap.to(tiltRef.current, {
      transform: `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`,
      duration: 0.4,
      ease: "power2.out"
    });

    // Also pass the mouse position to any child components that need it
    if (tiltRef.current) {
      const customEvent = new CustomEvent('parentmousemove', {
        detail: { relativeX, relativeY, clientX: event.clientX, clientY: event.clientY }
      });
      tiltRef.current.dispatchEvent(customEvent);
    }
  };

  const handleMouseLeave = () => {
    // Reset the tilt with a smooth animation
    if (tiltRef.current) {
      gsap.to(tiltRef.current, {
        transform: "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={tiltRef}
      className={`${className} relative overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Valorant-style borders */}
      <div ref={borderRefs.top} className="absolute top-0 left-0 h-[2px] bg-blue-500 z-10"></div>
      <div ref={borderRefs.right} className="absolute top-0 right-0 w-[2px] bg-blue-500 z-10"></div>
      <div ref={borderRefs.bottom} className="absolute bottom-0 right-0 h-[2px] bg-blue-500 z-10"></div>
      <div ref={borderRefs.left} className="absolute bottom-0 left-0 w-[2px] bg-blue-500 z-10"></div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-500 z-10"></div>
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-500 z-10"></div>
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-500 z-10"></div>
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-500 z-10"></div>

      {children}
    </div>
  );
};

// Enhanced BentoCard
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const hoverGradientRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);

  // Setup GSAP animations
  useGSAP(() => {
    // Set initial states
    gsap.set(titleRef.current, { y: 20, opacity: 0 });
    gsap.set(descRef.current, { y: 15, opacity: 0 });

    if (buttonRef.current) {
      gsap.set(buttonRef.current, { y: 10, opacity: 0 });
    }

    // Listen for parent mouse move events
    const handleParentMouseMove = (e) => {
      const { clientX, clientY } = e.detail;

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCursorPosition({
          x: clientX - rect.left,
          y: clientY - rect.top,
        });
      }
    };

    if (cardRef.current) {
      cardRef.current.addEventListener('parentmousemove', handleParentMouseMove);
    }

    // Animate elements in
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(titleRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
      .to(descRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .to(buttonRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");

    return () => {
      if (cardRef.current) {
        cardRef.current.removeEventListener('parentmousemove', handleParentMouseMove);
      }
    };
  }, { scope: cardRef });

  const handleMouseMove = (event) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div ref={cardRef} className="relative size-full">
      {/* Video background */}
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>

      {/* Security particles overlay */}
      <SecurityParticles />

      {/* Content */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 ref={titleRef} className="bento-title special-font uppercase">
            <span className="text-blue-500 mr-2">/</span>{title}
          </h1>
          {description && (
            <p ref={descRef} className="mt-3 max-w-64 text-xs md:text-base text-gray-300">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden bg-[#050505] border border-blue-500/30 px-5 py-2 text-xs uppercase text-blue-500"
          >
            {/* Radial gradient hover effect */}
            <div
              ref={hoverGradientRef}
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #1d4ed888, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Valorant-style blue button for last card
const BlueButton = () => {
  const arrowRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(arrowRef.current, {
      scale: 1.2,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(arrowRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={arrowRef}
      className="m-5 scale-[5] self-end text-blue-500 transition-transform duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TiLocationArrow />
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const descriptionRef = useRef(null);

  useGSAP(() => {
    // Header animations
    gsap.from(headerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(descriptionRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

  }, { scope: sectionRef });

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
    <section ref={sectionRef} className="bg-[#030303] pb-52 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-5"></div>

      {/* Decorative elements */}
      <AngularDecoration className="top-20 left-10" delay={0.2} />
      <AngularDecoration className="bottom-40 right-10" delay={0.5} />

      {/* Scan lines effect */}
      <Scanlines />
      <style jsx>{scanlinesStyle}</style>

      <div className="container mx-auto px-3 md:px-10 relative z-10">
        <div className="px-5 py-32">
          <div className="w-10 h-[2px] bg-blue-500 mb-4"></div>
          <h2
            ref={headerRef}
            className="font-general text-lg text-blue-50 uppercase tracking-wider mb-2 flex items-center"
          >
            <span className="text-blue-500 mr-2">//</span>
            <GlitchText text="Comprehensive Cybersecurity Solutions" />
          </h2>
          <p
            ref={descriptionRef}
            className="max-w-md font-circular-web text-lg text-gray-400"
          >
            Protect your organization with our integrated suite of security solutions at
            security.techanv.com, offering advanced threat protection and comprehensive
            security monitoring across your entire infrastructure.
          </p>
        </div>

        <BentoTilt className="relative mb-7 h-96 w-full overflow-hidden md:h-[65vh]" index={0}>
          <SecurityBadge icon={<FaShieldAlt size={18} />} delay={0.6} className="top-5 right-5" />
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                S<b>I</b>EM
              </>
            }
            description="Security Information and Event Management solution that collects, analyzes, and correlates security data from across your infrastructure for real-time threat detection and incident response."
            isComingSoon
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="row-span-1 md:col-span-1 md:row-span-2" index={1}>
            <SecurityBadge icon={<FaNetworkWired size={18} />} delay={0.8} className="top-5 left-5" />
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  X<b>D</b>R
                </>
              }
              description="Extended Detection and Response that unifies security telemetry across endpoints, networks, cloud workloads, and applications for comprehensive threat detection and automated response."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="row-span-1 ms-32 md:col-span-1 md:ms-0" index={2}>
            <SecurityBadge icon={<FaLock size={18} />} delay={1.0} className="bottom-5 right-5" />
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  E<b>D</b>R
                </>
              }
              description="Endpoint Detection and Response that monitors endpoint activities, detects suspicious behavior, and provides rapid response capabilities to neutralize threats before they spread."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="me-14 md:col-span-1 md:me-0" index={3}>
            <SecurityBadge icon={<FaServer size={18} />} delay={1.2} className="bottom-5 left-5" />
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  SO<b>A</b>R
                </>
              }
              description="Security Orchestration, Automation and Response platform that streamlines incident response workflows, automates repetitive tasks, and enhances your security team's efficiency."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt index={4}>
            <div className="flex size-full flex-col justify-between bg-[#050505] p-5 relative overflow-hidden border border-blue-500/20">
              {/* Security particles */}
              <SecurityParticles />

              {/* Angular decorative corners */}
              <div className="absolute top-0 left-0 w-[100px] h-[1px] bg-blue-500/50"></div>
              <div className="absolute top-0 left-0 w-[1px] h-[100px] bg-blue-500/50"></div>
              <div className="absolute bottom-0 right-0 w-[100px] h-[1px] bg-blue-500/50"></div>
              <div className="absolute bottom-0 right-0 w-[1px] h-[100px] bg-blue-500/50"></div>

              <h1 className="bento-title special-font max-w-64 text-white uppercase tracking-wider relative z-10">
                <span className="text-blue-500 mr-2">/</span>
                Visit <b className="text-blue-500">security.techanv.com</b> for more.
              </h1>

              <div className="relative">
                <div className="absolute h-20 w-20 rounded-full bg-blue-500/20 blur-xl bottom-0 right-0"></div>
                <BlueButton />
              </div>
            </div>
          </BentoTilt>

          <BentoTilt index={5}>
            <div className="relative size-full">
              <video
                src="videos/feature-5.mp4"
                loop
                muted
                autoPlay
                className="size-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <SecurityBadge icon={<FaShieldAlt size={18} />} delay={1.4} className="top-5 right-5" />
            </div>
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
