import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'spark' | 'jamara';
  color: string;
  opacity: number;
}

interface MarigoldCanvasProps {
  burstTrigger?: number;
}

export const MarigoldCanvas: React.FC<MarigoldCanvasProps> = ({ burstTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = ['#f59e0b', '#fbbf24', '#f97316', '#ea580c', '#d97706'];
    const sparkColors = ['#fef08a', '#fde047', '#fed7aa', '#ffffff'];

    // Initialize ambient particles
    const particleCount = Math.min(36, Math.floor(width / 35));
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      const isSpark = Math.random() > 0.65;
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isSpark ? Math.random() * 2.5 + 1 : Math.random() * 8 + 6,
        speedY: isSpark ? -(Math.random() * 0.6 + 0.2) : Math.random() * 0.8 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        type: isSpark ? 'spark' : 'petal',
        color: isSpark ? sparkColors[Math.floor(Math.random() * sparkColors.length)] : petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    const drawPetal = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      // Draw stylized marigold petal tear/oval
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
      ctx.fill();

      // Subtle center vein
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const drawSpark = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#fbbf24';

      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.size) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.type === 'spark') {
          // Sparks rise gently
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          drawSpark(ctx, p);
        } else {
          // Petals float down gently
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          drawPetal(ctx, p);
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Handle sudden celebratory burst trigger
  useEffect(() => {
    if (!burstTrigger || !canvasRef.current) return;
    const width = canvasRef.current.width;
    const petalColors = ['#f59e0b', '#fbbf24', '#f97316', '#ea580c', '#e11d48'];

    // Spawn 25 extra cascading celebratory flower petals
    for (let i = 0; i < 25; i++) {
      particlesRef.current.push({
        x: width * 0.5 + (Math.random() - 0.5) * (width * 0.6),
        y: Math.random() * -60 - 10,
        size: Math.random() * 9 + 6,
        speedY: Math.random() * 2.2 + 1.2,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.06,
        type: 'petal',
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.6
      });
    }

    // Trim array if too many
    if (particlesRef.current.length > 80) {
      particlesRef.current = particlesRef.current.slice(-60);
    }
  }, [burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.85 }}
    />
  );
};
