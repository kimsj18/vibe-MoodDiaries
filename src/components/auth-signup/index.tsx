'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { useSignupForm } from './hooks/index.form.hook';
import styles from './styles.module.css';

export interface AuthSignupProps {
  className?: string;
}

export const AuthSignup: React.FC<AuthSignupProps> = ({ className = '' }) => {
  const { form, onSubmit, isFormValid, isSubmitting, errors } = useSignupForm();

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>
            계정을 생성하여 서비스를 이용해보세요
          </p>
        </div>

        {/* 폼 */}
        <form className={styles.form} onSubmit={onSubmit} data-testid="auth-signup-form">
          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="medium"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              type="email"
              className={styles.input}
              data-testid="email-input"
              {...form.register('email')}
              error={!!errors.email?.message}
            />
            {errors.email && (
              <span className={styles.errorMessage} data-testid="email-error">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="medium"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              className={styles.input}
              data-testid="password-input"
              {...form.register('password')}
              error={!!errors.password?.message}
            />
            {errors.password && (
              <span className={styles.errorMessage} data-testid="password-error">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="medium"
              label="비밀번호 재입력"
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              className={styles.input}
              data-testid="password-confirm-input"
              {...form.register('passwordConfirm')}
              error={!!errors.passwordConfirm?.message}
            />
            {errors.passwordConfirm && (
              <span className={styles.errorMessage} data-testid="password-confirm-error">
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="medium"
              label="이름"
              placeholder="이름을 입력해주세요"
              type="text"
              className={styles.input}
              data-testid="name-input"
              {...form.register('name')}
              error={!!errors.name?.message}
            />
            {errors.name && (
              <span className={styles.errorMessage} data-testid="name-error">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <Button
              variant="primary"
              theme="light"
              size="large"
              fullWidth
              className={styles.signupButton}
              data-testid="signup-button"
              type="submit"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? '가입 중...' : '회원가입'}
            </Button>
          </div>

          <div className={styles.loginLink}>
            <p className={styles.loginText}>
              이미 계정이 있으신가요?{' '}
              <a href="/auth/login" className={styles.loginAnchor}>
                로그인하기
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthSignup;
