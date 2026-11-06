import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Volume2, VolumeX, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { isDiwaliSeason } from "../data/diwaliSchedule";

// Vibrant Festive Diwali Colors
const FESTIVE_COLORS = [
  "#FFD700", // Bright Gold
  "#FFA500", // Warm Amber
  "#FF4500", // Orange Red
  "#FF1493", // Deep Festive Pink
  "#00FFFF", // Electric Cyan
  "#7B68EE", // Royal Violet
  "#32CD32", // Emerald Spark
  "#FFFFFF", // Diamond White
  "#FFB6C1", // Soft Rose
  "#FFDAB9"  // Peach Shimmer
];

// Web Audio API cracker sound generator (Synthesized client-side, zero network dependencies)
class CrackerAudioSynth {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playLaunch() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== "running") return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.35);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio autoplay policy handled silently
    }
  }

  playBurst() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || this.ctx.state !== "running") return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(550, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.3);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.36);

      // Rapid crackle pops
      for (let j = 0; j < 4; j++) {
        const clickTime = now + 0.07 + j * 0.05 + Math.random() * 0.03;
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = "square";
        clickOsc.frequency.setValueAtTime(1100 + Math.random() * 700, clickTime);
        clickGain.gain.setValueAtTime(0.035, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, clickTime + 0.03);
        clickOsc.connect(clickGain);
        clickGain.connect(this.ctx.destination);
        clickOsc.start(clickTime);
        clickOsc.stop(clickTime + 0.032);
      }
    } catch {
      // Autoplay handled silently
    }
  }
}

/**
 * Internal celebration content component: active only during Diwali dates or when test mode is enabled.
 */
const DiwaliCelebrationContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  const canvasRef = useRef(null);
  const audioSynthRef = useRef(null);
  const animFrameRef = useRef(null);
  const rocketsRef = useRef([]);
  const particlesRef = useRef([]);
  const activeLaunchTimerRef = useRef(null);
  const isAutoLaunchingRef = useRef(true);

  // Initialize audio synthesizer instance
  useEffect(() => {
    audioSynthRef.current = new CrackerAudioSynth();
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (audioSynthRef.current) {
        audioSynthRef.current.isMuted = !next;
        if (next) audioSynthRef.current.init();
      }
      return next;
    });
  };

  // Launch a sky cracker rocket
  const launchRocket = useCallback((customX = null, targetColor = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const startX = customX !== null ? customX : width * 0.15 + Math.random() * (width * 0.7);
    const targetY = height * 0.12 + Math.random() * (height * 0.42);
    const speed = 13 + Math.random() * 5;
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.35;
    const color = targetColor || FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];

    rocketsRef.current.push({
      x: startX,
      y: height,
      vx: Math.cos(angle) * speed * 0.5,
      vy: Math.sin(angle) * speed,
      targetY,
      color,
      trail: [],
      type: Math.random() > 0.3 ? "standard" : "willow"
    });

    if (audioSynthRef.current && soundEnabled) {
      audioSynthRef.current.playLaunch();
    }
  }, [soundEnabled]);

  // Explode rocket into celebration particles
  const explodeRocket = useCallback((x, y, color, type) => {
    const particleCount = type === "willow" ? 65 : 55;
    const baseSpeed = type === "willow" ? 4.5 : 5.8;

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
      const speed = (0.5 + Math.random() * 0.9) * baseSpeed;
      const pColor = Math.random() > 0.25 ? color : FESTIVE_COLORS[Math.floor(Math.random() * FESTIVE_COLORS.length)];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: pColor,
        alpha: 1,
        decay: type === "willow" ? 0.012 + Math.random() * 0.008 : 0.016 + Math.random() * 0.012,
        gravity: type === "willow" ? 0.12 : 0.09,
        friction: 0.955,
        trail: [],
        flicker: Math.random() > 0.4
      });
    }

    if (audioSynthRef.current && soundEnabled) {
      audioSynthRef.current.playBurst();
    }
  }, [soundEnabled]);

  // Trigger extra bursts when clicking "Burst Crackers"
  const triggerUserBurst = () => {
    setBurstCount((c) => c + 1);

    if (audioSynthRef.current) {
      audioSynthRef.current.init();
    }

    // Launch multiple crackers simultaneously
    const canvas = canvasRef.current;
    if (canvas) {
      launchRocket(canvas.width * 0.25);
      setTimeout(() => launchRocket(canvas.width * 0.5), 120);
      setTimeout(() => launchRocket(canvas.width * 0.75), 240);
      setTimeout(() => launchRocket(canvas.width * 0.38), 380);
    }

    // Celebratory golden & colorful confetti blast
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6, x: 0.5 },
      colors: ["#FFD700", "#FF8C00", "#FF1493", "#00FFFF", "#FFFFFF"],
      shapes: ["star", "circle"],
      ticks: 200,
      scalar: 1.1
    });
  };

  // Setup Canvas and Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      animFrameRef.current = requestAnimationFrame(loop);

      // Soft clear with slight fade for dazzling particle trails
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      // 1. Render & Update Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();

        // Draw rocket tail
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Draw glowing rocket tip
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.05;

        // Explode condition
        if (r.y <= r.targetY || r.vy >= -1) {
          explodeRocket(r.x, r.y, r.color, r.type);
          rocketsRef.current.splice(i, 1);
        }
      }

      // 2. Render & Update Explosion Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();

        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const currentAlpha = p.flicker ? Math.max(0, p.alpha * (0.6 + Math.random() * 0.4)) : p.alpha;
        ctx.save();
        ctx.globalAlpha = currentAlpha;

        // Draw motion trail
        if (p.trail.length > 1) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Draw particle head
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Render Ground Anar (Flowerpot) Fountains during active show
      if (isAutoLaunchingRef.current) {
        const w = canvas.width;
        const anarPositions = [w * 0.08, w * 0.92];
        for (const ax of anarPositions) {
          for (let s = 0; s < 2; s++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.4;
            const spd = 7 + Math.random() * 7;
            particlesRef.current.push({
              x: ax + (Math.random() - 0.5) * 12,
              y: canvas.height - 4,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              color: Math.random() > 0.4 ? "#FFD700" : (Math.random() > 0.5 ? "#FFA500" : "#FFFFFF"),
              alpha: 0.95,
              decay: 0.024 + Math.random() * 0.018,
              gravity: 0.22,
              friction: 0.98,
              trail: [],
              flicker: true
            });
          }
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [explodeRocket]);

  // Primary Launch Sequence right after Landing Page is shown
  useEffect(() => {
    // Reveal Diwali modal & start celebration after a gentle delay of 400ms
    const startTimer = setTimeout(() => {
      setIsOpen(true);

      // Initial festive confetti blast from both sides
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 70,
        origin: { x: 0.05, y: 0.8 },
        colors: ["#FFD700", "#FF6347", "#FFA500", "#FF69B4", "#00FFFF"]
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 70,
        origin: { x: 0.95, y: 0.8 },
        colors: ["#FFD700", "#FF6347", "#FFA500", "#FF69B4", "#00FFFF"]
      });

      // Rapid initial burst of 3 rockets
      launchRocket();
      setTimeout(() => launchRocket(), 300);
      setTimeout(() => launchRocket(), 700);

      // Recurring cracker launches for "a while after landing page is shown" (approx 8 seconds)
      let count = 0;
      activeLaunchTimerRef.current = setInterval(() => {
        count++;
        launchRocket();
        if (Math.random() > 0.4) {
          setTimeout(() => launchRocket(), 250);
        }

        // Staggered mid-way confetti celebration
        if (count === 4 || count === 8) {
          confetti({
            particleCount: 60,
            spread: 90,
            origin: { y: 0.4, x: count === 4 ? 0.3 : 0.7 },
            colors: ["#FFD700", "#FFA500", "#FFFFFF", "#7B68EE"],
            shapes: ["star"]
          });
        }

        // After ~8 seconds (12 intervals of 650ms), gracefully stop continuous auto rockets
        if (count >= 12) {
          clearInterval(activeLaunchTimerRef.current);
          isAutoLaunchingRef.current = false;
        }
      }, 650);
    }, 400);

    return () => {
      clearTimeout(startTimer);
      if (activeLaunchTimerRef.current) clearInterval(activeLaunchTimerRef.current);
    };
  }, [launchRocket]);

  const handleClose = () => {
    setIsOpen(false);
    setMinimized(true);
  };

  const handleReopen = () => {
    setMinimized(false);
    setIsOpen(true);
    triggerUserBurst();
  };

  return (
    <>
      {/* 1. Full-screen Fireworks & Cracker Canvas (renders on top with pointer-events-none) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 z-50 pointer-events-none w-full h-full"
      />

      {/* 2. Diwali Wish Card Overlay by Vasakal Academy */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            {/* Celebratory Modal Card */}
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden p-6 sm:p-8 text-center text-white border border-amber-400/40 shadow-[0_0_60px_rgba(245,158,11,0.35)]"
              style={{
                background: "linear-gradient(135deg, #071530 0%, #0d2757 45%, #1c1335 100%)"
              }}
            >
              {/* Background Glows & Festive Ornaments */}
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-orange-600/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close & Sound Buttons Header */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  onClick={toggleSound}
                  title={soundEnabled ? "Mute Cracker Sounds" : "Enable Cracker Sounds"}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-amber-200 transition-colors duration-200 cursor-pointer"
                  aria-label="Toggle sound"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-white/50" />}
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                  aria-label="Close Diwali Greeting"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Festive Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>शुभ दीपावली • FESTIVAL OF LIGHTS</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              </div>

              {/* Animated Diya Lamp Presentation */}
              <div className="flex items-center justify-center gap-4 mb-3">
                {/* Left Diya */}
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.25, 0.95, 1.15, 1], opacity: [0.85, 1, 0.9, 1, 0.85] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="w-3.5 h-4.5 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full blur-[1px] shadow-[0_0_12px_#ffbf00]"
                  />
                  <div className="w-8 h-3.5 bg-gradient-to-b from-amber-600 to-amber-900 rounded-b-full border-t border-yellow-300/60 shadow-md" />
                </div>

                {/* Academy Logo Emblem */}
                <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-[0_0_25px_rgba(255,215,0,0.4)] border border-amber-300 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <img
                    src="/logo.png"
                    alt="Vasakal Academy"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right Diya */}
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1.3, 0.95, 1], opacity: [0.9, 1, 0.85, 1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut", delay: 0.3 }}
                    className="w-3.5 h-4.5 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full blur-[1px] shadow-[0_0_12px_#ffbf00]"
                  />
                  <div className="w-8 h-3.5 bg-gradient-to-b from-amber-600 to-amber-900 rounded-b-full border-t border-yellow-300/60 shadow-md" />
                </div>
              </div>

              {/* Happy Diwali Grand Heading */}
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide mb-1 font-heading">
                <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,215,0,0.5)]">
                  Happy Diwali!
                </span>
              </h2>

              {/* Wishing Signature by Vasakal Academy */}
              <p className="text-sm font-semibold tracking-wide text-amber-200/90 mb-4 uppercase">
                Warm Wishes From <span className="text-white font-bold underline decoration-amber-400 underline-offset-4">VASAKAL ACADEMY</span>
              </p>

              {/* Heartfelt Blessing Text */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 max-w-md mx-auto font-sans">
                May the divine festival of lights illuminate your path with wisdom, spark your innate genius, and turn your highest academic and career aspirations into golden achievers! ✨
              </p>

              {/* Slogan Pill */}
              <div className="text-xs text-amber-300/90 italic font-medium mb-6">
                “Turning Aspirants into Achievers”
              </div>

              {/* Interactive Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerUserBurst}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-slate-950 fill-current" />
                  <span>Burst Crackers! 🎆 {burstCount > 0 ? `(${burstCount})` : ""}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-all cursor-pointer"
                >
                  Explore Academy
                </motion.button>
              </div>

              {/* Micro info on sound & interaction */}
              <div className="mt-4 text-[11px] text-slate-400 flex items-center justify-center gap-3">
                <span>🪔 Click button to burst more fireworks</span>
                <span>•</span>
                <button
                  onClick={toggleSound}
                  className="text-amber-300 hover:underline cursor-pointer flex items-center gap-1"
                >
                  {soundEnabled ? "🔊 Sound On" : "🔇 Sound Off (Click to unmute)"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Floating Diwali Greeting Pill (shown when modal is dismissed/minimized) */}
      <AnimatePresence>
        {minimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.85 }}
            className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReopen}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#071A3D] via-[#0d2857] to-[#12366B] text-white border border-amber-400/50 shadow-[0_4px_25px_rgba(245,158,11,0.35)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.55)] cursor-pointer transition-all group"
            >
              {/* Glowing Mini Diya */}
              <span className="relative flex items-center justify-center w-6 h-6">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-40" />
                <span className="text-base">🪔</span>
              </span>

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-amber-300 group-hover:text-amber-200">
                  Happy Diwali! ✨
                </span>
                <span className="text-[10px] text-blue-200/80 -mt-0.5">
                  Vasakal Academy • Burst Crackers
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/**
 * Main DiwaliCelebration component.
 * Strictly checks if today is Diwali or the day before Diwali.
 * Returns null if not in season, consuming zero CPU/DOM resources.
 */
export const DiwaliCelebration = () => {
  const [isActive] = useState(() => isDiwaliSeason());

  useEffect(() => {
    if (typeof window !== "undefined" && import.meta.env?.DEV) {
      if (!isActive) {
        console.info(
          "[Vasakal Academy] Diwali celebration is scheduled strictly for Diwali & the day before. To preview at any time, append '?diwali=true' to the URL."
        );
      } else {
        console.info("[Vasakal Academy] Diwali celebration is currently ACTIVE!");
      }
    }
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return <DiwaliCelebrationContent />;
};
