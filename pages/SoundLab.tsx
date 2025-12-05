import React, { useState, useEffect, useRef } from 'react';
import { WaveType, Language } from '../types';
import { ACOUSTIC_FORMULAS, TRANSLATIONS } from '../constants';
import { Play, Square, Activity, Volume2, Settings, Calculator, Waves, Wind, CircleDot, ArrowRightLeft, Sliders, Ear } from 'lucide-react';
import { motion as m, useMotionValue, animate } from 'framer-motion';
// @ts-ignore
import katex from 'katex';

const motion = m as any;

interface SoundLabProps {
  lang: Language;
}

const WAVE_COLORS = {
  sine: '#38bdf8',    // Sky Blue
  square: '#f472b6',  // Pink
  triangle: '#4ade80',// Green
  sawtooth: '#facc15' // Yellow
};

type VisualizerMode = 'scope' | 'particles' | 'ripple';

export const SoundLab: React.FC<SoundLabProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440);
  const [waveform, setWaveform] = useState<WaveType>('sine');
  const [volume, setVolume] = useState(0.5);
  const [visMode, setVisMode] = useState<VisualizerMode>('scope');

  // --- Propagation Simulation State ---
  const [propFreq, setPropFreq] = useState(2); // Low freq for visual clarity
  const [impedanceRatio, setImpedanceRatio] = useState(2.0); // Z2 / Z1
  const propCanvasRef = useRef<HTMLCanvasElement>(null);
  const propAnimationRef = useRef<number>(0);

  // --- dB Weighting State ---
  const [showA, setShowA] = useState(true);
  const [showC, setShowC] = useState(false);
  const [showZ, setShowZ] = useState(false);
  const [showD, setShowD] = useState(false);
  const weightingCanvasRef = useRef<HTMLCanvasElement>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  // Refs to hold current values for animation loops to avoid stale closures
  const frequencyRef = useRef(frequency);
  const volumeRef = useRef(volume);

  // Sync refs with state
  useEffect(() => {
    frequencyRef.current = frequency;
  }, [frequency]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  
  // Motion values for smooth canvas animations
  const strokeColorMv = useMotionValue(WAVE_COLORS.sine);
  
  const t = TRANSLATIONS[lang];

  // Initialize Audio Context
  useEffect(() => {
    return () => {
        stopSound();
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (propAnimationRef.current) {
          cancelAnimationFrame(propAnimationRef.current);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate stroke color when waveform changes
  useEffect(() => {
    animate(strokeColorMv, WAVE_COLORS[waveform], { duration: 0.8, ease: "easeInOut" });
  }, [waveform, strokeColorMv]);

  // Start Propagation Loop on Mount
  useEffect(() => {
    drawPropagation();
    return () => {
      if (propAnimationRef.current) cancelAnimationFrame(propAnimationRef.current);
    };
  }, [propFreq, impedanceRatio]); 

  // Draw Weighting Graph when toggles change
  useEffect(() => {
    drawWeightingGraph();
  }, [showA, showC, showZ, showD]);

  const startSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    
    // Create nodes
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const analyser = ctx.createAnalyser();

    // Configure nodes
    oscillator.type = waveform;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    analyser.fftSize = 2048;

    // Connect graph
    oscillator.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    // Store refs
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    analyserRef.current = analyser;

    oscillator.start();
    setIsPlaying(true);
    triggerVisualizerLoop();
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  // Update params in real-time
  useEffect(() => {
    if (oscillatorRef.current) {
      oscillatorRef.current.type = waveform;
      oscillatorRef.current.frequency.setTargetAtTime(frequency, audioContextRef.current!.currentTime, 0.1);
    }
  }, [frequency, waveform]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume, audioContextRef.current!.currentTime, 0.1);
    }
  }, [volume]);

  // Restart visualizer when mode changes
  useEffect(() => {
    if (isPlaying) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        triggerVisualizerLoop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visMode]);

  const triggerVisualizerLoop = () => {
      if (visMode === 'scope') drawScope();
      else if (visMode === 'particles') drawParticles();
      else if (visMode === 'ripple') drawRipple();
  }

  // --- VISUALIZERS (Audio) ---

  const drawScope = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      // Clear with trail effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; 
      if (document.documentElement.classList.contains('dark')) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentFreq = frequencyRef.current;
      const normalizedFreq = Math.min(Math.max(currentFreq, 20), 2000);
      const dynamicWidth = 4 - (normalizedFreq / 2000) * 2;
      
      ctx.lineWidth = dynamicWidth;
      ctx.strokeStyle = strokeColorMv.get();
      ctx.beginPath();

      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
  };

  const drawParticles = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cols = 40;
    const rows = 15;
    const spacingX = canvas.width / cols;
    const spacingY = canvas.height / rows;
    
    let time = 0;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      time += 0.05;

      const currentFreq = frequencyRef.current;
      const currentVol = volumeRef.current;

      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = strokeColorMv.get();
      const amplitude = currentVol * 20; 

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const originalX = i * spacingX + spacingX/2;
            const originalY = j * spacingY + spacingY/2;
            const phase = (i * 0.5) * (440 / currentFreq); 
            const displacement = Math.sin(phase - time * (currentFreq / 100)) * amplitude;

            ctx.beginPath();
            ctx.arc(originalX + displacement, originalY, 2, 0, Math.PI * 2);
            ctx.fill();
        }
      }
    };
    draw();
  };

  const drawRipple = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      time += 1;

      const currentFreq = frequencyRef.current;
      const currentVol = volumeRef.current;

      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = strokeColorMv.get();
      ctx.lineWidth = 2;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const wavelength = 50000 / currentFreq;

      for (let i = 0; i < 20; i++) {
        const maxRadius = Math.max(canvas.width, canvas.height);
        let radius = (time * 2 + i * wavelength) % maxRadius;
        const opacity = 1 - (radius / (maxRadius * 0.6));
        
        if (opacity > 0) {
            ctx.globalAlpha = opacity * currentVol;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
      }
      ctx.globalAlpha = 1.0;
    };
    draw();
  };

  // --- PHYSICS SIMULATION (Reflection/Transmission) ---
  const drawPropagation = () => {
    if (!propCanvasRef.current) return;
    const canvas = propCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    
    // Physics Logic (3 Mediums: M1 -> M2 -> M3)
    // M1 = Z1 (normalized 1)
    // M2 = Z2 (impedanceRatio)
    // M3 = Z1 (normalized 1)
    
    // Pressure Reflection Coefficient at Boundary 1 (M1->M2)
    const r1 = (impedanceRatio - 1) / (impedanceRatio + 1);
    const t1 = 2 * impedanceRatio / (impedanceRatio + 1); // Pressure transmission M1->M2
    
    // Pressure Reflection/Transmission at Boundary 2 (M2->M3)
    // r2 = (Z3 - Z2) / (Z3 + Z2) = (1 - Z2) / (1 + Z2) = -r1
    const r2 = -r1;
    const t2 = 2 * 1 / (1 + impedanceRatio); // Pressure transmission M2->M3

    const draw = () => {
      if (propAnimationRef.current) cancelAnimationFrame(propAnimationRef.current);
      propAnimationRef.current = requestAnimationFrame(draw);
      time += 0.1;

      const width = canvas.width;
      const height = canvas.height;
      const amplitude = 40;
      
      const bound1 = width * 0.33;
      const bound2 = width * 0.66;

      // Clear
      ctx.clearRect(0,0, width, height);
      
      // Draw Mediums
      // M1
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1e293b' : '#f8fafc';
      ctx.fillRect(0, 0, bound1, height);
      
      // M2 (Darker = Higher Impedance)
      const zOpacity = Math.min(impedanceRatio * 0.3, 0.9);
      ctx.fillStyle = document.documentElement.classList.contains('dark') 
          ? `rgba(148, 163, 184, ${zOpacity})` 
          : `rgba(203, 213, 225, ${zOpacity})`;
      ctx.fillRect(bound1, 0, bound2 - bound1, height);

      // M3 (Same as M1)
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#1e293b' : '#f8fafc';
      ctx.fillRect(bound2, 0, width - bound2, height);

      // Draw Boundary Lines
      ctx.strokeStyle = '#d4af37'; // Accent
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      ctx.moveTo(bound1, 0);
      ctx.lineTo(bound1, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bound2, 0);
      ctx.lineTo(bound2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Center Axis
      ctx.beginPath();
      ctx.moveTo(0, height/2);
      ctx.lineTo(width, height/2);
      ctx.strokeStyle = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
      ctx.stroke();

      // Draw Waves
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#d4af37'; 
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        let y = 0;
        
        // Phase shift logic for animation
        const ph = x * 0.05 * propFreq - time;

        if (x < bound1) {
          // MEDIUM 1: Incident + Reflected
          const yInc = Math.sin(ph);
          const yRef = r1 * Math.sin(-(x * 0.05 * propFreq) - time); // simplified phase for reflection
          y = yInc + yRef;
        } else if (x < bound2) {
           // MEDIUM 2: Transmitted (simplified travelling wave)
           // For accurate simulation we would sum infinite reflections, 
           // here we show the primary transmitted component for clarity.
           y = t1 * Math.sin(ph); 
        } else {
           // MEDIUM 3: Transmitted out
           // Total transmission coeff T_total = t1 * t2
           y = (t1 * t2) * Math.sin(ph);
        }

        ctx.lineTo(x, height/2 + y * amplitude);
      }
      ctx.stroke();
    };
    draw();
  };

  // --- WEIGHTING GRAPH LOGIC ---
  const calculateAWeighting = (f: number) => {
    const f2 = f * f;
    const num = Math.pow(12194, 2) * Math.pow(f, 4);
    const den = (f2 + Math.pow(20.6, 2)) * Math.sqrt((f2 + Math.pow(107.7, 2)) * (f2 + Math.pow(737.9, 2))) * (f2 + Math.pow(12194, 2));
    const R_A = num / den;
    return 20 * Math.log10(R_A) + 2.00;
  };

  const calculateCWeighting = (f: number) => {
    const f2 = f * f;
    const num = Math.pow(12194, 2) * f2;
    const den = (f2 + Math.pow(20.6, 2)) * (f2 + Math.pow(12194, 2));
    const R_C = num / den;
    return 20 * Math.log10(R_C) + 0.06;
  };

  const calculateDWeighting = (f: number) => {
    const f2 = f * f;
    // D-weighting formula approximation
    const h_f = ((Math.pow(1037918.48 - f2, 2) + 1080768.16 * f2) / (Math.pow(9837328 - f2, 2) + 11723776 * f2));
    const num = f * Math.sqrt(h_f);
    const den = 6.8966888496476e-5 * Math.sqrt((f2 + 79919.29) * (f2 + 1345600));
    const R_D = num / den;
    return 20 * Math.log10(R_D);
  }

  const drawWeightingGraph = () => {
    if (!weightingCanvasRef.current) return;
    const canvas = weightingCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Grid Parameters
    const minFreq = 10;
    const maxFreq = 10000;
    const minDB = -60; // Changed from -50
    const maxDB = 20;
    
    // Helper to map coordinates
    // Log X scale for Frequency
    const getX = (f: number) => {
      const minLog = Math.log10(minFreq);
      const maxLog = Math.log10(maxFreq);
      return ((Math.log10(f) - minLog) / (maxLog - minLog)) * width;
    };
    
    // Linear Y scale for dB
    const getY = (db: number) => {
      return height - ((db - minDB) / (maxDB - minDB)) * height;
    };

    // Draw Grid & Labels
    ctx.strokeStyle = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#94a3b8' : '#64748b';
    ctx.font = '10px Inter';
    ctx.lineWidth = 1;

    // Freq Lines (10, 100, 1k, 10k)
    [10, 100, 1000, 10000].forEach(f => {
       const x = getX(f);
       ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
       
       // Handle edge case for last label to prevent it going off screen
       if (f === maxFreq) {
           ctx.textAlign = 'right';
           ctx.fillText(`${f >= 1000 ? f/1000 + 'k' : f}Hz`, x - 5, height - 10);
           ctx.textAlign = 'left'; // Reset
       } else {
           ctx.textAlign = 'left';
           ctx.fillText(`${f >= 1000 ? f/1000 + 'k' : f}Hz`, x + 5, height - 10);
       }
    });

    // dB Lines
    [-60, -40, -20, 0, 20].forEach(db => {
       const y = getY(db);
       ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
       ctx.fillText(`${db}dB`, 10, y - 5);
    });

    // Zero Line emphasis
    const zeroY = getY(0);
    ctx.strokeStyle = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.moveTo(0, zeroY); ctx.lineTo(width, zeroY); ctx.stroke();

    // Draw Curves
    const plotCurve = (color: string, calcFn: (f: number) => number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        // Reverse map X to Freq
        const minLog = Math.log10(minFreq);
        const maxLog = Math.log10(maxFreq);
        const logF = (x / width) * (maxLog - minLog) + minLog;
        const f = Math.pow(10, logF);
        
        const db = calcFn(f);
        // Clamp for drawing nicely
        const y = getY(db);
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    if (showA) plotCurve('#d4af37', calculateAWeighting); // Gold for A
    if (showC) plotCurve('#38bdf8', calculateCWeighting); // Blue for C
    if (showD) plotCurve('#a78bfa', calculateDWeighting); // Violet for D
    if (showZ) plotCurve('#f472b6', () => 0);             // Pink for Z
  };
  
  // Calculate Intensity Coefficients for Display
  const r_pressure = (impedanceRatio - 1) / (impedanceRatio + 1);
  // Intensity Reflection Coefficient R = r^2
  const R_int = Math.pow(r_pressure, 2);
  // Intensity Transmission Coefficient T = 1 - R (Conservation of Energy)
  const T_int = 1 - R_int;


  return (
    <div className="min-h-screen pt-32 pb-12 px-4 relative flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl z-10 space-y-12"
      >
        {/* SECTION 1: SIGNAL GENERATOR */}
        <div className="bg-white dark:bg-slate-800 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-serif font-bold flex items-center gap-2 dark:text-white">
              <Activity className="text-accent" />
              {t.headings.sound}
            </h2>
            
            {/* Mode Toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-sm">
                {[
                    { id: 'scope', icon: Waves, label: 'Scope' },
                    { id: 'particles', icon: Wind, label: 'Pressure' },
                    { id: 'ripple', icon: CircleDot, label: 'Propagate' }
                ].map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setVisMode(mode.id as VisualizerMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all ${
                            visMode === mode.id 
                            ? 'bg-white dark:bg-slate-700 text-accent shadow-sm' 
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                    >
                        <mode.icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{mode.label}</span>
                    </button>
                ))}
            </div>

            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          </div>

          {/* Visualizer Canvas */}
          <motion.div 
            animate={{
              boxShadow: isPlaying && visMode === 'scope' ? `inset 0 0 ${volume * 50}px ${strokeColorMv.get()}40` : 'inset 0 0 0px rgba(0,0,0,0)',
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
            className="relative h-72 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors"
          >
             <canvas 
                ref={canvasRef} 
                width={800} 
                height={288} 
                className="w-full h-full object-cover"
             />
             {!isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                 <p className="font-serif italic opacity-70">{t.ui.startOsc}</p>
               </div>
             )}
          </motion.div>

          {/* Controls */}
          <div className="p-8 space-y-8">
            <p className="text-center text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-2 rounded-sm mb-4">
               Warning: High volumes may be unpleasant. Adjust carefully.
            </p>

            {/* Play Button */}
            <div className="flex justify-center">
              <button
                onClick={togglePlay}
                className={`w-16 h-16 flex items-center justify-center transition-all transform hover:scale-105 shadow-lg border-2 ${
                  isPlaying 
                    ? 'bg-transparent border-red-500 text-red-500 hover:bg-red-500 hover:text-white' 
                    : 'bg-transparent border-accent text-accent hover:bg-accent hover:text-white'
                }`}
              >
                {isPlaying ? <Square className="w-6 h-6 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Frequency */}
              <div className="space-y-4">
                <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
                  <span className="uppercase tracking-widest text-xs">Frequency (Pitch)</span>
                  <span className="font-mono text-accent">{frequency} Hz</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="1000"
                  step="1"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
                  <span>Low (Bass)</span>
                  <span>High (Treble)</span>
                </div>
              </div>

              {/* Volume */}
              <div className="space-y-4">
                <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-2 uppercase tracking-widest text-xs"><Volume2 className="w-4 h-4"/> Amplitude (Volume)</span>
                  <span className="font-mono text-accent">{Math.round(volume * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-accent"
                />
              </div>
            </div>

            {/* Waveform Select */}
            <div className="space-y-3 pt-4">
              <label className="text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Settings className="w-3 h-3"/> Waveform Type (Timbre)
              </label>
              <div className="flex bg-slate-100 dark:bg-slate-900 p-1">
                {(['sine', 'square', 'triangle', 'sawtooth'] as WaveType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setWaveform(type)}
                    className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider transition-all border ${
                      waveform === type 
                        ? 'bg-white dark:bg-slate-800 text-accent border-slate-200 dark:border-slate-700 shadow-sm' 
                        : 'text-slate-500 dark:text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: REFLECTION & TRANSMISSION */}
        <div className="bg-white dark:bg-slate-800 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
             <h3 className="text-xl font-serif font-bold flex items-center gap-2 dark:text-white">
               <ArrowRightLeft className="text-accent" />
               Reflection & Transmission
             </h3>
             <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">
               Acoustic impedance mismatch simulation (3 Mediums)
             </p>
          </div>

          <div className="relative h-64 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <canvas 
               ref={propCanvasRef} 
               width={800} 
               height={256} 
               className="w-full h-full object-cover"
            />
            {/* Labels overlay */}
            <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Med 1 (Z₁)</div>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Med 2 (Z₂)<br/><span className="text-accent">Z = {impedanceRatio.toFixed(1)}</span></div>
            <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Med 3 (Z₁)</div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
             {/* Frequency Control */}
             <div className="space-y-4">
                <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-2 uppercase tracking-widest text-xs"><Sliders className="w-4 h-4"/> Wave Frequency</span>
                  <span className="font-mono text-accent">{propFreq} Hz</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={propFreq}
                  onChange={(e) => setPropFreq(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-accent"
                />
             </div>

             {/* Impedance Ratio Control */}
             <div className="space-y-4">
                <label className="flex justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-2 uppercase tracking-widest text-xs"><Wind className="w-4 h-4"/> Medium 2 Impedance (Z₂)</span>
                  <span className="font-mono text-accent">Ratio: {impedanceRatio}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={impedanceRatio}
                  onChange={(e) => setImpedanceRatio(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-700 appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
                  <span>Free (Soft)</span>
                  <span>Matched (Z₁=Z₂)</span>
                  <span>Fixed (Hard)</span>
                </div>
             </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-black/20 p-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row gap-8">
             <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Reflected Intensity (R):</span>
                <span className="font-mono ml-2 text-accent">{R_int.toFixed(2)}</span>
                <p className="mt-1 opacity-70">Energy reflected at first boundary.</p>
             </div>
             <div>
                <span className="font-bold text-slate-700 dark:text-slate-300">Transmitted Intensity (T):</span>
                <span className="font-mono ml-2 text-accent">{T_int.toFixed(2)}</span>
                <p className="mt-1 opacity-70">Energy transmitted into slab (sums to 1).</p>
             </div>
          </div>
        </div>

        {/* SECTION 3: dB WEIGHTING FILTERS */}
        <div className="bg-white dark:bg-slate-800 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-serif font-bold flex items-center gap-2 dark:text-white">
                <Ear className="text-accent" />
                dB Weighting Filters
              </h3>
              <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">
                Frequency Response of A, C, Z, and D weightings
              </p>
            </div>
            
            {/* Legend / Toggles */}
            <div className="flex gap-4 flex-wrap">
               <button 
                 onClick={() => setShowA(!showA)}
                 className={`flex items-center gap-2 text-xs font-bold tracking-widest transition-colors ${showA ? 'text-accent' : 'text-slate-400'}`}
               >
                 <div className={`w-3 h-3 rounded-full border ${showA ? 'bg-accent border-accent' : 'bg-transparent border-slate-400'}`} />
                 dBA (Ear)
               </button>
               <button 
                 onClick={() => setShowC(!showC)}
                 className={`flex items-center gap-2 text-xs font-bold tracking-widest transition-colors ${showC ? 'text-sky-400' : 'text-slate-400'}`}
               >
                 <div className={`w-3 h-3 rounded-full border ${showC ? 'bg-sky-400 border-sky-400' : 'bg-transparent border-slate-400'}`} />
                 dBC (Peak)
               </button>
               <button 
                 onClick={() => setShowD(!showD)}
                 className={`flex items-center gap-2 text-xs font-bold tracking-widest transition-colors ${showD ? 'text-violet-400' : 'text-slate-400'}`}
               >
                 <div className={`w-3 h-3 rounded-full border ${showD ? 'bg-violet-400 border-violet-400' : 'bg-transparent border-slate-400'}`} />
                 dBD (Air)
               </button>
               <button 
                 onClick={() => setShowZ(!showZ)}
                 className={`flex items-center gap-2 text-xs font-bold tracking-widest transition-colors ${showZ ? 'text-pink-400' : 'text-slate-400'}`}
               >
                 <div className={`w-3 h-3 rounded-full border ${showZ ? 'bg-pink-400 border-pink-400' : 'bg-transparent border-slate-400'}`} />
                 dBZ (Flat)
               </button>
            </div>
          </div>

          <div className="relative h-72 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
            <canvas 
              ref={weightingCanvasRef} 
              width={800} 
              height={288} 
              className="w-full h-full"
            />
          </div>
          
          <div className="p-6 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div>
               <strong className="text-accent text-sm">dBA (A-Weighting)</strong>
               <p className="mt-1 leading-relaxed">Mimics human ear sensitivity. Filters out low frequencies significantly. Used for environmental noise, OHS.</p>
             </div>
             <div>
               <strong className="text-sky-400 text-sm">dBC (C-Weighting)</strong>
               <p className="mt-1 leading-relaxed">Flatter response. Retains more low frequency energy. Used for peak noise levels and machinery.</p>
             </div>
             <div>
               <strong className="text-violet-400 text-sm">dBD (D-Weighting)</strong>
               <p className="mt-1 leading-relaxed">Designed for high-level aircraft noise. Emphasizes frequencies around 2–10 kHz.</p>
             </div>
             <div>
               <strong className="text-pink-400 text-sm">dBZ (Z-Weighting)</strong>
               <p className="mt-1 leading-relaxed">Zero weighting (Flat). No filtering applied between 10Hz and 20kHz. Used for scientific analysis.</p>
             </div>
          </div>
        </div>
        
        {/* Formulas Section */}
        <div className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-serif font-bold flex items-center gap-2 dark:text-white">
              <Calculator className="w-5 h-5 text-accent" />
              Physics Formulas
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACOUSTIC_FORMULAS.map((item, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800 hover:border-accent transition-colors group">
                 <h4 className="font-serif font-bold text-slate-900 dark:text-white mb-4 group-hover:text-accent transition-colors">{item.name}</h4>
                 <div 
                   className="text-lg font-mono text-slate-800 dark:text-slate-200 mb-4 bg-white dark:bg-black/20 p-3 text-center border border-slate-100 dark:border-white/5"
                   dangerouslySetInnerHTML={{ __html: katex.renderToString(item.formula, { throwOnError: false }) }}
                 />
                 <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
};