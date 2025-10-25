// app/page.js
'use client'; // This page now needs to be a client component to manage state

import { useState } from 'react'; // Import useState
import HeroBanner from './components/HeroBanner';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal'; // Import the new modal
import styles from './styles/Home.module.css';

export default function Home() {
  // State to manage the currently selected project for the modal
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
    <main className={styles.main}>
      <HeroBanner />
      <div id="projects">
        {/* Pass the click handler down to the ProjectsSection */}
        <ProjectsSection onProjectClick={handleProjectClick} />
      </div>
      <AboutSection />
      <SkillsSection />
      <ContactSection />

      {/* Render the modal. It will only show when a project is selected. */}
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </main>
  );
}