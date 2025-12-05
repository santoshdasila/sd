import React, { useRef, useEffect } from 'react';

export const WaveBackground: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Vibrant waves configuration
    const waves = [
      { y: height * 0.5, length: 0.01, amplitude: 50, frequency: 0.01, color: 'rgba(14, 165, 233, 0.1)' }, // Sky Blue
      { y: height * 0.5, length: 0.02, amplitude: 30, frequency: 0.02, color: 'rgba(139, 92, 246, 0.1)' }, // Violet
      { y: height * 0.5, length: 0.005, amplitude: 70, frequency: 0.005, color: 'rgba(20, 184, 166, 0.1)' }, // Teal
    
    ];

    let increment = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave, i) => {
        ctx.beginPath();
        // Adjust amplitude based on intensity prop (e.g. for Sound Lab)
        const currentAmp = wave.amplitude * intensity;
        
        ctx.moveTo(0, wave.y);

        for (let x = 0; x < width; x++) {
          ctx.lineTo(
            x,
            wave.y + Math.sin(x * wave.length + increment * (i + 1) * 0.2) * currentAmp * Math.sin(increment * 0.5)
          );
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2; 
        ctx.stroke();
      });

      increment += 0.02; 
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};