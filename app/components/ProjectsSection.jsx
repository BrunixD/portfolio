'use client';

// Import React hooks. useLayoutEffect is key for animations that measure the DOM.
import { useLayoutEffect, useRef } from 'react';

// Import GSAP and its plugins
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/ProjectsSection.module.css';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Your project data
const projects = [
  { id: 'planet1', name: 'Project Alpha', color: '#ff6b6b' },
  { id: 'planet2', name: 'Project Beta', color: '#4ecdc4' },
  { id: 'planet3', name: 'Project Gamma', color: '#feca57' },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null); // A ref for the horizontal wrapper

  useLayoutEffect(() => {
    // Create a GSAP context for safe cleanup
    let ctx = gsap.context(() => {
      
      // The new, recommended gsap.matchMedia() method
      gsap.matchMedia().add({
        // --- DESKTOP SETUP (screens wider than 768px) ---
        isDesktop: "(min-width: 769px)",

        // --- MOBILE SETUP (screens 768px or less) ---
        isMobile: "(max-width: 768px)",
      }, 
      (context) => {
        // The context object contains the matching conditions, like context.conditions.isDesktop
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          // --- DESKTOP-ONLY ANIMATION ---
          const horizontalWrapper = wrapperRef.current;
          if (!horizontalWrapper) return;
          
          const horizontalScrollLength = horizontalWrapper.offsetWidth - window.innerWidth;

          // The main horizontal scroll animation
          gsap.to(horizontalWrapper, {
            x: -horizontalScrollLength,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${horizontalScrollLength}`,
              invalidateOnRefresh: true,
            },
          });
        }

        if (isMobile) {
          // --- MOBILE-ONLY ANIMATION ---
          // Here, we create a simple vertical fade-in for each project "planet".
          // The CSS handles the vertical layout.
          const projectPanels = gsap.utils.toArray(`.${styles.projectPlanet}, .${styles.introPlanet}`);
          
          projectPanels.forEach(panel => {
            gsap.from(panel, {
              opacity: 0,
              y: 50,
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse', // Fades in on enter, out on scroll up
              }
            });
          });
        }

      }); // end of gsap.matchMedia()

    }, sectionRef); // Scope the context to our component's root element

    // Cleanup function
    return () => ctx.revert(); 
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsContainer}>
      {/* We add the ref to the wrapper directly now */}
      <div ref={wrapperRef} className={styles.projectsWrapper}>
        <div className={styles.introPlanet}>
          <h2>My Work</h2>
          <p>Each project is a world I've helped build. Explore them.</p>
        </div>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectPlanet}>
            <div className={styles.planetVisual} style={{ backgroundColor: project.color }}></div>
            <h2>{project.name}</h2>
            <p>Click to explore this project's details.</p>
          </div>
        ))}
      </div>
    </section>
  );
}