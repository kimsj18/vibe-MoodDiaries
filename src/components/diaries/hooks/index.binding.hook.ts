import { useState, useEffect } from 'react';
import { EmotionType } from '@/commons/constants/enum';

// 일기 데이터 타입 정의
export type DiaryData = {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
};

// 바인딩 훅의 반환 타입
export interface UseDiaryBindingReturn {
  diaries: DiaryData[];
  loading: boolean;
  error: string | null;
  refreshDiaries: () => void;
}

/**
 * 로컬스토리지에서 일기 데이터를 가져와서 바인딩하는 훅
 * @returns {UseDiaryBindingReturn} 일기 데이터와 상태 정보
 */
export const useDiaryBinding = (): UseDiaryBindingReturn => {
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * 로컬스토리지에서 일기 데이터를 로드하는 함수
   */
  const loadDiaries = () => {
    try {
      setLoading(true);
      setError(null);

      // 클라이언트 사이드에서만 실행
      if (typeof window === 'undefined') {
        setDiaries([]);
        setLoading(false);
        return;
      }

      const storedDiaries = localStorage.getItem('diaries');
      
      if (!storedDiaries) {
        setDiaries([]);
        setLoading(false);
        return;
      }

      const parsedDiaries: DiaryData[] = JSON.parse(storedDiaries);
      
      // 데이터 유효성 검증
      if (!Array.isArray(parsedDiaries)) {
        throw new Error('저장된 일기 데이터 형식이 올바르지 않습니다.');
      }

      // 각 일기 객체의 필수 필드 검증
      const validatedDiaries = parsedDiaries.filter((diary) => {
        return (
          typeof diary.id === 'number' &&
          typeof diary.title === 'string' &&
          typeof diary.content === 'string' &&
          typeof diary.emotion === 'string' &&
          Object.values(EmotionType).includes(diary.emotion as EmotionType) &&
          typeof diary.createdAt === 'string'
        );
      });

      setDiaries(validatedDiaries);
    } catch (err) {
      console.error('일기 데이터 로드 중 오류 발생:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      setDiaries([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 일기 데이터를 새로고침하는 함수
   */
  const refreshDiaries = () => {
    loadDiaries();
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadDiaries();
  }, []);

  // 로컬스토리지 변경 감지 (다른 탭에서 변경된 경우)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'diaries') {
        loadDiaries();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    diaries,
    loading,
    error,
    refreshDiaries,
  };
};

/**
 * 감정 타입에 따른 이미지 경로를 반환하는 유틸리티 함수
 * @param emotion - 감정 타입
 * @returns 이미지 경로 객체
 */
export const getEmotionImages = (emotion: EmotionType) => {
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

  return emotionTypeToImage[emotion];
};

/**
 * 제목을 카드 사이즈에 맞게 자르는 유틸리티 함수
 * @param title - 원본 제목
 * @param maxLength - 최대 길이 (기본값: 20)
 * @returns 잘린 제목
 */
export const truncateTitle = (title: string, maxLength: number = 20): string => {
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength) + '...';
};
