'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/ProjectModal.module.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  // Animate the modal in when a project is selected
  useEffect(() => {
    if (project) {
      gsap.to(modalRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(`.${styles.modalContent}`, 
        { y: -30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [project]);

  // Handle closing the modal with an animation
  const handleClose = () => {
    gsap.to(modalRef.current, { 
      autoAlpha: 0, 
      duration: 0.3, 
      onComplete: onClose // Call the onClose prop *after* the animation finishes
    });
  };

  // If no project is selected, render nothing
  if (!project) return null;

  return (
    <div ref={modalRef} className={styles.modalBackdrop} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        
        <img src={project.imageUrl || '/placeholder.jpg'} alt={project.name} className={styles.projectImage} />

        <h2>{project.name}</h2>
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.techStack}>
          {project.tech.map(tech => <span key={tech} className={styles.techTag}>{tech}</span>)}
        </div>

        <div className={styles.links}>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            <FaGithub /> View Code
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}