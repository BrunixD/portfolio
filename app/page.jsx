'use client';

import { useState } from 'react';
import { useLoading } from './context/LoadingContext';
import HeroBanner from './components/HeroBanner';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import styles from './styles/Home.module.css';
import Preloader from './components/Preloader';

export default function Home() {
 const { loading } = useLoading(); 
  const [selectedProject, setSelectedProject] = useState(null);

  // Function to open the modal
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

 return (
    <>
      <Preloader />

      <div className={`${styles.mainContent} ${loading ? styles.hidden : ''}`}>
        <HeroBanner />
        <div id="projects">
          <ProjectsSection onProjectClick={handleProjectClick} />
        </div>
        <AboutSection />
        <SkillsSection />
        <ContactSection />
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      </div>
    </>
  );
}