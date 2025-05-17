import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { FaShieldAlt, FaLock, FaNetworkWired, FaBug, FaRobot } from "react-icons/fa";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

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
        <div className="absolute border border-blue-500/50 w-24 h-24 rotate-45"></div>
        <div className="absolute border border-blue-500/30 w-24 h-24 rotate-[30deg]"></div>
        <div className="absolute bg-blue-500/10 w-12 h-12 rotate-45 left-6 top-6"></div>
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

// Story point component
const StoryPoint = ({ number, title, description, delay = 0 }) => {
  const pointRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.set(pointRef.current, {
      scale: 0,
      opacity: 0
    });

    gsap.set(lineRef.current, {
      height: 0
    });

    gsap.set(contentRef.current, {
      opacity: 0,
      x: -20
    });

    gsap.to(pointRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      delay: delay,
      ease: "back.out(1.7)"
    });

    gsap.to(lineRef.current, {
      height: "100%",
      duration: 0.8,
      delay: delay + 0.3,
      ease: "power1.inOut"
    });

    gsap.to(contentRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      delay: delay + 0.6,
      ease: "power2.out"
    });

  }, { scope: pointRef });

  return (
    <div className="flex mb-8 relative">
      <div className="flex flex-col items-center mr-6">
        <div
          ref={pointRef}
          className="flex items-center justify-center h-12 w-12 rounded-full bg-[#050505] text-blue-500 border-2 border-blue-500 z-10"
        >
          <span className="font-bold text-lg">{number}</span>
        </div>
        {number < 3 && (
          <div
            ref={lineRef}
            className="w-[2px] bg-blue-500/30 absolute top-12 left-6 -translate-x-1/2 h-0"
          ></div>
        )}
      </div>
      <div ref={contentRef} className="pt-2">
        <h3 className="text-xl font-bold text-blue-50 uppercase tracking-wider mb-2 flex items-center">
          <span className="text-blue-500 mr-2">/</span>
          {title}
        </h3>
        <p className="text-gray-400 max-w-xl">
          {description}
        </p>
      </div>
    </div>
  );
};

