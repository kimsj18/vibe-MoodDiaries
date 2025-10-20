import React from 'react';
import styles from './styles.module.css';

export default function Pictures() {
  return (
    <div className={styles.container}>
      <div className={styles.gap}></div>
      <div className={styles.filter}></div>
      <div className={styles.gap}></div>
      <div className={styles.main}></div>
    </div>
  );
}
