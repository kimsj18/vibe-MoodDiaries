'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import { EmotionType, getEmotionData } from '@/commons/constants/enum';
import styles from './styles.module.css';

interface DiariesDetailProps {
  id: string;
}

// Mock 데이터
const mockDiaryData = {
  id: '1',
  title: '이것은 타이틀 입니다.',
  content: '내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다',
  emotion: EmotionType.HAPPY,
  createdAt: '2024. 07. 12',
};

// Mock 회고 데이터
const mockRetrospectData = [
  {
    id: '1',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24',
  },
  {
    id: '2',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24',
  },
];

const DiariesDetail: React.FC<DiariesDetailProps> = ({ id }) => {
  const emotionData = getEmotionData(mockDiaryData.emotion);
  const [retrospectInput, setRetrospectInput] = useState('');

  const handleCopyContent = () => {
    navigator.clipboard.writeText(mockDiaryData.content);
    alert('내용이 복사되었습니다.');
  };

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
  };

  const handleRetrospectSubmit = () => {
    if (retrospectInput.trim()) {
      console.log('회고 입력:', retrospectInput);
      setRetrospectInput('');
    }
  };

  return (
    <div className={styles.container}>
      {/* gap: 1168 * 64 */}
      <div className={styles.gapLarge}></div>
      
      {/* detail-title: 1168 * 84 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{mockDiaryData.title}</h1>
        </div>
        <div className={styles.emotionAndDate}>
          <div className={styles.emotionSection}>
            <Image
              src={emotionData.images.small.replace('.svg', '.png').replace('/icons/', '/images/')}
              alt={emotionData.displayText}
              width={32}
              height={32}
              className={styles.emotionIcon}
            />
            <span className={styles.emotionText} style={{ color: emotionData.color }}>
              {emotionData.displayText}
            </span>
          </div>
          <div className={styles.dateSection}>
            <span className={styles.dateText}>{mockDiaryData.createdAt}</span>
            <span className={styles.createdText}>작성</span>
          </div>
        </div>
      </div>
      
      {/* gap: 1168 * 24 */}
      <div className={styles.gap}></div>
      
      {/* detail-content: 1168 * 169 */}
      <div className={styles.detailContent}>
        <div className={styles.contentArea}>
          <h2 className={styles.contentLabel}>내용</h2>
          <p className={styles.contentText}>{mockDiaryData.content}</p>
        </div>
        <div className={styles.copySection}>
          <button className={styles.copyButton} onClick={handleCopyContent}>
            <Image
              src="/icons/copy_outline_light_m.svg"
              alt="복사"
              width={24}
              height={24}
            />
            <span>내용 복사</span>
          </button>
        </div>
      </div>
      
      {/* gap: 1168 * 24 */}
      <div className={styles.gap}></div>
      
      {/* detail-footer: 1168 * 56 */}
      <div className={styles.detailFooter}>
        <div className={styles.buttonGroup}>
          <Button
            variant="secondary"
            size="medium"
            theme="light"
            onClick={handleEdit}
            className={styles.editButton}
          >
            수정
          </Button>
          <Button
            variant="secondary"
            size="medium"
            theme="light"
            onClick={handleDelete}
            className={styles.deleteButton}
          >
            삭제
          </Button>
        </div>
      </div>
      
      {/* gap: 1168 * 24 */}
      <div className={styles.gap}></div>
      
      {/* retrospect-input: 1168 * 85 */}
      <div className={styles.retrospectInput}>
        <h2 className={styles.retrospectLabel}>회고</h2>
        <div className={styles.retrospectInputContainer}>
          <Input
            variant="primary"
            size="medium"
            theme="light"
            placeholder="회고를 남겨보세요."
            value={retrospectInput}
            onChange={(e) => setRetrospectInput(e.target.value)}
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            onClick={handleRetrospectSubmit}
            className={styles.retrospectSubmitButton}
          >
            입력
          </Button>
        </div>
      </div>
      
      {/* gap: 1168 * 16 */}
      <div className={styles.gapSmall}></div>
      
      {/* retrospect-list: 1168 * 72 */}
      <div className={styles.retrospectList}>
        {mockRetrospectData.map((retrospect, index) => (
          <div key={retrospect.id} className={styles.retrospectItem}>
            <span className={styles.retrospectContent}>{retrospect.content}</span>
            <span className={styles.retrospectDate}>[{retrospect.createdAt}]</span>
            {index < mockRetrospectData.length - 1 && <div className={styles.retrospectDivider}></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiariesDetail;
