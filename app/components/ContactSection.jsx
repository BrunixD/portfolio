'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elementsToAnimate = sectionRef.current.querySelectorAll(`.${styles.animateIn}`);
    
    gsap.fromTo(elementsToAnimate,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="contact" className={styles.contactContainer}>
      <div className={styles.header}>
        <h2 className={`${styles.sectionTitle} ${styles.animateIn} holographic-title`}>Open Comms Channel</h2>
        <p className={`${styles.animateIn} sub-title`}>
          Have a project, a question, or just want to discuss the latest in warp drive technology?
          <br />Send a transmission.
        </p>
      </div>
      {/* Replace YOUR_FORM_ID with your Formspree endpoint */}
      <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className={`${styles.contactForm} ${styles.animateIn}`}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Your Name / Callsign</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Your Email / Holo-address</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Transmit Message
        </button>
      </form>
    </section>
  );
}