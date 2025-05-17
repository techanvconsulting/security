import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { FaShieldAlt, FaLock } from "react-icons/fa";

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

const FloatingImage = () => {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageFrameRef = useRef(null);

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

    gsap.from(descriptionRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4,
      scrollTrigger: {
        trigger: descriptionRef.current,
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
    <div id="story" ref={sectionRef} className="min-h-dvh w-screen bg-[#030303] text-blue-50 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-5"></div>

      {/* Decorative elements */}
      <AngularDecoration className="top-20 left-10" delay={0.2} />
      <AngularDecoration className="bottom-40 right-10" delay={0.5} />

      {/* Scan lines effect */}
      <Scanlines />
      <style jsx>{scanlinesStyle}</style>

      <div className="flex size-full flex-col items-center py-10 pb-24 relative z-10">
        <div className="w-10 h-[2px] bg-blue-500 mb-4"></div>
        <p
          ref={subtitleRef}
          className="font-general text-sm uppercase tracking-wider md:text-[10px] mb-2 text-blue-500 inline-block py-1 px-2 border-l-2 border-blue-500"
        >
          <GlitchText text="COMPREHENSIVE CYBERSECURITY SOLUTIONS" />
        </p>

        <div className="relative size-full">
          <div ref={titleRef}>
            <AnimatedTitle
              title="your <b>s</b>ecurity <br /> our priorit<b>y</b>"
              containerClass="mt-5 relative z-10 text-white uppercase"
            />
          </div>

          <div
            ref={imageContainerRef}
            className="story-img-container relative mt-10 max-w-4xl mx-auto"
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
            <SecurityBadge icon={<FaLock size={18} />} delay={1.8} className="security-badge bottom-5 right-5" />

            <div ref={imageFrameRef} className="story-img-mask relative overflow-hidden p-4 bg-[#050505]/80">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="security operations center"
                  className="object-contain relative z-10"
                />

                {/* Overlay with scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start relative z-10 bg-[#050505]/70 p-6 rounded-sm border-l-2 border-blue-500">
            <p
              ref={descriptionRef}
              className="mt-3 max-w-sm text-center font-circular-web text-gray-300 md:text-start"
            >
              <span className="text-blue-500 mr-2">//</span>
              Visit security.techanv.com to explore our complete suite of cybersecurity
              solutions including SIEM, XDR, EDR, and SOAR. Protect your organization
              with TECHANV's advanced threat protection.
            </p>

            <div className="mt-5">
              <ValorantButton text="EXPLORE SOLUTIONS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
