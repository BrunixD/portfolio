'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/AboutSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elementsToAnimate = sectionRef.current.children;

    gsap.fromTo(elementsToAnimate, 
      { opacity: 0, y: 50 }, // Start from invisible and 50px down
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2, // Animate each child 0.2s after the previous one
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // Start animation when the top of the section is 80% from the top of the viewport
          toggleActions: 'play none none none', // Play the animation once
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.aboutContainer}>
      <div className={styles.logEntry}>
        <h2 className={`holographic-title ${styles.logTitle}`}>Captain's Log, Stardate 2025</h2>
        <p>
          After years of navigating the vast cosmos of technology, I’ve charted my own course as a Fullstack Engineer with over 2.5 years of professional experience. My mission: to create intuitive, high-performing digital systems that feel as seamless as space travel itself.
        </p>
        <p>
          I’m passionate about crafting fluid user experiences and architecting scalable fullstack solutions that balance design precision with backend strength. Whether I’m navigating the front-end nebulae with React and Next.js or fueling backend propulsion through Laravel, Node.js, or Django, I see every challenge as a new constellation to map.
        </p>
         <p>
          Each project I undertake adds a new star to my professional galaxy — a testament to curiosity, growth, and creativity. Technology isn’t just my craft; it’s my universe, where every line of code pushes the frontier of what’s possible.
        </p>
      </div>
      <div className={styles.crewIdCard}>
        <Image 
          src="/profile-pic.jpg" 
          alt="Bruno Carvalho, Mission Commander"
          width={180}
          height={250}
          className={styles.crewPhoto}
        />
        <div className={styles.idDetails}>
          <h3>Bruno Carvalho</h3>
          <p>Mission Commander / Full-Stack Developer</p>
        </div>
      </div>
    </section>
  );
}