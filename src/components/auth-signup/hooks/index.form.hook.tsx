'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { URLS } from '@/commons/constants/url';
import { Modal } from '@/commons/components/modal';

// Zod 스키마 정의
const signupSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식을 입력해주세요'),
  password: z
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, '비밀번호는 영문과 숫자를 포함해야 합니다'),
  passwordConfirm: z
    .string()
    .min(1, '비밀번호 확인을 입력해주세요'),
  name: z
    .string()
    .min(1, '이름을 입력해주세요'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
});

export type SignupFormData = z.infer<typeof signupSchema>;

// API 타입 정의
interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

interface CreateUserResponse {
  _id: string;
}

// GraphQL createUser mutation
const CREATE_USER_MUTATION = `
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;

// API 함수
const createUser = async (input: CreateUserInput): Promise<CreateUserResponse> => {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CREATE_USER_MUTATION,
      variables: { createUserInput: input },
    }),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다');
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0]?.message || '회원가입에 실패했습니다');
  }

  return result.data.createUser;
};

export const useSignupForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  // React Hook Form 설정
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
    },
  });

  // React Query mutation 설정
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // 성공 시 가입완료 모달 표시
      const modalId = openModal(
        <div data-testid="signup-success-modal">
          <Modal
            variant="info"
            actions="single"
            title="가입 완료"
            message="가입이 완료되었습니다. 로그인 페이지로 이동합니다."
            onConfirm={() => {
              closeAllModals();
              router.push(URLS.AUTH.LOGIN);
            }}
            confirmTestId="signup-success-modal-confirm"
          />
        </div>
      );
    },
    onError: (error) => {
      // 실패 시 가입실패 모달 표시
      const modalId = openModal(
        <div data-testid="signup-error-modal">
          <Modal
            variant="danger"
            actions="single"
            title="가입 실패"
            message={error.message || '가입에 실패했습니다. 다시 시도해주세요.'}
            onConfirm={() => {
              closeAllModals();
            }}
            confirmTestId="signup-error-modal-confirm"
          />
        </div>
      );
    },
  });

  // 폼 제출 핸들러
  const onSubmit = (data: SignupFormData) => {
    const { passwordConfirm, ...userInput } = data;
    createUserMutation.mutate(userInput);
  };

  // 폼 유효성 검사
  const isFormValid = form.formState.isValid && !form.formState.isSubmitting;
  const isSubmitting = createUserMutation.isPending;

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isFormValid,
    isSubmitting,
    errors: form.formState.errors,
  };
};
