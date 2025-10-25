'use client';

import { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext'; // Import the loading context hook
import styles from '../styles/HeroBanner.module.css';
import ThreeScene from './ThreeScene'; // The component containing your 3D canvas

export default function HeroBanner() {
  const { setLoading } = useLoading(); // Get the function to update the global loading state
  //const { playClick } = useSound();   // Get the sound function

  // This effect is the key to the preloader system.
  // It runs once after this component has successfully mounted to the DOM.
  // Because this is the first and heaviest component, we use it to signal the end of the initial loading phase.
  useEffect(() => {
    // A small delay can sometimes help ensure the first paint of the 3D canvas has occurred
    const timer = setTimeout(() => {
      setLoading(false); // Tell the context: "The hero is ready, hide the preloader."
    }, 100); // 100ms delay, can be adjusted or removed

    return () => clearTimeout(timer); // Cleanup the timer
  }, [setLoading]); // The dependency array ensures this runs only once


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
        
        {/* The call-to-action button */}
        <a 
          href="#projects" 
          className={styles.ctaButton} 
          //onClick={playClick}
        >
          Begin Exploration
        </a>
      </div>

    </section>
  );
}