import React, { forwardRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// SearchBar variant types
export type SearchBarVariant = 'primary' | 'secondary' | 'tertiary';
export type SearchBarSize = 'small' | 'medium' | 'large';
export type SearchBarTheme = 'light' | 'dark';

// SearchBar props interface
export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: SearchBarVariant;
  size?: SearchBarSize;
  theme?: SearchBarTheme;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  showSearchIcon?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  debounceMs?: number;
}

// SearchBar component with forwardRef for better ref handling
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      disabled = false,
      placeholder = '검색어를 입력하세요',
      value,
      onChange,
      onSearch,
      onClear,
      showClearButton = true,
      showSearchIcon = true,
      fullWidth = false,
      loading = false,
      autoFocus = false,
      debounceMs = 300,
      className = '',
      onFocus,
      onBlur,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    
    // Determine effective theme
    const effectiveTheme = theme || (systemTheme as SearchBarTheme) || 'light';
    
    // Check if input has value
    const hasValue = Boolean(value !== undefined ? value : internalValue);
    
    // Generate CSS class names based on props
    const containerClasses = [
      styles.searchBarContainer,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      disabled && styles.disabled,
      isFocused && styles.focused,
      hasValue && styles.hasValue,
      loading && styles.loading,
      fullWidth && styles.fullWidth,
      className
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.searchInput,
      showSearchIcon && styles.hasSearchIcon,
      (showClearButton && hasValue) && styles.hasClearButton
    ]
      .filter(Boolean)
      .join(' ');

    // Debounced search handler
    const handleDebouncedSearch = useCallback((searchValue: string) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      const timer = setTimeout(() => {
        onSearch?.(searchValue);
      }, debounceMs);
      
      setDebounceTimer(timer);
    }, [debounceMs, onSearch, debounceTimer]);

    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      
      onChange?.(event);
      
      // Trigger debounced search if onSearch is provided
      if (onSearch) {
        handleDebouncedSearch(newValue);
      }
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

    // Handle key down (Enter key for search)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const currentValue = value !== undefined ? value : internalValue;
        onSearch?.(currentValue);
      }
      onKeyDown?.(event);
    };

    // Handle clear button click
    const handleClear = () => {
      if (value === undefined) {
        setInternalValue('');
      }
      
      // Clear debounce timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        setDebounceTimer(null);
      }
      
      onClear?.();
      onSearch?.('');
    };

    // Handle search button click
    const handleSearchClick = () => {
      const currentValue = value !== undefined ? value : internalValue;
      onSearch?.(currentValue);
    };

    const currentValue = value !== undefined ? value : internalValue;

    return (
      <div className={styles.searchBarWrapper}>
        {/* Search container */}
        <div className={containerClasses}>
          {/* Search icon */}
          {showSearchIcon && (
            <button
              type="button"
              className={styles.searchIconButton}
              onClick={handleSearchClick}
              disabled={disabled || loading}
              aria-label="검색"
            >
              {loading ? (
                <svg
                  className={styles.loadingSpinner}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="31.416"
                    strokeDashoffset="31.416"
                  />
                </svg>
              ) : (
                <img
                  src="/icons/search_outline_light_m.svg"
                  alt="검색"
                  className={styles.searchIcon}
                />
              )}
            </button>
          )}
          
          {/* Input element */}
          <input
            ref={ref}
            type="text"
            className={inputClasses}
            disabled={disabled}
            placeholder={placeholder}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus={autoFocus}
            aria-label="검색어 입력"
            {...rest}
          />
          
          {/* Clear button */}
          {showClearButton && hasValue && !disabled && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="검색어 지우기"
            >
              <img
                src="/icons/close_outline_light_s.svg"
                alt="지우기"
                className={styles.clearIcon}
              />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

// Export default
export default SearchBar;

// Additional utility functions for searchbar variants
export const getSearchBarVariantClass = (variant: SearchBarVariant, theme: SearchBarTheme) => {
  return `${styles[`variant-${variant}`]} ${styles[`theme-${theme}`]}`;
};

export const getSearchBarSizeClass = (size: SearchBarSize) => {
  return styles[`size-${size}`];
};

// SearchBar group component for multiple search bars
export interface SearchBarGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const SearchBarGroup: React.FC<SearchBarGroupProps> = ({
  children,
  orientation = 'vertical',
  spacing = 'medium',
  className = ''
}) => {
  const groupClasses = [
    styles.searchBarGroup,
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

SearchBarGroup.displayName = 'SearchBarGroup';
