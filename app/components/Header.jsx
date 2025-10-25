'use client';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    gsap.from(headerRef.current, { y: -100, opacity: 0, duration: 1, ease: 'power3.out' });
  }, []);

  useEffect(() => {
     if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.logo}>
          <a href="#" className='holographic-title'>Home</a>
        </div>

        <nav className={styles.desktopNav}>
          <ul>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className={styles.mobileMenuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {isMenuOpen && (
        <nav className={styles.mobileNav} onClick={handleLinkClick}>
          <ul onClick={(e) => e.stopPropagation()}>
            <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
            <li><a href="#about" onClick={handleLinkClick}>About</a></li>
            <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
          </ul>
        </nav>
      )}
    </>
  );
}