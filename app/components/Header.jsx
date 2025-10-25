'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/Header.module.css';

export default function Header() {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    // Animate the header in on page load
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.logo}>
        <a href="#">Alex Doe</a>
      </div>
      <nav className={styles.navLinks}>
        <ul>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}