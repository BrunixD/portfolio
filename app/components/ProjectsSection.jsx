'use client';

import { useLayoutEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/ProjectsSection.module.css';
import ProjectPlanet3D from './ProjectPlanet3D';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { 
    id: 'planet1', 
    name: 'E-Commerce Nebula', 
    color: '#8aefff',
    imageUrl: '/project-ecommerce.jpg',
    surfaceTextureUrl: '/textures/Icy.png',
    cloudsTextureUrl: '/textures/Clouds/Clouds1.png', 
    // ... rest of the project data
    description: 'A full-featured e-commerce platform...',
    tech: ['Next.js', 'React', 'Stripe', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  },
  { 
    id: 'planet2', 
    name: 'Data Viz Asteroid Belt', 
    color: '#ff8a8a',
    imageUrl: '/project-dataviz.jpg',
    surfaceTextureUrl: '/textures/Martian.png',
    cloudsTextureUrl: '/textures/Clouds/Clouds2.png',
    // ... rest of the project data
    description: 'An interactive data visualization dashboard...',
    tech: ['React', 'D3.js', 'Node.js'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  },
  { 
    id: 'planet3', 
    name: 'Social Media Galaxy', 
    color: '#ffdb8a',
    imageUrl: '/project-social.jpg',
    surfaceTextureUrl: '/textures/Gaseous2.png',
    cloudsTextureUrl: '/textures/Clouds/Clouds3.png',
    // ... rest of the project data
    description: 'A full-stack social media application...',
    tech: ['React', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  },
];


export default function ProjectsSection({ onProjectClick }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    // This is the main GSAP context for cleanup
    let ctx; 

    // We use an async function to be able to `await` the fonts
    const initializeGSAP = async () => {
      // Wait for all fonts in the document to be loaded and ready
      await document.fonts.ready;

      // Now that fonts are loaded, we can safely initialize GSAP
      ctx = gsap.context(() => {
        gsap.matchMedia().add({
          isDesktop: "(min-width: 769px)",
          isMobile: "(max-width: 768px)",
        }, (context) => {
          let { isDesktop, isMobile } = context.conditions;

          if (isDesktop) {
            const horizontalWrapper = wrapperRef.current;
            if (!horizontalWrapper) return;
            
            const horizontalScrollLength = horizontalWrapper.offsetWidth - window.innerWidth;

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
            const projectPanels = gsap.utils.toArray(`.${styles.projectPlanet}, .${styles.introPlanet}`);
            projectPanels.forEach(panel => {
              gsap.from(panel, {
                opacity: 0,
                y: 50,
                scrollTrigger: {
                  trigger: panel,
                  start: 'top 85%',
                  end: 'bottom 60%',
                  toggleActions: 'play none none reverse',
                }
              });
            });
          }
        });
      }, sectionRef);
    };

    initializeGSAP();

    // The cleanup function
    return () => {
      // ctx might not be defined yet if the component unmounts before fonts load
      // so we check before calling revert()
      ctx && ctx.revert();
    };
  }, []); 
 return (
    <section ref={sectionRef} className={styles.projectsContainer}>
      <div ref={wrapperRef} className={styles.projectsWrapper}>
        <div className={styles.introPlanet}>
          <h2>My Work</h2>
          <p>Each project is a world I've helped build. Explore them.</p>
        </div>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectPlanet} onClick={() => onProjectClick(project)}>
            <div className={styles.planetCanvasContainer}>
              <ProjectPlanet3D 
                color={project.color} 
                surfaceTextureUrl={project.surfaceTextureUrl}
                cloudsTextureUrl={project.cloudsTextureUrl}
              />
            </div>
            <h2>{project.name}</h2>
            <p className={styles.ctaText}>Click to View Details</p>
          </div>
        ))}
      </div>
    </section>
  );
}