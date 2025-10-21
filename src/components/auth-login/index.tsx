'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import styles from './styles.module.css';

export interface AuthLoginProps {
  className?: string;
}

export const AuthLogin: React.FC<AuthLoginProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>계정에 로그인하여 서비스를 이용하세요</p>
        </div>

        {/* 폼 */}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <Input
              id="email"
              type="email"
              label="이메일"
              placeholder="이메일을 입력하세요"
              variant="primary"
              theme="light"
              size="large"
              fullWidth
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <Input
              id="password"
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              variant="primary"
              theme="light"
              size="large"
              fullWidth
              className={styles.input}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="primary"
              theme="light"
              size="large"
              fullWidth
              className={styles.loginButton}
            >
              로그인
            </Button>
          </div>
        </form>

        {/* 회원가입 링크 */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            아직 계정이 없으신가요?{' '}
            <a href="/auth/signup" className={styles.signupLink}>
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
