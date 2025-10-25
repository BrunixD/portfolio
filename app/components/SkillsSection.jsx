'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../styles/SkillsSection.module.css';

import { 
  FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaPhp, 
  FaLaravel, FaJava, FaDatabase, FaGitAlt, FaGithub, 
} from 'react-icons/fa';

import { 
  SiJavascript, SiNextdotjs, SiTailwindcss, SiFramer, SiExpress, 
  SiDjango, SiMongodb, SiCloudflare, SiFirebase, SiVercel 
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  navigation: {
    title: 'Navigation (Frontend)',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'React', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'HTML5', icon: <FaHtml5 /> }, 
      { name: 'CSS3', icon: <FaCss3Alt /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'Framer Motion', icon: <SiFramer /> },
    ],
  },
  propulsion: {
    title: 'Propulsion (Backend)',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'Django', icon: <SiDjango /> },
      { name: 'PHP', icon: <FaPhp /> },
      { name: 'Laravel', icon: <FaLaravel /> },
      { name: 'Java', icon: <FaJava /> },
    ],
  },
  lifeSupport: {
    title: 'Life Support (Databases)',
    skills: [
      { name: 'SQL', icon: <FaDatabase /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'Cloudflare D1', icon: <SiCloudflare /> },
      { name: 'Firebase', icon: <SiFirebase /> },
    ],
  },
  command: {
    title: 'Command & Control (Tools & DevOps)',
    skills: [
      { name: 'Git', icon: <FaGitAlt /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Cloudflare', icon: <SiCloudflare /> },,
    ],
  },
};

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const skillSystems = sectionRef.current.querySelectorAll(`.${styles.skillSystem}`);
    
    skillSystems.forEach((system) => {
      const skills = system.querySelectorAll(`.${styles.skillItem}`);
      const title = system.querySelector('h3');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: system,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(title, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo(skills, 
          { opacity: 0, scale: 0.5 }, 
          { opacity: 1, scale: 1, stagger: 0.1, duration: 0.3, ease: 'back.out(1.7)' }
        );
    });

  }, []);

  return (
    <section ref={sectionRef} id="skills" className={styles.skillsContainer}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Tech Arsenal</h2>
        <p>The systems powering the starship and its missions.</p>
      </div>
      <div className={styles.grid}>
        {Object.values(skillsData).map((system) => (
          <div key={system.title} className={styles.skillSystem}>
            <h3>{system.title}</h3>
            <div className={styles.skillsList}>
              {system.skills.map((skill) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillIcon}>{skill.icon}</div>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}