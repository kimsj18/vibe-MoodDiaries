'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import { EmotionType, getEmotionData } from '@/commons/constants/enum';
import { useBindingHook } from './hooks/index.binding.hook';
import { useRetrospectFormHook } from './hooks/index.retrospect.form.hook';
import styles from './styles.module.css';

interface DiariesDetailProps {
  id: string;
}


// 회고 데이터를 로컬스토리지에서 가져오는 함수
const getRetrospectData = (diaryId: number) => {
  if (typeof window === 'undefined') return [];
  
  try {
    const retrospectsJson = localStorage.getItem('retrospects');
    if (!retrospectsJson) return [];
    
    const retrospects = JSON.parse(retrospectsJson);
    return retrospects.filter((retrospect: any) => retrospect.diaryId === diaryId);
  } catch (error) {
    console.error('회고 데이터 로딩 중 오류:', error);
    return [];
  }
};

const DiariesDetail: React.FC<DiariesDetailProps> = ({ id }) => {
  const { diaryData, isLoading, error } = useBindingHook(id);
  const { form, onSubmit, isSubmitEnabled } = useRetrospectFormHook(parseInt(id, 10));
  const [retrospectData, setRetrospectData] = useState<any[]>([]);
  
  // 회고 데이터 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const diaryId = parseInt(id, 10);
      const data = getRetrospectData(diaryId);
      setRetrospectData(data);
    }
  }, [id]);
  
  // 로딩 중이거나 데이터가 없을 때의 처리
  if (isLoading) {
    return <div className={styles.container} data-testid="diary-detail-container">로딩 중...</div>;
  }
  
  if (error || !diaryData) {
    return <div className={styles.container} data-testid="diary-detail-container">데이터를 불러올 수 없습니다.</div>;
  }
  
  const emotionData = getEmotionData(diaryData.emotion);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(diaryData.content);
    alert('내용이 복사되었습니다.');
  };

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
  };

  const handleRetrospectSubmit = form.handleSubmit(onSubmit);

  return (
    <div className={styles.container} data-testid="diary-detail-container">
      {/* gap: 1168 * 64 */}
      <div className={styles.gapLarge}></div>
      
      {/* detail-title: 1168 * 84 */}
      <div className={styles.detailTitle}>
        <div className={styles.titleSection}>
          <h1 className={styles.title} data-testid="diary-title">{diaryData.title}</h1>
        </div>
        <div className={styles.emotionAndDate}>
          <div className={styles.emotionSection}>
            <Image
              src={emotionData.images.small.replace('.svg', '.png').replace('/icons/', '/images/')}
              alt={emotionData.displayText}
              width={32}
              height={32}
              className={styles.emotionIcon}
              data-testid="emotion-icon"
            />
            <span className={styles.emotionText} style={{ color: emotionData.color }} data-testid="emotion-text">
              {emotionData.displayText}
            </span>
          </div>
          <div className={styles.dateSection}>
            <span className={styles.dateText} data-testid="created-date">{diaryData.createdAt}</span>
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
          <p className={styles.contentText} data-testid="diary-content">{diaryData.content}</p>
        </div>
        <div className={styles.copySection}>
          <button className={styles.copyButton} onClick={handleCopyContent} data-testid="copy-button">
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
        <form onSubmit={handleRetrospectSubmit} className={styles.retrospectInputContainer}>
          <Input
            variant="primary"
            size="large"
            theme="light"
            placeholder="회고를 남겨보세요."
            {...form.register('content')}
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            size="large"
            theme="light"
            type="submit"
            disabled={!isSubmitEnabled}
            className={styles.retrospectSubmitButton}
          >
            입력
          </Button>
        </form>
      </div>
      
      {/* gap: 1168 * 16 */}
      <div className={styles.gapSmall}></div>
      
      {/* retrospect-list: 1168 * 72 */}
      <div className={styles.retrospectList}>
        {retrospectData.map((retrospect, index) => (
          <React.Fragment key={retrospect.id}>
            <div className={styles.retrospectItem}>
              <span className={styles.retrospectContent}>{retrospect.content}</span>
              <span className={styles.retrospectDate}>[{retrospect.createdAt}]</span>
            </div>
            {index < retrospectData.length - 1 && <div className={styles.retrospectDivider}></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DiariesDetail;
