'use client';

import { useLoading } from '../context/LoadingContext';
import styles from '../styles/Preloader.module.css';

export default function Preloader() {
  const { loading } = useLoading();

  return (
    <div className={`${styles.preloader} ${!loading ? styles.exiting : ''}`}>
      <div className={styles.logo}>B</div>
    </div>
  );
}