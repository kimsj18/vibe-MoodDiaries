import React, { forwardRef } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonTheme = 'light' | 'dark';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: ButtonTheme;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      children,
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const resolvedTheme: ButtonTheme = (theme || (systemTheme as ButtonTheme) || 'light');

    const buttonClasses = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${resolvedTheme}`],
      disabled ? styles.disabled : '',
      loading ? styles.loading : '',
      fullWidth ? styles.fullWidth : '',
      className
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <span className={styles.loadingSpinner} aria-hidden>
            <svg
              className={styles.spinner}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
              />
            </svg>
          </span>
        ) : leftIcon ? (
          <span className={styles.leftIcon} aria-hidden>{leftIcon}</span>
        ) : null}

        <span className={styles.content}>{children}</span>

        {rightIcon && !loading && (
          <span className={styles.rightIcon} aria-hidden>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
