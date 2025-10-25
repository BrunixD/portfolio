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
    name: 'Espaço Civil', 
    color: '#8aefff',
    imageUrl: '/projects/logo-EspaçoCivil.jpg',
    surfaceTextureUrl: '/textures/Icy.png',
    cloudsTextureUrl: '/textures/Clouds/Clouds1.png', 
    description: 'A professional digital presence built for a civil engineering company to showcase its expertise and portfolio. I designed and developed a responsive, clean interface that mirrors the precision and stability of engineering itself. Built with React, Next.js, and Tailwind CSS, the website emphasizes clarity, speed, and modern architecture.',
    tech: ['React', 'Next.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com'
  },
  { 
    id: 'planet2', 
    name: 'Cloud Adoption Decision Support System', 
    color: '#D891EF',
    imageUrl: '/project-dataviz.jpg',
    surfaceTextureUrl: '/textures/Martian.png',
    cloudsTextureUrl: '/textures/Clouds/Clouds2.png',
    description: 'A comprehensive decision support tool developed for SMEs to assess their readiness for cloud computing adoption. Built as part of an academic research project, the system uses a weighted scoring model to evaluate service types, deployment models, and organizational factors. I designed the front-end logic in React, integrated dynamic condition handling with JSON Logic, and structured storage using Cloudflare D1.',
    tech: ['React', 'Tailwind CSS', 'Cloudflare D1', 'JSON Logic', 'Cloudflare Workers', 'Cloudflare Pages', 'Resend'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://brunomsc.com'
  },
  { 
    id: 'planet3', 
    name: 'Yellow Avocado IT Website', 
    color: '#ffdb8a',
    imageUrl: '/projects/yellowavocado.png',
    surfaceTextureUrl: '/textures/Gaseous2.png',
    cloudsTextureUrl: '/textures/Clouds/Clouds3.png',
    description: 'A sleek, high-performance website developed for an IT solutions company, designed to convey innovation and professionalism. I implemented the structure, front-end, and UI interactions to ensure a smooth user experience and responsive layout. Using React, Next.js, and Tailwind CSS, this project combines speed, style, and scalability into a polished digital presence.',
    tech: ['React', 'Next.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://yellowavocado.com'
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