const TECHANVStory = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageFrameRef = useRef(null);
  const frameRef = useRef(null);

  // Setup animations with GSAP
  useGSAP(() => {
    // Main animations
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

    // Image frame animation
    gsap.from(imageFrameRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out"
    });

    // Animated border for image container
    const borders = imageContainerRef.current.querySelectorAll('.border-line');
    gsap.set(borders, { width: 0, height: 0 });

    gsap.to(borders[0], { // top
      width: "100%",
      duration: 0.6,
      delay: 0.8,
      ease: "power2.inOut"
    });

    gsap.to(borders[1], { // right
      height: "100%",
      duration: 0.6,
      delay: 1.0,
      ease: "power2.inOut"
    });

    gsap.to(borders[2], { // bottom
      width: "100%",
      duration: 0.6,
      delay: 1.2,
      ease: "power2.inOut"
    });

    gsap.to(borders[3], { // left
      height: "100%",
      duration: 0.6,
      delay: 1.4,
      ease: "power2.inOut"
    });

  }, { scope: sectionRef });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });

    // Parallax effect for security badges
    const badges = imageContainerRef.current.querySelectorAll('.security-badge');
    badges.forEach(badge => {
      const offsetX = ((xPos - centerX) / centerX) * 10;
      const offsetY = ((yPos - centerY) / centerY) * 10;

      gsap.to(badge, {
        x: offsetX,
        y: offsetY,
        duration: 0.5,
        ease: "power1.out"
      });
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });

      // Reset badges position
      const badges = imageContainerRef.current.querySelectorAll('.security-badge');
      badges.forEach(badge => {
        gsap.to(badge, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power1.out"
        });
      });
    }
  };

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
    <div id="techanv-story" ref={sectionRef} className="min-h-dvh w-screen bg-[#030303] text-blue-50 relative overflow-hidden py-20">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-5"></div>

      {/* Decorative elements */}
      <AngularDecoration className="top-20 left-10" delay={0.2} />
      <AngularDecoration className="bottom-40 right-10" delay={0.5} />

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
            <GlitchText text="OUR JOURNEY TO SECURE THE DIGITAL FRONTIER" />
          </p>

          <div ref={titleRef} className="mt-5">
            <AnimatedTitle
              title="The <b>TECHANV</b> Story"
              containerClass="relative z-10 !text-white text-center uppercase tracking-wide"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <div
            ref={imageContainerRef}
            className="story-img-container relative mx-auto md:mx-0"
          >
            {/* Valorant-style borders */}
            <div className="border-line absolute top-0 left-0 h-[2px] bg-blue-500 w-0"></div>
            <div className="border-line absolute top-0 right-0 w-[2px] bg-blue-500 h-0"></div>
            <div className="border-line absolute bottom-0 right-0 h-[2px] bg-blue-500 w-0"></div>
            <div className="border-line absolute bottom-0 left-0 w-[2px] bg-blue-500 h-0"></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-500"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-500"></div>

            {/* Security badges */}
            <SecurityBadge icon={<FaShieldAlt size={18} />} delay={1.6} className="security-badge top-5 left-5" />
            <SecurityBadge icon={<FaNetworkWired size={18} />} delay={1.8} className="security-badge top-5 right-5" />
            <SecurityBadge icon={<FaBug size={18} />} delay={2.0} className="security-badge bottom-5 left-5" />
            <SecurityBadge icon={<FaRobot size={18} />} delay={2.2} className="security-badge bottom-5 right-5" />

            <div ref={imageFrameRef} className="story-img-mask relative overflow-hidden p-4 bg-[#050505]/80">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/gallery-1.webp"
                  alt="TECHANV Security Operations Center"
                  className="object-contain relative z-10"
                />

                {/* Overlay with scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          <div className="story-timeline relative">
            <StoryPoint
              number={1}
              title="The Beginning"
              description="Founded in 2020 by a team of security veterans, TECHANV emerged to address the growing gap in cybersecurity solutions. Recognizing that traditional approaches weren't keeping pace with evolving threats, our founders set out to create an integrated platform that combined offensive and defensive security capabilities."
              delay={0.2}
            />

            <StoryPoint
              number={2}
              title="Innovation"
              description="In 2022, we launched our groundbreaking XDR/OXDR platform, pioneering a unified approach that merges defensive detection capabilities with offensive security testing. This dual-minded architecture allows organizations to not only detect and respond to threats but also proactively identify vulnerabilities across their infrastructure."
              delay={0.7}
            />

            <StoryPoint
              number={3}
              title="Today"
              description="Today, TECHANV stands at the forefront of cybersecurity innovation, protecting enterprises worldwide with our comprehensive security solutions. Our platform integrates advanced AI-driven analytics, automated response capabilities, and continuous security validation to ensure organizations stay ahead of emerging threats."
              delay={1.2}
            />
          </div>
        </div>

        <div className="bg-[#050505] p-6 rounded-none md:rounded-lg relative overflow-hidden border border-blue-500/20 max-w-3xl mx-auto">
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

          <div className="mb-2 flex items-center justify-center">
            <div className="w-10 h-[2px] bg-blue-500 mr-4"></div>
            <GlitchText text="OUR MISSION" className="text-sm font-bold tracking-wider text-blue-500" />
          </div>

          <h3 className="text-xl font-bold mb-3 relative uppercase tracking-wider text-center">
            Securing the Digital Future
          </h3>

          <p className="relative text-gray-300 text-center mb-6">
            "At TECHANV, we believe security is not just about defense—it's about understanding
            the attacker's mindset while building a defender's brain. Our integrated XDR/OXDR platform
            embodies this philosophy, delivering proactive threat detection and response capabilities
            that evolve alongside the threat landscape."
          </p>

          <div className="flex justify-center">
            <ValorantButton text="EXPLORE OUR PLATFORM" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TECHANVStory;
