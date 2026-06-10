import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Badge from "./Badge";
import { FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    position: "Python Developer",
    company: "Cognifyz Technologies",
    type: "Internship",
    duration: "May 2026 - Present",
    durationShort: "2 mos",
    location: "Nagpur, Maharashtra, India",
    locationType: "Remote",
    color: "#00F0FF",
  },
  {
    id: 2,
    position: "Python Developer",
    company: "CodeAlpha",
    type: "Internship",
    duration: "Jun 2026 - Present",
    durationShort: "1 mo",
    location: "Lucknow, Uttar Pradesh, India",
    locationType: "Remote",
    color: "#B200FF",
  },
  {
    id: 3,
    position: "Java Developer Intern",
    company: "CodSoft",
    type: "Internship",
    duration: "Jun 2026 - Present",
    durationShort: "1 mo",
    location: "Remote",
    locationType: "Remote",
    color: "#00F0FF",
  },
  {
    id: 4,
    position: "Python Developer",
    company: "Pinnacle Labs",
    type: "Internship",
    duration: "May 2026 - Present",
    durationShort: "2 mos",
    location: "Kolkata, West Bengal, India",
    locationType: "Remote",
    color: "#B200FF",
  },
  {
    id: 5,
    position: "Python Developer",
    company: "Oasis Infobyte",
    type: "Internship",
    duration: "May 2026 - Present",
    durationShort: "2 mos",
    location: "Remote",
    locationType: "Remote",
    color: "#00F0FF",
  },
  {
    id: 6,
    position: "Python Developer",
    company: "Syntecxhub",
    type: "Internship",
    duration: "May 2026 - Present",
    durationShort: "2 mos",
    location: "Kanpur Nagar, Uttar Pradesh, India",
    locationType: "Remote",
    color: "#B200FF",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate experience cards on scroll
      gsap.utils.toArray(".experience-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 40, // Changed from x to y for a cleaner grid staggered reveal
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full bg-transparent overflow-hidden z-10 py-20 md:py-32"
    >
      {/* Background Gradient Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#B200FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />

      <div className="px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <Badge label="Work Experience" variant="primary" />
          <span className="text-[#B200FF] font-mono text-sm tracking-widest mb-4 block uppercase mt-4">
            // Internships & Learning
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-white/60 font-light max-w-2xl">
            Building real-world experience through internships and hands-on
            learning at innovative organizations.
          </p>
        </div>

        {/* Experience Grid - Updated to CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="experience-card group relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-6 md:p-8 hover:border-white/50 transition-all duration-500 overflow-hidden flex flex-col h-full"
              style={{
                boxShadow: `0 0 40px ${exp.color}15, inset 0 0 20px ${exp.color}10`,
              }}
              whileHover={{ y: -5 }}
            >
              {/* Hover Gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${exp.color}20, transparent)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-grow">
                <div className="flex flex-col gap-4">
                  {/* Left side - Position and Company */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FaBriefcase className="text-[#00F0FF]" size={16} />
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                        {exp.position}
                      </h3>
                    </div>
                    <p className="text-lg text-white/80 font-semibold mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-white/60 font-mono mb-4">
                      {exp.type}
                    </p>
                  </div>

                  {/* Duration Badge */}
                  <div className="flex items-start">
                    <div className="text-left">
                      <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-1">
                        Duration
                      </p>
                      <p className="text-sm font-mono font-bold text-[#00F0FF]">
                        {exp.durationShort}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom - Duration and Location (pushed to bottom using mt-auto) */}
                <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <FaClock size={14} className="text-white/40 shrink-0" />
                    <span className="text-sm text-white/60">
                      {exp.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt size={14} className="text-white/40 shrink-0" />
                    <span className="text-sm text-white/60 line-clamp-1">
                      {exp.location}
                    </span>
                  </div>

                  {/* Remote Badge */}
                  <div className="inline-flex w-fit mt-2 px-3 py-1 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/50">
                    <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                      {exp.locationType}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-white/70 mb-6">
            Open to full-time opportunities and exciting projects!
          </p>
          <motion.a
            href="mailto:prustysumit78@gmail.com"
            className="inline-block px-8 py-3 rounded-lg border border-[#00F0FF] text-[#00F0FF] font-mono text-sm uppercase tracking-wider hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}