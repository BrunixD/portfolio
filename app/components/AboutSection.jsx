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
        <h2 className={styles.logTitle}>Captain's Log</h2>
        <p>
          Stardate 77895.2. After navigating the nebulas of client-side frameworks and the asteroid fields of asynchronous JavaScript, my mission remains clear: to explore strange new web technologies, to seek out new life in user experiences, and to boldly code what no one has coded before.
        </p>
        <p>
          With a passion for clean, efficient code and a love for creating beautiful, intuitive interfaces, I steer projects from concept to deployment. My primary vessel is the starship 'React', powered by a Next.js warp core, but I'm fluent in many galactic tongues including Python, SQL, and CSS.
        </p>
      </div>
      <div className={styles.crewIdCard}>
        <Image 
          src="/profile-pic.jpg" 
          alt="Bruno Carvalho, Mission Commander"
          width={250}
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