'use client';

import { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext'; 
import styles from '../styles/HeroBanner.module.css';
import ThreeScene from './ThreeScene';

export default function HeroBanner() {
  const { setLoading } = useLoading(); 
 

  useEffect(() => {
    // A small delay can sometimes help ensure the first paint of the 3D canvas has occurred
    const timer = setTimeout(() => {
      setLoading(false); // Tell the context: "The hero is ready, hide the preloader."
    }, 100); // 100ms delay, can be adjusted or removed

    return () => clearTimeout(timer); // Cleanup the timer
  }, [setLoading]); 


  return (
    <section className={styles.heroContainer}>
      
      {/* Container for the 3D background */}
      <div className={styles.threeBackground}>
        <ThreeScene />
      </div>
      
      {/* Container for the text content, layered on top of the 3D scene */}
      <div className={styles.heroContent}>
        <h1>Bruno Carvalho</h1>
        <p>Fullstack Engineer & Interstellar Navigator</p>
        
        <a 
          href="#projects" 
          className={styles.ctaButton} 
        >
          Begin Exploration
        </a>
      </div>

    </section>
  );
}