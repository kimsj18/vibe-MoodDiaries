'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { URLS } from '@/commons/constants/url';

// Zod 스키마 정의
const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// GraphQL 쿼리 정의
const LOGIN_USER = `
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const FETCH_USER_LOGGED_IN = `
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      name
    }
  }
`;

// API 함수들
const loginUser = async (variables: LoginFormData) => {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: LOGIN_USER,
      variables,
    }),
  });

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  
  return result.data.loginUser;
};

const fetchUserLoggedIn = async (accessToken: string) => {
  const response = await fetch('https://main-practice.codebootcamp.co.kr/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query: FETCH_USER_LOGGED_IN,
    }),
  });

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  
  return result.data.fetchUserLoggedIn;
};

export const useAuthLoginForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  // 폼 필드 값 감시
  const watchedValues = watch();
  const isFormFilled = watchedValues.email && watchedValues.password;

  // 로그인 mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (loginData) => {
      try {
        // 로컬스토리지에 accessToken 저장
        localStorage.setItem('accessToken', loginData.accessToken);

        // 사용자 정보 조회
        const userData = await fetchUserLoggedIn(loginData.accessToken);
        
        // 로컬스토리지에 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify({
          _id: userData._id,
          name: userData.name,
        }));

        // 로그인 완료 모달 표시
        openModal(
          <div data-testid="login-success-modal">
            <Modal
              variant="info"
              actions="single"
              title="로그인 성공"
              message="로그인이 완료되었습니다."
              onConfirm={() => {
                closeAllModals();
                router.push(URLS.DIARIES.LIST);
              }}
              confirmTestId="modal-confirm-button"
            />
          </div>
        );
      } catch (error) {
        // 사용자 정보 조회 실패 시 에러 처리
        console.error('사용자 정보 조회 실패:', error);
        
        openModal(
          <div data-testid="login-error-modal">
            <Modal
              variant="danger"
              actions="single"
              title="로그인 실패"
              message="로그인 중 오류가 발생했습니다."
              onConfirm={() => {
                closeAllModals();
              }}
              confirmTestId="modal-confirm-button"
            />
          </div>
        );
      }
    },
    onError: (error) => {
      // 로그인 실패 모달 표시
      openModal(
        <div data-testid="login-error-modal">
          <Modal
            variant="danger"
            actions="single"
            title="로그인 실패"
            message={error.message || '로그인에 실패했습니다.'}
            onConfirm={() => {
              closeAllModals();
            }}
            confirmTestId="modal-confirm-button"
          />
        </div>
      );
    },
  });

  // 폼 제출 핸들러
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return {
    // Form 관련
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isFormFilled,
    
    // Loading 상태
    isLoading: loginMutation.isPending,
    
    // 버튼 활성화 상태
    isButtonEnabled: isValid && isFormFilled && !loginMutation.isPending,
  };
};
