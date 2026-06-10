import { useEffect } from "react";

const techRow1 = ["HTML", "CSS", "JavaScript", "Java", "Python"];
const techRow2 = ["C", "MySQL", "Git", "GitHub", "Linux"];
const techRow3 = ["React", "Node.js", "TypeScript", "Firebase", "Next.js"];

export default function TechStack() {
  useEffect(() => {
    // Add style for animations dynamically
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes scrollLeftInfinite {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-20%);
        }
      }

      @keyframes scrollRightInfinite {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(20%);
        }
      }

      .scroll-left-infinite {
        animation: scrollLeftInfinite 30s linear infinite;
      }

      .scroll-right-infinite {
        animation: scrollRightInfinite 30s linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const TechRow = ({
    technologies,
    isRightToLeft,
  }: {
    technologies: string[];
    isRightToLeft: boolean;
  }) => {
    const animationClass = isRightToLeft
      ? "scroll-right-infinite"
      : "scroll-left-infinite";

    // Duplicate items 5 times to create seamless infinite loop
    // As one item exits, another enters from opposite side
    const items = Array(5).fill(technologies).flat();

    return (
      <div className="relative w-full overflow-hidden py-6 md:py-10">
        <div
          className={`flex gap-12 md:gap-20 ${animationClass}`}
          style={{
            width: "fit-content",
          }}
        >
          {items.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex-shrink-0 group cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <h3
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter hover:text-[#00F0FF] transition-colors duration-300 whitespace-nowrap"
                style={{
                  textShadow: `0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(178, 0, 255, 0.3)`,
                  fontFamily: "monospace",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                {tech}
              </h3>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00F0FF] to-[#B200FF] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="tech"
      className="relative w-full bg-transparent overflow-hidden z-10 py-12 md:py-20"
    >
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-8 md:mb-12">
        <span className="text-[#B200FF] font-mono text-sm tracking-widest mb-4 block uppercase">
          // Tech Arsenal
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
          System Stack
        </h2>
      </div>

      {/* Tech Stack Rows with Seamless Infinite Looping */}
      <div className="space-y-2 md:space-y-6">
        {/* Row 1 - Left to Right */}
        <TechRow technologies={techRow1} isRightToLeft={false} />

        {/* Row 2 - Left to Right (same as rows 1 & 3) */}
        <TechRow technologies={techRow2} isRightToLeft={false} />

        {/* Row 3 - Left to Right */}
        <TechRow technologies={techRow3} isRightToLeft={false} />
      </div>

      {/* Decorative Gradient Overlays on sides */}
      <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />

      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#B200FF]/10 rounded-full blur-3xl pointer-events-none opacity-20" />
    </section>
  );
}
