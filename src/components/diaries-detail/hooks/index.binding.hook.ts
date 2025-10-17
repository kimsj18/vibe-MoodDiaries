import { useState, useEffect } from 'react';
import { EmotionType } from '@/commons/constants/enum';

// 다이어리 데이터 타입 정의
interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

// 바인딩 훅의 반환 타입 정의
interface UseBindingHookReturn {
  diaryData: DiaryData | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * 다이어리 상세 데이터 바인딩 훅
 * 로컬스토리지에서 다이어리 데이터를 가져와서 해당 ID의 데이터를 반환
 */
export const useBindingHook = (id: string): UseBindingHookReturn => {
  const [diaryData, setDiaryData] = useState<DiaryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaryData = () => {
      try {
        setIsLoading(true);
        setError(null);

        // 로컬스토리지에서 다이어리 데이터 가져오기
        const diariesJson = localStorage.getItem('diaries');
        
        if (!diariesJson) {
          setError('다이어리 데이터가 없습니다.');
          setDiaryData(null);
          return;
        }

        const diaries: DiaryData[] = JSON.parse(diariesJson);
        
        if (!Array.isArray(diaries)) {
          setError('잘못된 다이어리 데이터 형식입니다.');
          setDiaryData(null);
          return;
        }

        // ID를 숫자로 변환하여 해당하는 다이어리 찾기
        const diaryId = parseInt(id, 10);
        
        if (isNaN(diaryId)) {
          setError('잘못된 다이어리 ID입니다.');
          setDiaryData(null);
          return;
        }

        const foundDiary = diaries.find(diary => diary.id === diaryId);
        
        if (!foundDiary) {
          setError('해당 ID의 다이어리를 찾을 수 없습니다.');
          setDiaryData(null);
          return;
        }

        // 감정 타입 검증
        if (!Object.values(EmotionType).includes(foundDiary.emotion)) {
          setError('잘못된 감정 타입입니다.');
          setDiaryData(null);
          return;
        }

        setDiaryData(foundDiary);
      } catch (err) {
        console.error('다이어리 데이터 로딩 중 오류:', err);
        setError('다이어리 데이터를 불러오는 중 오류가 발생했습니다.');
        setDiaryData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaryData();
  }, [id]);

  return {
    diaryData,
    isLoading,
    error
  };
};
