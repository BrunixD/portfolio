// app/page.js
'use client'; // This page now needs to be a client component to manage state

import { useState } from 'react'; // Import useState
import { useLoading } from './context/LoadingContext'; // Import the hook
import HeroBanner from './components/HeroBanner';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import styles from './styles/Home.module.css';
import Preloader from './components/Preloader';

export default function Home() {
 const { loading } = useLoading(); // Get the global loading state
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
      {/* The preloader's visibility is now controlled by the global context */}
      <Preloader />

      {/* The main content is always in the DOM but hidden by CSS until loading is complete */}
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