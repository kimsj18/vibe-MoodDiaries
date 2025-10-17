'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { EmotionType } from '@/commons/constants/enum';
import { URLS, UrlHelpers } from '@/commons/constants/url';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

// Zod 스키마 정의
const diaryFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

export type DiaryFormData = z.infer<typeof diaryFormSchema>;

// 로컬스토리지에 저장될 일기 데이터 타입
export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export const useFormHook = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  const form = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      emotion: undefined,
      title: '',
      content: '',
    },
    mode: 'onChange', // 실시간 검증
  });

  const { handleSubmit, formState: { isValid, errors }, watch, setValue, reset, register } = form;

  // 폼 필드 값들 감시
  const watchedValues = watch();

  /**
   * 로컬스토리지에서 기존 일기 데이터 조회
   */
  const getExistingDiaries = (): DiaryData[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const existingData = localStorage.getItem('diaries');
      return existingData ? JSON.parse(existingData) : [];
    } catch (error) {
      console.error('로컬스토리지 데이터 조회 실패:', error);
      return [];
    }
  };

  /**
   * 새로운 ID 생성 (기존 ID 중 최대값 + 1)
   */
  const generateNewId = (existingDiaries: DiaryData[]): number => {
    if (existingDiaries.length === 0) return 1;
    
    const maxId = Math.max(...existingDiaries.map(diary => diary.id));
    return maxId + 1;
  };

  /**
   * 로컬스토리지에 일기 데이터 저장
   */
  const saveDiaryToLocalStorage = (diaryData: DiaryData): void => {
    if (typeof window === 'undefined') return;
    
    try {
      const existingDiaries = getExistingDiaries();
      const updatedDiaries = [...existingDiaries, diaryData];
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
    } catch (error) {
      console.error('로컬스토리지 저장 실패:', error);
      throw error;
    }
  };

  /**
   * 등록완료 모달 표시
   */
  const showSuccessModal = (diaryId: number) => {
    const modalContent = (
      <Modal
        variant="info"
        actions="single"
        title="등록 완료"
        message="등록이 완료되었습니다"
        confirmText="확인"
        onConfirm={() => {
          closeAllModals();
          router.push(UrlHelpers.getDiaryDetailUrl(diaryId));
        }}
      />
    );
    
    openModal(modalContent);
  };

  /**
   * 폼 제출 핸들러
   */
  const onSubmit = handleSubmit(async (data: DiaryFormData) => {
    try {
      const existingDiaries = getExistingDiaries();
      const newId = generateNewId(existingDiaries);
      
      const newDiary: DiaryData = {
        id: newId,
        title: data.title,
        content: data.content,
        emotion: data.emotion,
        createdAt: new Date().toISOString(),
      };

      saveDiaryToLocalStorage(newDiary);
      showSuccessModal(newId);
      reset(); // 폼 초기화
      
    } catch (error) {
      console.error('일기 등록 실패:', error);
      // 에러 처리 로직 추가 가능
    }
  });

  /**
   * 등록하기 버튼 활성화 여부 확인
   * 모든 필수 필드가 입력되어야 활성화
   */
  const isSubmitEnabled = 
    watchedValues.emotion !== undefined && 
    watchedValues.title?.trim() !== '' && 
    watchedValues.content?.trim() !== '';

  return {
    // react-hook-form 관련
    form,
    errors,
    setValue,
    reset,
    register,
    
    // 폼 제출
    onSubmit,
    isSubmitEnabled,
    
    // 폼 값들
    watchedValues,
    
    // 유틸리티 함수들
    getExistingDiaries,
    generateNewId,
    saveDiaryToLocalStorage,
  };
};
