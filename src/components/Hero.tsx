import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  FiFileText,
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Playlist
  const playlist = [
    {
      name: "SPACE ATMOSPHERE 001",
      file: "audiopapkin-ambient-soundscapes-001-space-atmosphere-303246.mp3",
    },
    {
      name: "SPACE ATMOSPHERE 003",
      file: "audiopapkin-ambient-soundscapes-003-space-atmosphere-303242.mp3",
    },
    {
      name: "SPACE ATMOSPHERE 007",
      file: "audiopapkin-ambient-soundscapes-007-space-atmosphere-304974.mp3",
    },
    { name: "SPACE CHORDS LOOP", file: "idoberg-space-chords-loop-310493.mp3" },
  ];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const nameLine1 = "SUMIT KUMAR".split("");
  const nameLine2 = "PRUSTY".split("");

  const roleLine1 = "AI BUILDER".split("");
  const roleLine2 = "WEB DEVELOPER".split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.5 },
      });

      tl.fromTo(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          stagger: 0.2,
        },
        0.2,
      )
        .fromTo(
          charRefs.current,
          { y: 150, opacity: 0, rotateX: -90, transformOrigin: "50% 50% -50" },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.02 },
          "-=0.8",
        )
        .fromTo(
          ".resume-btn",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1 },
          "-=1.0",
        );
    });
    return () => ctx.revert();
  }, []);

  // Audio controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 5,
      );
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    if (isPlaying && audioRef.current) {
      audioRef.current.src = `/${playlist[nextIndex].file}`;
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    // Audio time update
  };

  const handleLoadedMetadata = () => {
    // Metadata loaded
  };

  const handleTrackEnd = () => {
    handleNextTrack();
  };

  const renderChars = (chars: string[], colorClass: string) => (
    <div className="overflow-hidden flex flex-wrap">
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) charRefs.current.push(el);
          }}
          className={`inline-block transform-style-3d text-transparent bg-clip-text ${colorClass}`}
          style={{
            display: char === " " ? "inline" : "inline-block",
            width: char === " " ? "1rem" : "auto",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-between pt-32 pb-16 md:p-12 overflow-hidden z-10 perspective-[2000px]"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-0 mt-auto mb-auto h-full absolute top-0 left-0 px-2 md:px-4 lg:px-6 pointer-events-none">
        {/* Left Headline */}
        <div className="relative z-10 w-full md:w-auto flex flex-col items-center md:items-start text-center md:text-left mt-[35vh] md:mt-0 pointer-events-auto pl-0">
          <h2 className="hero-subtitle text-[#a580ff] font-sans font-light text-base md:text-lg tracking-[0.05em] mb-2 inline-block">
            Hello! I'm
          </h2>
          <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-sans font-bold tracking-tight leading-[1.1] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] flex flex-col items-center md:items-start whitespace-nowrap">
            <div className="flex">
              {renderChars(
                nameLine1,
                "bg-gradient-to-b from-white to-gray-500",
              )}
            </div>
            <div className="flex">
              {renderChars(
                nameLine2,
                "bg-gradient-to-b from-white to-gray-500",
              )}
            </div>
          </h1>
        </div>

        {/* Right Headline */}
        <div className="relative z-10 w-full md:w-auto flex flex-col items-center md:items-end text-center md:text-right mt-8 md:mt-0 pointer-events-auto pr-0">
          <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.4rem] xl:text-[2.8rem] font-sans font-bold tracking-tighter leading-[1] flex flex-col items-center md:items-end whitespace-nowrap">
            <div className="flex">
              {renderChars(
                roleLine1,
                "bg-gradient-to-r from-[#B200FF] to-[#00F0FF]",
              )}
            </div>
            <div className="flex">
              {renderChars(
                roleLine2,
                "bg-gradient-to-r from-gray-300 to-gray-600 text-[0.8rem] md:text-[1rem] lg:text-[1.2rem] xl:text-[1.4rem] mt-2 tracking-normal",
              )}
            </div>
          </h1>
        </div>
      </div>

      {/* Bottom Center Elements */}
      <div className="absolute bottom-8 left-0 w-full flex flex-col items-center justify-center gap-6 z-30 pointer-events-auto">
        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={`/${playlist[currentTrackIndex].file}`}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleTrackEnd}
        />

        {/* Music Player */}
        <div className="flex items-center gap-4 text-gray-400 font-sans text-[10px] md:text-xs tracking-widest bg-black/20 backdrop-blur-md px-5 md:px-6 py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <button
            onClick={handleSkipBack}
            className="hover:text-[#00F0FF] transition-colors"
          >
            <FiSkipBack size={14} />
          </button>
          <button
            onClick={togglePlay}
            className="hover:text-white transition-colors"
          >
            {isPlaying ? (
              <FiPause size={16} className="text-[#00F0FF]" />
            ) : (
              <FiPlay size={16} className="text-[#a580ff]" />
            )}
          </button>
          <button
            onClick={handleNextTrack}
            className="hover:text-[#00F0FF] transition-colors"
          >
            <FiSkipForward size={14} />
          </button>
          <div className="w-[1px] h-4 bg-white/20 mx-2"></div>
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            {playlist[currentTrackIndex].name}
          </span>
        </div>

        {/* Resume */}
        <a
          href="/resume.pdf"
          className="resume-btn flex items-center gap-3 text-gray-400 hover:text-white font-sans font-semibold text-xs md:text-sm tracking-[0.2em] group transition-colors"
        >
          RESUME
          <FiFileText
            size={18}
            className="text-gray-400 group-hover:text-[#00F0FF] transition-colors"
          />
        </a>
      </div>
    </section>
  );
}
