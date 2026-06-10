import { useEffect, useRef, useMemo, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points, Float } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "FinMindAI",
    role: "AI Finance Ed-Tech",
    desc: "AI-powered finance education platform providing real-time market intelligence. Built with Next.js, TS, Tailwind, and Node to deliver cinematic user experiences.",
    tech: ["Next.js", "React", "Node.js", "Tailwind"],
    year: "2026",
    color: "#00F0FF",
    github: "https://github.com/LegendarySumit/finmindai",
  },
  {
    title: "ShipGuard AI",
    role: "Logistics Intelligence",
    desc: "Real-time Shipment Risk Monitoring & Intelligence Platform capturing global shipping data streams to prevent multi-million dollar liabilities.",
    tech: ["React", "Node.js", "Firebase", "Data Streams"],
    year: "2026",
    color: "#B200FF",
    github: "https://github.com/LegendarySumit/shipguard-ai",
  },
  {
    title: "TechFixAI",
    role: "Automated Incident Resolution",
    desc: "Production-ready Voice-to-Ticket Incident Platform processing massive loads of internal tickets using Python backend infrastructure.",
    tech: ["FastAPI", "Python", "React", "PostgreSQL"],
    year: "2025",
    color: "#00F0FF",
    github: "https://github.com/LegendarySumit/techfixai",
  },
  {
    title: "GreenGPT",
    role: "Environmental NLP",
    desc: "AI-Powered Environmental Intelligence Platform employing LLMs to deliver contextual awareness for ESG metrics mapping.",
    tech: ["Gemini 2.5", "React", "Firestore"],
    year: "2026",
    color: "#B200FF",
    github: "https://github.com/LegendarySumit/GreenGPT",
  },
  {
    title: "Cooture v4",
    role: "Full-Stack AI Generator",
    desc: "Full-stack template generation platform converting natural-language prompts into clean, responsive website designs. Secured with dual authentication, audit logging, and hardened deployment controls.",
    tech: ["Node.js", "Express", "Firebase", "Gemini API", "JWT"],
    year: "2025",
    color: "#00F0FF",
    github: "https://github.com/LegendarySumit/cooture-v4",
  },
  {
    title: "Grovity",
    role: "Productivity Platform",
    desc: "Comprehensive productivity suite enabling task management, habit tracking, focus timers, and growth visualization. Features real-time cloud sync, achievement badges, and interactive analytics dashboard.",
    tech: ["Tailwind CSS", "JavaScript", "Firebase", "Firestore"],
    year: "2025",
    color: "#B200FF",
    github: "https://github.com/LegendarySumit/Grovity",
  },
];

