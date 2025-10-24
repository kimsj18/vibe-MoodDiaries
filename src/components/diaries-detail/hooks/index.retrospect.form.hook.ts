import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 회고 데이터 타입 정의
export interface RetrospectData {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

// 폼 스키마 정의
const retrospectFormSchema = z.object({
  content: z.string().min(1, '회고를 입력해주세요.'),
});

export type RetrospectFormData = z.infer<typeof retrospectFormSchema>;

// 회고 폼 훅의 반환 타입 정의
interface UseRetrospectFormHookReturn {
  form: {
    register: any;
    handleSubmit: any;
    formState: any;
    watch: any;
  };
  onSubmit: (data: RetrospectFormData) => void;
  isSubmitEnabled: boolean;
}

/**
 * 회고쓰기 폼 훅
 * react-hook-form과 zod를 사용하여 회고 등록 기능을 제공
 */
export const useRetrospectFormHook = (diaryId: number): UseRetrospectFormHookReturn => {
  const form = useForm<RetrospectFormData>({
    resolver: zodResolver(retrospectFormSchema),
    defaultValues: {
      content: '',
    },
  });

  const { watch } = form;
  const content = watch('content');
  const isSubmitEnabled = Boolean(content && content.trim().length > 0);

  const onSubmit = (data: RetrospectFormData) => {
    try {
      // 로컬스토리지에서 기존 회고 데이터 가져오기
      const existingRetrospectsJson = localStorage.getItem('retrospects');
      let retrospects: RetrospectData[] = [];
      
      if (existingRetrospectsJson) {
        retrospects = JSON.parse(existingRetrospectsJson);
      }

      // 새 회고 데이터 생성
      const newRetrospect: RetrospectData = {
        id: retrospects.length > 0 ? Math.max(...retrospects.map(r => r.id)) + 1 : 1,
        content: data.content.trim(),
        diaryId: diaryId,
        createdAt: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\./g, '.').replace(/\s/g, ' '),
      };

      // 새 회고를 배열에 추가
      retrospects.push(newRetrospect);

      // 로컬스토리지에 저장
      localStorage.setItem('retrospects', JSON.stringify(retrospects));

      // 폼 리셋
      form.reset();

      // 페이지 새로고침
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      console.error('회고 등록 중 오류 발생:', error);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitEnabled,
  };
};
