import React, { forwardRef, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// Input variant types
export type InputVariant = 'primary' | 'secondary' | 'tertiary';
export type InputSize = 'small' | 'medium' | 'large';
export type InputTheme = 'light' | 'dark';

// Input props interface
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  theme?: InputTheme;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  showClearButton?: boolean;
}

// Input component with forwardRef for better ref handling
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      disabled = false,
      error = false,
      errorMessage,
      helperText,
      label,
      placeholder,
      fullWidth = false,
      leftIcon,
      rightIcon,
      onClear,
      showClearButton = false,
      className = '',
      value,
      onChange,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value));
    
    // Determine effective theme
    const effectiveTheme = theme || (systemTheme as InputTheme) || 'light';
    
    // Generate CSS class names based on props
    const containerClasses = [
      styles.inputContainer,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      disabled && styles.disabled,
      error && styles.error,
      isFocused && styles.focused,
      hasValue && styles.hasValue,
      fullWidth && styles.fullWidth,
      className
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.input,
      leftIcon && styles.hasLeftIcon,
      (rightIcon || showClearButton) && styles.hasRightIcon
    ]
      .filter(Boolean)
      .join(' ');

    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setHasValue(Boolean(newValue));
      onChange?.(event);
    };

    // Handle focus
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    // Handle blur
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    // Handle clear button click
    const handleClear = () => {
      setHasValue(false);
      onClear?.();
    };

    return (
      <div className={styles.inputWrapper}>
        {/* Label */}
        {label && (
          <label className={styles.label} htmlFor={rest.id}>
            {label}
          </label>
        )}
        
        {/* Input container */}
        <div className={containerClasses}>
          {/* Left icon */}
          {leftIcon && (
            <span className={styles.leftIcon}>
              {leftIcon}
            </span>
          )}
          
          {/* Input element */}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={error}
            aria-describedby={
              errorMessage ? `${rest.id}-error` : 
              helperText ? `${rest.id}-helper` : undefined
            }
            {...rest}
          />
          
          {/* Right icon or clear button */}
          {showClearButton && hasValue && !disabled ? (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear input"
            >
              <svg
                className={styles.clearIcon}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : rightIcon ? (
            <span className={styles.rightIcon}>
              {rightIcon}
            </span>
          ) : null}
        </div>
        
        {/* Helper text or error message */}
        {errorMessage && (
          <div className={styles.errorMessage} id={`${rest.id}-error`}>
            {errorMessage}
          </div>
        )}
        
        {helperText && !errorMessage && (
          <div className={styles.helperText} id={`${rest.id}-helper`}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Export default
export default Input;

// Additional utility functions for input variants
export const getInputVariantClass = (variant: InputVariant, theme: InputTheme) => {
  return `${styles[`variant-${variant}`]} ${styles[`theme-${theme}`]}`;
};

export const getInputSizeClass = (size: InputSize) => {
  return styles[`size-${size}`];
};

// Input group component for related inputs
export interface InputGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  orientation = 'vertical',
  spacing = 'medium',
  className = ''
}) => {
  const groupClasses = [
    styles.inputGroup,
    styles[`orientation-${orientation}`],
    styles[`spacing-${spacing}`],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses} role="group">
      {children}
    </div>
  );
};

InputGroup.displayName = 'InputGroup';
