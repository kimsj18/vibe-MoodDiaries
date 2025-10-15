import React from 'react';
import styles from './styles.module.css';

const DiariesNew = () => {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h1>새 다이어리 작성</h1>
      </div>
      
      {/* Gap */}
      <div className={styles.gap}></div>
      
      {/* Emotion Box */}
      <div className={styles.emotionBox}>
        <div className={styles.emotionItem}>😊</div>
        <div className={styles.emotionItem}>😢</div>
        <div className={styles.emotionItem}>😠</div>
        <div className={styles.emotionItem}>😲</div>
        <div className={styles.emotionItem}>😐</div>
      </div>
      
      {/* Gap */}
      <div className={styles.gap}></div>
      
      {/* Input Title */}
      <div className={styles.inputTitle}>
        <input type="text" placeholder="제목을 입력하세요" />
      </div>
      
      {/* Gap */}
      <div className={styles.gap}></div>
      
      {/* Input Content */}
      <div className={styles.inputContent}>
        <textarea placeholder="오늘의 일기를 작성해보세요..."></textarea>
      </div>
      
      {/* Gap */}
      <div className={styles.gap}></div>
      
      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.cancelBtn}>취소</button>
        <button className={styles.saveBtn}>저장</button>
      </div>
    </div>
  );
};

export default DiariesNew;
