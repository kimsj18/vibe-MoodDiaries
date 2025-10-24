import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EmotionType } from '@/commons/constants/enum';

// 수정 폼 스키마 정의
const updateFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType, {
    message: '감정을 선택해주세요.',
  }),
  title: z.string().min(1, '제목을 입력해주세요.').max(100, '제목은 100자 이하로 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.').max(1000, '내용은 1000자 이하로 입력해주세요.'),
});

export type UpdateFormData = z.infer<typeof updateFormSchema>;

// 수정 모드 상태 관리
export const useUpdateFormHook = (diaryId: number, initialData: {
  emotion: EmotionType;
  title: string;
  content: string;
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // 폼 설정
  const form = useForm<UpdateFormData>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      emotion: initialData.emotion,
      title: initialData.title,
      content: initialData.content,
    },
  });

  // 수정 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      // 수정 모드 진입 시 폼 초기화
      form.reset({
        emotion: initialData.emotion,
        title: initialData.title,
        content: initialData.content,
      });
    }
  };

  // 수정 취소
  const cancelEdit = () => {
    setIsEditMode(false);
    form.reset({
      emotion: initialData.emotion,
      title: initialData.title,
      content: initialData.content,
    });
  };

  // 수정 완료
  const updateDiary = form.handleSubmit(async (data) => {
    try {
      // 로컬스토리지에서 일기 데이터 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) {
        throw new Error('일기 데이터를 찾을 수 없습니다.');
      }

      const diaries = JSON.parse(diariesJson);
      const diaryIndex = diaries.findIndex((diary: any) => diary.id === diaryId);
      
      if (diaryIndex === -1) {
        throw new Error('수정할 일기를 찾을 수 없습니다.');
      }

      // 일기 데이터 업데이트
      diaries[diaryIndex] = {
        ...diaries[diaryIndex],
        emotion: data.emotion,
        title: data.title,
        content: data.content,
      };

      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(diaries));

      // 수정 모드 종료
      setIsEditMode(false);

      // 페이지 새로고침으로 데이터 반영
      window.location.reload();
    } catch (error) {
      console.error('일기 수정 중 오류 발생:', error);
      alert('일기 수정 중 오류가 발생했습니다.');
    }
  });

  return {
    isEditMode,
    form,
    toggleEditMode,
    cancelEdit,
    updateDiary,
  };
};
