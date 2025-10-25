'use client';

// Import React hooks. useLayoutEffect is key for animations that measure the DOM.
import { useLayoutEffect, useRef } from 'react';

// Import GSAP and its plugins
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/ProjectsSection.module.css';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// ** DETAILED PROJECT DATA **
// This array now contains all the information needed for the modal.
// Remember to create these image files in your `/public` folder.
const projects = [
  { 
    id: 'planet1', 
    name: 'E-Commerce Nebula', 
    color: '#ff6b6b',
    imageUrl: '/project-ecommerce.jpg',
    description: 'A full-featured e-commerce platform built with Next.js and Stripe, designed for high performance and a seamless user experience. Users can browse products, manage their cart, and complete secure checkouts.',
    tech: ['Next.js', 'React', 'Stripe', 'PostgreSQL', 'Tailwind CSS', 'GSAP'],
    githubUrl: 'https://github.com/your-username/your-repo',
    liveUrl: 'https://your-live-site.com'
  },
  { 
    id: 'planet2', 
    name: 'Data Viz Asteroid Belt', 
    color: '#4ecdc4',
    imageUrl: '/project-dataviz.jpg',
    description: 'An interactive data visualization dashboard that tracks real-time metrics. Built with D3.js and React, it provides complex data in an intuitive and visually appealing format.',
    tech: ['React', 'D3.js', 'Node.js', 'WebSocket'],
    githubUrl: 'https://github.com/your-username/your-repo',
    liveUrl: 'https://your-live-site.com'
  },
  { 
    id: 'planet3', 
    name: 'Social Media Galaxy', 
    color: '#feca57',
    imageUrl: '/project-social.jpg',
    description: 'A full-stack social media application where users can create profiles, make posts, and interact with other users. Features a robust backend with authentication and a real-time feed.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/your-username/your-repo',
    liveUrl: 'https://your-live-site.com'
  },
];

// The component now accepts the `onProjectClick` function as a prop
export default function ProjectsSection({ onProjectClick }) {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null); // A ref for the horizontal wrapper

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsContainer}>
      <div ref={wrapperRef} className={styles.projectsWrapper}>
        <div className={styles.introPlanet}>
          <h2>My Work</h2>
          <p>Each project is a world I've helped build. Explore them.</p>
        </div>
        {projects.map((project) => (
          // ** CLICK HANDLER **
          // When this div is clicked, it calls the function passed down from the parent,
          // sending its own project data up.
          <div key={project.id} className={styles.projectPlanet} onClick={() => onProjectClick(project)}>
            <div className={styles.planetVisual} style={{ backgroundImage: `url(${project.imageUrl})` }}></div>
            <h2>{project.name}</h2>
            <p className={styles.ctaText}>Click to View Details</p>
          </div>
        ))}
      </div>
    </section>
  );
}