import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaRocket,
  FaSearch,
  FaBolt,
  FaPython,
  FaCog,
  FaDatabase,
  FaBox,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const journeySteps = [
  {
    phase: "Foundation",
    year: "2024",
    description:
      "Started with web development, built interactive websites using HTML, CSS, and JavaScript",
    color: "#00F0FF",
    icon: FaRocket,
  },
  {
    phase: "Exploration",
    year: "2024-25",
    description:
      "Shifted focus to Python and backend technologies, started exploring databases and APIs",
    color: "#B200FF",
    icon: FaSearch,
  },
  {
    phase: "Mastery",
    year: "25-26",
    description:
      "Deep diving into backend engineering, system design, and building scalable solutions",
    color: "#00F0FF",
    icon: FaBolt,
  },
];

const facts = [
  { label: "Years Learning", value: "3+", subtext: "Engineering Journey" },
  { label: "Projects Built", value: "10", subtext: "From Ideas to Reality" },
  { label: "Technologies", value: "10+", subtext: "Always Learning More" },
  { label: "Certifications", value: "8+", subtext: "Proof of Growth" },
];

const focusAreas = [
  {
    icon: FaPython,
    title: "Python Fundamentals",
    desc: "Mastering core Python, DSA, and advanced concepts",
  },
  {
    icon: FaCog,
    title: "Backend Engineering",
    desc: "Building scalable APIs and server architectures",
  },
  {
    icon: FaDatabase,
    title: "Databases & SQL",
    desc: "SQL optimization, design patterns, and data modeling",
  },
  {
    icon: FaBox,
    title: "System Design",
    desc: "Understanding how to architect robust systems",
  },
];

export default function About({
  onOpenContact,
}: {
  onOpenContact?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate journey cards
      gsap.utils.toArray(".journey-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 60,
          rotation: -5,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 80%",
            once: true,
          },
        });
      });

      // Animate fact cards
      gsap.utils.toArray(".fact-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });

      // Animate text lines
      const textLines = textRef.current?.querySelectorAll(".text-line");
      if (textLines) {
        textLines.forEach((line: Element, index: number) => {
          gsap.from(line, {
            opacity: 0,
            x: -40,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              once: true,
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-transparent overflow-hidden z-10 py-20 md:py-32"
    >
      {/* Background Gradient Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B200FF]/10 rounded-full blur-3xl pointer-events-none opacity-20 -z-10" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none opacity-20 -z-10" />

      <div className="px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="text-[#00F0FF] font-mono text-sm tracking-widest mb-4 block uppercase">
            // About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Turning Ideas Into Code
          </h2>
          <p className="text-white/60 font-light max-w-2xl">
            A 3rd year engineering student passionate about backend engineering
            and software development.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-20">
          {/* Left: About Text */}
          <motion.div
            style={{ opacity, y }}
            className="flex flex-col justify-center"
            ref={textRef}
          >
            <div className="space-y-6">
              {[
                "I'm a 3rd year engineering student with a strong passion for software development and backend engineering. My journey in tech started with web development, where I built interactive projects and experimented with creative solutions.",
                "Over time, I shifted my focus toward Python, backend technologies, and system design. Now, I'm deeply invested in strengthening my core fundamentals—Python, APIs, databases, SQL, and software engineering principles.",
                "I believe the best way to master technology is by actually building with it. That's why I'm constantly working on projects, exploring new frameworks, and diving deep into how scalable systems are architected.",
                "Always open to connecting with fellow developers, backend engineers, and tech enthusiasts. Let's build something amazing together!",
              ].map((text, index) => (
                <p
                  key={index}
                  className="text-line text-white/70 leading-relaxed text-lg font-light"
                >
                  {text}
                </p>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <motion.a
                href="https://www.linkedin.com/in/sumit-kumar-prusty-5aa934332"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-[#00F0FF] text-[#00F0FF] font-mono text-sm uppercase tracking-wider hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect on LinkedIn
              </motion.a>
              <motion.button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-lg border border-[#B200FF] text-[#B200FF] font-mono text-sm uppercase tracking-wider hover:bg-[#B200FF] hover:text-white transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>

          {/* Right: Journey Timeline */}
          <div className="space-y-6">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  className="journey-card group relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-6 hover:border-white/50 transition-all duration-500 overflow-hidden"
                  style={{
                    boxShadow: `0 0 40px ${step.color}15, inset 0 0 20px ${step.color}10`,
                  }}
                  whileHover={{ y: -5 }}
                >
                  {/* Hover Gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}20, transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-1 flex items-center gap-3">
                          <IconComponent className="text-xl" />
                          {step.phase}
                        </h3>
                        <p className="text-sm font-mono text-white/60">
                          {step.year}
                        </p>
                      </div>
                    </div>

                    <p className="text-white/70 leading-relaxed text-sm">
                      {step.description}
                    </p>

                    {/* Phase Line */}
                    <div
                      className="mt-4 h-1 w-12 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Facts Section */}
        <motion.div
          className="mt-20 md:mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="mb-12">
            <span className="text-[#B200FF] font-mono text-sm tracking-widest mb-4 block uppercase">
              // Quick Facts
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              By The Numbers
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                className="fact-card relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-6 text-center hover:border-white/50 transition-all duration-500 group"
                style={{
                  boxShadow: `0 0 40px ${index % 2 === 0 ? "#00F0FF" : "#B200FF"}15, inset 0 0 20px ${index % 2 === 0 ? "#00F0FF" : "#B200FF"}10`,
                }}
              >
                {/* Hover Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? "#00F0FF" : "#B200FF"}20, transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <motion.p
                    className="text-3xl md:text-4xl font-black text-white mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {fact.value}
                  </motion.p>
                  <p className="text-sm font-mono uppercase tracking-wider text-white/60 mb-1">
                    {fact.label}
                  </p>
                  <p className="text-xs text-white/40">{fact.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Focus Area */}
        <motion.div
          className="mt-20 md:mt-32 relative rounded-2xl border border-white/20 bg-linear-to-br from-black/50 to-black/30 backdrop-blur-xl p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            boxShadow: `0 0 60px rgba(0, 240, 255, 0.1), inset 0 0 30px rgba(178, 0, 255, 0.05)`,
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00F0FF]/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#B200FF]/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <FaCog className="text-3xl text-[#00F0FF]" />
              <h3 className="text-2xl md:text-3xl font-black text-white">
                Core Focus Right Now
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {focusAreas.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    whileHover={{ x: 10 }}
                  >
                    <IconComponent className="text-3xl text-[#00F0FF] flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-bold mb-2">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
