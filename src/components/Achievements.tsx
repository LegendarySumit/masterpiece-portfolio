import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    title: "Zenotrone Event",
    issuer: "DevSomWare x GeeksforGeeks",
    date: "2025",
    description:
      "Participated in Zenotrone, a college-level tech event organized by DevSomWare in collaboration with GeeksforGeeks. Great experience to learn, connect, and grow.",
    image: "/zenotrone_hackathon.jpeg",
    url: "",
    color: "#00F0FF",
  },
  {
    id: 2,
    title: "AI Workshop",
    issuer: "Build Your Own Generative AI Model",
    date: "2025",
    description:
      "Attended a student-focused workshop on Artificial Intelligence, exploring the fundamentals of Generative AI and hands-on exposure to building simple AI models.",
    image: "/nxt_wave.jpeg",
    url: "",
    color: "#B200FF",
  },
  {
    id: 3,
    title: "Java Programming Course",
    issuer: "GeeksforGeeks",
    date: "2025",
    description:
      "Successfully completed the 16-week GeeksforGeeks training program under the CUTM initiative at Bhubaneswar Campus.",
    image: "/gfg.jpeg",
    url: "https://media.geeksforgeeks.org/courses/certificates/24167b75fdaf240d86a9cd8364ad67c1.pdf",
    color: "#00F0FF",
  },
  {
    id: 4,
    title: "Google Cloud Gen AI Exchange Hackathon",
    issuer: "Google x Hack2Skill",
    date: "Jan 2026",
    description:
      "Hackathon participation where me and my team built an AI-Powered Marketplace Assistant for Local Artisans - designed to help small sellers list, describe, and sell their products.",
    image: "/google_x_h2s.jpeg",
    url: "https://certificate.hack2skill.com/user/genaipoweredmarketplace/2025H2S08GH-P702187",
    credentialId: "2025H2S08GH-P702187",
    color: "#B200FF",
  },
  {
    id: 5,
    title: "Hack For Green Bharat Hackathon",
    issuer: "Unstop",
    date: "Mar 2026",
    description:
      "Certificate of Participation in Online Round of Hack For Green Bharat Hackathon.",
    image: "/unstop_hackathon.jpeg",
    url: "https://unstop.com/certificate-preview/c18a8be7-9ba5-4097-b0e0-f4995b9156ad",
    credentialId: "c18a8be7-9ba5-4097-b0e0-f4995b9156ad",
    color: "#00F0FF",
  },
  {
    id: 6,
    title: "SQL Basic Certification",
    issuer: "HackerRank",
    date: "Jun 2026",
    description:
      "SQL Basic Certification from HackerRank demonstrating proficiency in SQL fundamentals and database queries.",
    image: "/sql_basic.jepg.jpeg",
    url: "https://www.hackerrank.com/certificates/49ac28ba99c3",
    credentialId: "49AC28BA99C3",
    color: "#B200FF",
  },
  {
    id: 7,
    title: "MongoDB Overview",
    issuer: "MongoDB",
    date: "Jun 2026",
    description:
      "Core Concepts And Architecture certification from MongoDB, demonstrating understanding of MongoDB database fundamentals.",
    image: "/mongodb.jpeg",
    url: "https://www.credly.com/badges/1032c58f-8e57-4019-ae1b-a003651773ec",
    color: "#00F0FF",
  },
  {
    id: 8,
    title: "GIET Ghangapatna Hackfest 2.0",
    issuer: "GIET Ghangapatna",
    date: "2026",
    description:
      "Built TechFixAI: A Voice-to-Ticket AI System for enterprise incident management. Features Japanese speech-to-text, intelligent routing, developer chat, and AES-256 encrypted audio storage. Production-oriented system designed for real technical teams.",
    image: "/giet_hackathon.jpeg",
    url: "https://www.linkedin.com/posts/sumit-kumar-prusty-5aa934332_hackathon-giet-hackfest-ugcPost-7430955830142959616-HMe8/?utm_source=share&utm_medium=member_android&rcm=ACoAAFPJnVIBOWrQ7b65781ro-lWAqGrCyx7bb0",
    color: "#B200FF",
  },
  {
    id: 9,
    title: "FESTRONIX 2K26 – Codenexus Hackathon",
    issuer: "GIFT Autonomous, Bhubaneswar",
    date: "Feb 2026",
    description:
      "Participated in FESTRONIX 2K26 (26–27 February 2026), designing and implementing production-oriented software solutions under strict time constraints. Emphasized engineering discipline, structured system design, and execution under pressure.",
    image: "/festronix_hackathon.jpeg",
    url: "https://www.linkedin.com/posts/sumit-kumar-prusty-5aa934332_festronix2k26-codenexushackathon-hackathonexperience-share-7433502610671763456-a5AV/?utm_source=share&utm_medium=member_android&rcm=ACoAAFPJnVIBOWrQ7b65781ro-lWAqGrCyx7bb0",
    color: "#00F0FF",
  },
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger animation for cards on scroll
      gsap.utils.toArray(".achievement-card").forEach((card, index: number) => {
        gsap.from(card as HTMLElement, {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card as HTMLElement,
            start: "top 80%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="achievements"
      className="relative w-full bg-transparent overflow-hidden z-10 py-20 md:py-32"
    >
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-20">
        <span className="text-[#B200FF] font-mono text-sm tracking-widest mb-4 block uppercase">
          // Achievements & Certifications
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
          Recognition & Growth
        </h2>
        <p className="text-white/60 font-light max-w-2xl">
          Certifications and achievements that showcase my commitment to
          continuous learning and professional development.
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement) => {
            const isClickable = achievement.url && achievement.url !== "";
            const Component = isClickable ? "a" : "div";
            const componentProps = isClickable
              ? {
                  href: achievement.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <Component
                key={achievement.id}
                {...componentProps}
                className="achievement-card group relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-white/50 transition-all duration-500 cursor-pointer hover:shadow-xl h-full flex flex-col"
                style={{
                  boxShadow: `0 0 40px ${achievement.color}15, inset 0 0 20px ${achievement.color}10`,
                }}
              >
                {/* Image Container */}
                <div className="relative w-full h-40 overflow-hidden bg-gradient-to-b from-black/50 to-black/80 flex-shrink-0">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80" />

                  {/* Issuer Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                    <p className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                      {achievement.date}
                    </p>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 relative z-10 flex flex-col flex-grow">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-xl font-black text-white tracking-tight mb-2">
                      {achievement.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-sm text-white/70 font-mono mb-3">
                      {achievement.issuer}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {achievement.description}
                    </p>

                    {/* Credential ID if exists */}
                    {achievement.credentialId && (
                      <p className="text-xs text-white/50 font-mono mb-4 break-all">
                        ID: {achievement.credentialId}
                      </p>
                    )}

                    {/* View Certificate Button - Only show if URL exists */}
                    {achievement.url && achievement.url !== "" && (
                      <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider mt-auto">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: achievement.color }}
                        />
                        <span className="text-white/80 group-hover:text-white transition-colors">
                          View Credential
                        </span>
                        <span className="text-white/50 group-hover:text-white/80 transition-colors">
                          →
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Border Glow on Hover */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${achievement.color}20, transparent)`,
                  }}
                />
              </Component>
            );
          })}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#B200FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />
    </section>
  );
}