function CentralSpine() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const y = (i / particleCount) * 80 - 40;

      const radius = 2.5;
      const angle = y * 0.6;

      const isOuter = i % 2 === 0;
      const currentRadius = isOuter ? radius : radius * 0.3;
      const currentAngle = isOuter ? angle : angle + Math.PI;

      const noiseX = (Math.random() - 0.5) * 0.8;
      const noiseY = (Math.random() - 0.5) * 0.8;
      const noiseZ = (Math.random() - 0.5) * 0.8;

      pos[i * 3] = Math.cos(currentAngle) * currentRadius + noiseX;
      pos[i * 3 + 1] = y + noiseY;
      pos[i * 3 + 2] = Math.sin(currentAngle) * currentRadius + noiseZ;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.2;
      pointsRef.current.position.y = (window.scrollY * 0.015) % 40;
    }
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#00F0FF"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function Mars() {
  const marsRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const vecRef = useRef(new THREE.Vector3());
  const pointerPos = useRef(new THREE.Vector2());

  const marsColorMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#D84315";
    ctx.fillRect(0, 0, 2048, 1024);

    const imageData = ctx.getImageData(0, 0, 2048, 1024);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const index = i / 4;
      const x = (index % 2048) / 2048;
      const y = Math.floor(index / 2048) / 1024;

      let noise = 0;
      let amplitude = 1;
      let frequency = 1;
      let maxValue = 0;

      for (let octave = 0; octave < 6; octave++) {
        const sampleX = x * frequency * 8;
        const sampleY = y * frequency * 8;
        noise +=
          amplitude * Math.sin(sampleX * Math.PI) * Math.cos(sampleY * Math.PI);
        maxValue += amplitude;
        amplitude *= 0.5;
        frequency *= 2;
      }
      noise = noise / maxValue;

      const darkRegion =
        Math.sin(x * Math.PI * 3) * Math.cos(y * Math.PI * 1.5) > 0.3;
      const brightRegion =
        Math.sin((x - 0.7) * Math.PI * 4) * Math.cos((y - 0.3) * Math.PI * 3) >
        0.5;

      let r = 216,
        g = 67,
        b = 21;

      if (darkRegion) {
        r = Math.round(155 + noise * 70);
        g = Math.round(85 + noise * 45);
        b = Math.round(55 + noise * 35);
      } else if (brightRegion) {
        r = Math.round(235 + noise * 20);
        g = Math.round(125 + noise * 40);
        b = Math.round(80 + noise * 25);
      } else {
        r = Math.round(210 + noise * 40);
        g = Math.round(100 + noise * 40);
        b = Math.round(65 + noise * 25);
      }

      data[i] = Math.max(120, Math.min(255, r));
      data[i + 1] = Math.max(70, Math.min(255, g));
      data[i + 2] = Math.max(40, Math.min(255, b));
      data[i + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    return texture;
  }, []);

  const marsNormalMap = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#8080FF";
    ctx.fillRect(0, 0, 1024, 512);

    const features = [
      { x: 0.35, y: 0.5, size: 150 },
      { x: 0.75, y: 0.35, size: 180 },
      { x: 0.2, y: 0.2, size: 100 },
      { x: 0.85, y: 0.7, size: 80 },
    ];

    features.forEach((f) => {
      const x = f.x * 1024;
      const y = f.y * 512;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, f.size);
      gradient.addColorStop(0, "#FF7080");
      gradient.addColorStop(0.4, "#8080FF");
      gradient.addColorStop(1, "#80FF80");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, f.size, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let i = 0; i < 400; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const size = Math.random() * 40 + 10;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, "#FF8080");
      gradient.addColorStop(0.6, "#8080FF");
      gradient.addColorStop(1, "#8080CC");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const marsShader = useMemo(
    () => ({
      uniforms: {
        color: { value: new THREE.Color("#E85D3A") },
        intensity: { value: 0.85 },
      },
      vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform vec3 color;
      uniform float intensity;
      varying vec3 vNormal;
      void main() {
        float rim = 1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)));
        float fresnel = pow(rim, 3.5);
        gl_FragColor = vec4(color * fresnel * intensity, fresnel * intensity);
      }
    `,
    }),
    [],
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame((state, delta) => {
    if (!marsRef.current) return;

    marsRef.current.getWorldPosition(vecRef.current);
    vecRef.current.project(camera);
    const dx = pointerPos.current.x - vecRef.current.x;
    const dy = pointerPos.current.y - vecRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const isHovered = distance < 0.4;

    marsRef.current.rotation.y += delta * 0.15;
    marsRef.current.rotation.x += delta * 0.05;

    const targetScale = isHovered ? 1.12 : 1;
    marsRef.current.scale.setScalar(
      THREE.MathUtils.damp(marsRef.current.scale.x, targetScale, 4, delta),
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={marsRef} position={[8, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1.8, 64, 64]} />
          <meshStandardMaterial
            map={marsColorMap}
            normalMap={marsNormalMap}
            roughness={0.75}
            metalness={0}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial
            color="#8B4513"
            opacity={0.2}
            transparent
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2.4, 32, 32]} />
          <shaderMaterial
            args={[marsShader]}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SpineCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <CentralSpine />
          <Mars />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + projects.length * 200 + "%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isLeft = index % 2 === 0;
        const cardStartTime = index * 7;

        gsap.set(card, {
          x: isLeft ? "-40vw" : "40vw",
          y: "60vh",
          rotationX: 45,
          rotationY: isLeft ? 60 : -60,
          rotationZ: isLeft ? -15 : 15,
          scale: 0.1,
          opacity: 0,
          z: -1500,
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
        });

        tl.to(
          card,
          {
            x: "0vw",
            y: "0vh",
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1.1,
            opacity: 1,
            z: 0,
            ease: "power2.inOut",
            duration: 3,
          },
          cardStartTime,
        )
          .to(
            card,
            {
              scale: 1.2,
              z: 50,
              duration: 1,
              ease: "none",
            },
            ">0",
          )
          .to(
            card,
            {
              x: isLeft ? "50vw" : "-50vw",
              y: "-80vh",
              rotationX: -45,
              rotationY: isLeft ? -60 : 60,
              rotationZ: isLeft ? 20 : -20,
              scale: 3,
              opacity: 0,
              z: 1000,
              ease: "power2.in",
              duration: 2.5,
            },
            ">",
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative h-screen w-full bg-transparent overflow-hidden perspective-1000 flex items-center justify-center pt-32"
      >
        <SpineCanvas />

        <div className="absolute top-20 left-10 z-20 pointer-events-none">
          <h2 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#B200FF] tracking-tighter mix-blend-screen opacity-50">
            Selected
            <br />
            Work.
          </h2>
        </div>

        <div className="relative w-full h-full flex items-center justify-center z-10">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              onClick={() => window.open(project.github, "_blank")}
              className="absolute w-[550px] aspect-video rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-8 flex flex-col justify-between transform-style-3d hover:border-white/50 transition-colors duration-500 overflow-hidden group cursor-pointer hover:scale-105 hover:shadow-xl"
              style={{
                boxShadow: `0 0 60px ${project.color}20, inset 0 0 30px ${project.color}30`,
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs text-[#00F0FF] font-mono mb-2 tracking-[0.2em] uppercase">
                      {project.role}
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                  <div className="text-white/40 font-mono text-xl font-light">
                    {project.year}
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-white/80 text-sm leading-relaxed mb-6 font-light max-w-[90%]">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 border border-white/10 bg-white/5 rounded-full text-xs text-white/90 font-mono uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
