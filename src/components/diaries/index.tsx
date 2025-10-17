'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import SelectBox from '@/commons/components/selectbox';
import SearchBar from '@/commons/components/searchbar';
import Button from '@/commons/components/button';
import Pagination from '@/commons/components/pagination';
import Image from 'next/image';
import { EmotionType, getEmotionDisplayText, getEmotionColor } from '@/commons/constants/enum';
import { useDiaryModal } from './hooks/index.link.modal.hook';

type Diary = {
  id: string;
  emotion: EmotionType;
  date: string; // YYYY.MM.DD
  content: string;
  image: string; // /images/*
};

// enum.ts 원본은 수정하지 않고, 이미지 경로만 /images 아래 PNG 자산을 사용
const emotionTypeToImage: Record<EmotionType, { medium: string; small: string }> = {
  [EmotionType.HAPPY]: {
    medium: '/images/emotion-happy-m.png',
    small: '/images/emotion-happy-s.png',
  },
  [EmotionType.SAD]: {
    medium: '/images/emotion-sad-m.png',
    small: '/images/emotion-sad-s.png',
  },
  [EmotionType.ANGRY]: {
    medium: '/images/emotion-angry-m.png',
    small: '/images/emotion-angry-s.png',
  },
  [EmotionType.SURPRISE]: {
    medium: '/images/emotion-surprise-m.png',
    small: '/images/emotion-surprise-s.png',
  },
  [EmotionType.ETC]: {
    medium: '/images/emotion-etc-m.png',
    small: '/images/emotion-etc-s.png',
  },
};

const mockDiaries: Diary[] = [
  // 첫 번째 행
  {
    id: '1',
    emotion: EmotionType.SAD,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
    image: emotionTypeToImage[EmotionType.SAD].medium,
  },
  {
    id: '2',
    emotion: EmotionType.SURPRISE,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.SURPRISE].medium,
  },
  {
    id: '3',
    emotion: EmotionType.ANGRY,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.ANGRY].medium,
  },
  {
    id: '4',
    emotion: EmotionType.HAPPY,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.HAPPY].medium,
  },
  // 두 번째 행
  {
    id: '5',
    emotion: EmotionType.ETC,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
    image: emotionTypeToImage[EmotionType.ETC].medium,
  },
  {
    id: '6',
    emotion: EmotionType.SURPRISE,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.SURPRISE].medium,
  },
  {
    id: '7',
    emotion: EmotionType.ANGRY,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.ANGRY].medium,
  },
  {
    id: '8',
    emotion: EmotionType.HAPPY,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.HAPPY].medium,
  },
  // 세 번째 행
  {
    id: '9',
    emotion: EmotionType.SAD,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
    image: emotionTypeToImage[EmotionType.SAD].medium,
  },
  {
    id: '10',
    emotion: EmotionType.SURPRISE,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.SURPRISE].medium,
  },
  {
    id: '11',
    emotion: EmotionType.ANGRY,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.ANGRY].medium,
  },
  {
    id: '12',
    emotion: EmotionType.HAPPY,
    date: '2024. 03. 12',
    content: '타이틀 영역 입니다.',
    image: emotionTypeToImage[EmotionType.HAPPY].medium,
  },
  // 추가 데이터 (두 번째 페이지)
  {
    id: '13',
    emotion: EmotionType.SAD,
    date: '2024. 03. 11',
    content: '두 번째 페이지 첫 번째 일기',
    image: emotionTypeToImage[EmotionType.SAD].medium,
  },
  {
    id: '14',
    emotion: EmotionType.HAPPY,
    date: '2024. 03. 11',
    content: '두 번째 페이지 두 번째 일기',
    image: emotionTypeToImage[EmotionType.HAPPY].medium,
  },
  {
    id: '15',
    emotion: EmotionType.ETC,
    date: '2024. 03. 11',
    content: '두 번째 페이지 세 번째 일기',
    image: emotionTypeToImage[EmotionType.ETC].medium,
  },
  {
    id: '16',
    emotion: EmotionType.SURPRISE,
    date: '2024. 03. 11',
    content: '두 번째 페이지 네 번째 일기',
    image: emotionTypeToImage[EmotionType.SURPRISE].medium,
  },
  {
    id: '17',
    emotion: EmotionType.ANGRY,
    date: '2024. 03. 10',
    content: '세 번째 페이지 첫 번째 일기',
    image: emotionTypeToImage[EmotionType.ANGRY].medium,
  },
  {
    id: '18',
    emotion: EmotionType.HAPPY,
    date: '2024. 03. 10',
    content: '세 번째 페이지 두 번째 일기',
    image: emotionTypeToImage[EmotionType.HAPPY].medium,
  },
];

