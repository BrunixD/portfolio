'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/HeroBanner.module.css';

// Correct imports from the new scoped packages
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // or loadFull, if you want more features

export default function HeroBanner() {
  const [init, setInit] = useState(false);
  const heroRef = useRef(null);
  const layer1Ref = useRef(null); // Stars far away
  const layer2Ref = useRef(null); // Closer elements (e.g., a planet)

  // This useEffect initializes the tsParticles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // The key is loading the preset bundle here. `loadSlim` is a lightweight bundle.
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = heroRef.current;
      const xPos = (clientX / offsetWidth - 0.5) * 40; // Intensity multiplier
      const yPos = (clientY / offsetHeight - 0.5) * 40;
      
      gsap.to(layer1Ref.current, { x: -xPos / 2, y: -yPos / 2, duration: 0.5, ease: 'power1.out' });
      gsap.to(layer2Ref.current, { x: -xPos, y: -yPos, duration: 0.5, ease: 'power1.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Typed.js style animation for the title
  useEffect(() => {
    // We only animate once the component is mounted and ready
    gsap.fromTo(`.${styles.holographicText} .char`, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, // Each character animates 0.05s after the previous one
        duration: 0.5,
        ease: 'power2.out'
      }
    );
  }, []);

  
  // Particle options
  const particlesOptions = useMemo(() => ({
      background: { color: { value: '#0a0e1c' } },
    fpsLimit: 120,
    particles: {
      number: { value: 150, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 1, random: true },
      move: {
        enable: true,
        speed: 0.2,
        direction: 'none',
        out_mode: 'out',
      },
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: 'bubble' },
      },
      modes: {
        bubble: { distance: 200, size: 3, duration: 2, opacity: 1 },
      },
    },
    detectRetina: true,
  }), []);
  
  // Split the title into characters for the animation
  const title = "Alex Doe".split("").map((char, index) => (
    <span key={index} className={styles.char}>{char === ' ' ? '\u00A0' : char}</span>
  ));

  if (!init) {
    return null; // Don't render anything until the particles engine is ready
  }

  return (
    <section ref={heroRef} className={styles.heroContainer}>
      <Particles id="tsparticles" options={particlesOptions} />
      
      {/* Ensure you have these images in your `public` folder */}
      <div ref={layer1Ref} className={`${styles.parallaxLayer} ${styles.layer1}`}></div>
      <div ref={layer2Ref} className={`${styles.parallaxLayer} ${styles.layer2}`}></div>
      
      <div className={styles.heroContent}>
        <h1 className={styles.holographicText}>{title}</h1>
        <p>Creative Developer & Interstellar Navigator</p>
        <a href="#projects" className={styles.ctaButton}>Begin Exploration</a>
      </div>
    </section>
  );
}