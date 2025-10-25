import styles from '../styles/Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
        {/* Add other social links as needed */}
      </div>
      <p className={styles.copyright}>
        © {currentYear} Bruno Carvalho. Designed & Built on a Long-Range Starship.
      </p>
    </footer>
  );
}