const Diaries: React.FC = () => {
  // 페이지네이션 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 3행 * 4열 = 12개
  const totalPages = Math.ceil(mockDiaries.length / itemsPerPage);
  
  // 모달 훅 사용
  const { openDiaryModal } = useDiaryModal();

  // 현재 페이지에 해당하는 일기 데이터
  const getCurrentPageDiaries = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockDiaries.slice(startIndex, endIndex);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container} data-testid="diaries-page">
      {/* 첫 번째 gap: 1168 * 32 */}
      <div className={styles.gap1}></div>

      {/* Search 영역: 1168 * 48 */}
      <div className={styles.search}>
        <div className={styles.searchContent}>
          <div className={styles.searchLeftGroup}>
            <SelectBox
              variant="primary"
              theme="light"
              size="large"
              options={[{ value: 'all', label: '전체' }]}
              defaultValue={'all'}
              className={styles.selectWidth}
            />

            <SearchBar
              variant="primary"
              theme="light"
              size="large"
              placeholder="검색어를 입력해 주세요."
              className={styles.searchWidth}
            />
          </div>

          <Button
            variant="primary"
            theme="light"
            size="large"
            className={styles.buttonWidth}
            onClick={openDiaryModal}
            data-testid="diary-write-button"
          >
            일기쓰기
          </Button>
        </div>
      </div>

      {/* 두 번째 gap: 1168 * 42 */}
      <div className={styles.gap2}></div>

      {/* Main 영역: 1168 * 936 */}
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.cardGrid}>
            {getCurrentPageDiaries().map((diary) => (
              <div key={diary.id} className={styles.styles_diaryCard}>
                <div className={styles.styles_cardImageWrapper}>
                  <button
                    type="button"
                    className={styles.styles_closeButton}
                    aria-label="카드 닫기"
                  >
                    <Image
                      src="/icons/close_outline_light_s.svg"
                      alt="닫기"
                      width={20}
                      height={20}
                      className={styles.styles_closeIcon}
                    />
                  </button>
                  <Image
                    src={diary.image}
                    alt={getEmotionDisplayText(diary.emotion)}
                    fill
                    sizes="(max-width: 1168px) 100vw, 1168px"
                    className={styles.styles_cardImage}
                  />
                </div>
                <div className={styles.styles_cardContent}>
                  <div className={styles.styles_cardHeader}>
                    <span 
                      className={`${styles.styles_emotionChip} typography-caption-01`}
                      style={{ color: getEmotionColor(diary.emotion) }}
                    >
                      {getEmotionDisplayText(diary.emotion)}
                    </span>
                    <span className={`${styles.styles_dateText} typography-caption-02-s`}>
                      {diary.date}
                    </span>
                  </div>
                  <p className={`${styles.styles_cardBody} typography-body-02_s`}>
                    {diary.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 세 번째 gap: 1168 * 40 */}
      <div className={styles.gap3}></div>

      {/* Pagination 영역: 1168 * 32 */}
      <div className={styles.pagination}>
        <div className={styles.paginationContent}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            variant="primary"
            theme="light"
            size="medium"
            className={styles.paginationWidth}
          />
        </div>
      </div>

      {/* 네 번째 gap: 1168 * 40 */}
      <div className={styles.gap4}></div>
    </div>
  );
};

export default Diaries;
