'use client';

import React, { useState } from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { EmotionType, EMOTION_CONFIG, getAllEmotionData } from '@/commons/constants/enum';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { useModalClose } from './hooks/index.link.modal.close.hook';
import styles from './styles.module.css';

const DiariesNew = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { closeModal } = useModal();
  const { handleClose } = useModalClose();

  const emotionData = getAllEmotionData();

  const handleEmotionSelect = (emotionType: EmotionType) => {
    setSelectedEmotion(emotionType);
  };

  // handleClose는 useModalClose 훅에서 가져옴

  const handleSubmit = () => {
    // 등록하기 로직 구현
    console.log('등록하기 버튼 클릭', {
      emotion: selectedEmotion,
      title,
      content
    });
  };

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
                name="emotion"
                value={emotion.type}
                checked={selectedEmotion === emotion.type}
                onChange={() => handleEmotionSelect(emotion.type)}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
      </div>
      
      {/* Input Content */}
      <div className={styles.inputContent}>
        <label className={styles.inputLabel}>내용</label>
        <textarea
          className={styles.contentTextarea}
          placeholder="내용을 입력합니다."
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
          onClick={handleSubmit}
          className={styles.submitButton}
          disabled={!title || !content}
          
        >
          등록하기
        </Button>
      </div>
    </div>
  );
};

export default DiariesNew;
