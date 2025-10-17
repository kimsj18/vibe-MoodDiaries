'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { EmotionType, getAllEmotionData } from '@/commons/constants/enum';
import { useModalClose } from './hooks/index.link.modal.close.hook';
import { useFormHook } from './hooks/index.form.hook';
import styles from './styles.module.css';

const DiariesNew = () => {
  const { handleClose } = useModalClose();
  const { 
    onSubmit, 
    isSubmitEnabled, 
    register
  } = useFormHook();

  const emotionData = getAllEmotionData();

  return (
    <div className={styles.wrapper} data-testid="diary-write-modal">
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>일기 쓰기</h1>
      </div>
      
      {/* Emotion Box */}
      <div className={styles.emotionBox}>
        <h2 className={styles.emotionTitle}>오늘 기분은 어땠나요?</h2>
        <div className={styles.emotionRadioGroup}>
          {emotionData.map((emotion) => (
            <label key={emotion.type} className={styles.emotionRadio}>
              <input
                type="radio"
                value={emotion.type}
                {...register('emotion')}
                className={styles.emotionRadioInput}
              />
              <span className={styles.emotionRadioLabel}>
                {emotion.displayText}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Input Title */}
      <div className={styles.inputTitle}>
        <label className={styles.inputLabel}>제목</label>
        <Input
          variant="primary"
          size="medium"
          theme="light"
          placeholder="제목을 입력합니다."
          {...register('title')}
          className={styles.titleInput}
        />
      </div>
      
      {/* Input Content */}
      <div className={styles.inputContent}>
        <label className={styles.inputLabel}>내용</label>
        <textarea
          className={styles.contentTextarea}
          placeholder="내용을 입력합니다."
          {...register('content')}
        />
      </div>
      
      {/* Footer */}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          size="medium"
          theme="light"
          onClick={handleClose}
          className={styles.closeButton}
          data-testid="diary-close-button"
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          theme="light"
          onClick={onSubmit}
          className={styles.submitButton}
          disabled={!isSubmitEnabled}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;
