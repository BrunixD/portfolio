'use client';

import { useLoading } from '../context/LoadingContext'; // Import the hook
import styles from '../styles/Preloader.module.css';

export default function Preloader() {
  const { loading } = useLoading(); // Get the global loading state

  return (
    // The preloader now controls its own exit animation based on the context
    <div className={`${styles.preloader} ${!loading ? styles.exiting : ''}`}>
      <div className={styles.logo}>B</div>
    </div>
  );
}