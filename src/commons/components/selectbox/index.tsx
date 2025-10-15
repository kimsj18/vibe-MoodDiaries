import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// SelectBox variant types
export type SelectBoxVariant = 'primary' | 'secondary' | 'tertiary';
export type SelectBoxSize = 'small' | 'medium' | 'large';
export type SelectBoxTheme = 'light' | 'dark';

// Option interface
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

// SelectBox props interface
export interface SelectBoxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: SelectBoxVariant;
  size?: SelectBoxSize;
  theme?: SelectBoxTheme;
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  maxHeight?: number;
  onChange?: (value: string | number | (string | number)[]) => void;
  onSearch?: (searchTerm: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// SelectBox component with forwardRef
export const SelectBox = forwardRef<HTMLDivElement, SelectBoxProps>(
  (
    {
      variant = 'primary',
      size = 'large',
      theme,
      options = [],
      value,
      defaultValue,
      placeholder = '선택해주세요',
      disabled = false,
      loading = false,
      error = false,
      fullWidth = false,
      searchable = false,
      clearable = false,
      multiple = false,
      maxHeight = 200,
      onChange,
      onSearch,
      onFocus,
      onBlur,
      leftIcon,
      rightIcon,
      className = '',
      ...rest
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState<string | number | (string | number)[]>(
      value ?? defaultValue ?? (multiple ? [] : '')
    );
    const [focusedIndex, setFocusedIndex] = useState(-1);
    
    const selectRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Determine effective theme
    const effectiveTheme = theme || (systemTheme as SelectBoxTheme) || 'light';
    
    // Filter options based on search term
    const filteredOptions = searchable && searchTerm
      ? options.filter(option => 
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
    
    // Group options if they have group property
    const groupedOptions = filteredOptions.reduce((acc, option) => {
      const group = option.group || 'default';
      if (!acc[group]) acc[group] = [];
      acc[group].push(option);
      return acc;
    }, {} as Record<string, SelectOption[]>);
    
    // Get display value
    const getDisplayValue = useCallback(() => {
      if (multiple && Array.isArray(selectedValue)) {
        if (selectedValue.length === 0) return placeholder;
        if (selectedValue.length === 1) {
          const option = options.find(opt => opt.value === selectedValue[0]);
          return option?.label || '';
        }
        return `${selectedValue.length}개 선택됨`;
      } else {
        const option = options.find(opt => opt.value === selectedValue);
        return option?.label || placeholder;
      }
    }, [selectedValue, options, placeholder, multiple]);
    
    // Handle option selection
    const handleOptionSelect = useCallback((optionValue: string | number) => {
      if (multiple) {
        const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter(v => v !== optionValue)
          : [...currentValues, optionValue];
        
        setSelectedValue(newValues);
        onChange?.(newValues);
      } else {
        setSelectedValue(optionValue);
        onChange?.(optionValue);
        setIsOpen(false);
      }
    }, [selectedValue, multiple, onChange]);
    
    // Handle clear selection
    const handleClear = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = multiple ? [] : '';
      setSelectedValue(newValue);
      onChange?.(newValue);
    }, [multiple, onChange]);
    
    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled) return;
      
      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else if (focusedIndex >= 0) {
            handleOptionSelect(filteredOptions[focusedIndex].value);
          }
          e.preventDefault();
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex(prev => 
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          e.preventDefault();
          break;
        case 'ArrowUp':
          if (isOpen) {
            setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
          }
          e.preventDefault();
          break;
        case 'Tab':
          setIsOpen(false);
          break;
      }
    }, [disabled, isOpen, focusedIndex, filteredOptions, handleOptionSelect]);
    
    // Handle search input
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      setFocusedIndex(0);
      onSearch?.(term);
    }, [onSearch]);
    
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setFocusedIndex(-1);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);
    
    // Scroll focused option into view
    useEffect(() => {
      if (focusedIndex >= 0 && listRef.current) {
        const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [focusedIndex]);
    
    // Generate CSS class names
    const selectClasses = [
      styles.selectBox,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      disabled && styles.disabled,
      loading && styles.loading,
      error && styles.error,
      isOpen && styles.open,
      fullWidth && styles.fullWidth,
      className
    ]
      .filter(Boolean)
      .join(' ');
    
    const triggerClasses = [
      styles.trigger,
      isOpen && styles.triggerOpen
    ]
      .filter(Boolean)
      .join(' ');
    
    return (
      <div
        ref={ref}
        className={selectClasses}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        {...rest}
      >
        <div
          ref={selectRef}
          className={triggerClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          {/* Left icon */}
          {leftIcon && (
            <span className={styles.leftIcon}>
              {leftIcon}
            </span>
          )}
          
          {/* Loading spinner */}
          {loading && (
            <span className={styles.loadingSpinner}>
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
          )}
          
          {/* Display value */}
          <span className={styles.value}>
            {getDisplayValue()}
          </span>
          
          {/* Clear button */}
          {clearable && selectedValue && !disabled && !loading && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="선택 해제"
            >
              <svg
                width="24"
                height="24"
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
          )}
          
          {/* Right icon or dropdown arrow */}
          {rightIcon ? (
            <span className={styles.rightIcon}>
              {rightIcon}
            </span>
          ) : (
            <span className={styles.dropdownArrow}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </div>
        
        {/* Dropdown */}
        {isOpen && (
          <div className={styles.dropdown} style={{ maxHeight }}>
            {/* Search input */}
            {searchable && (
              <div className={styles.searchContainer}>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            )}
            
            {/* Options list */}
            <ul
              ref={listRef}
              className={styles.optionsList}
              role="listbox"
              aria-multiselectable={multiple}
            >
              {Object.keys(groupedOptions).length === 0 ? (
                <li className={styles.noOptions}>
                  검색 결과가 없습니다
                </li>
              ) : (
                Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                  <React.Fragment key={groupName}>
                    {groupName !== 'default' && (
                      <li className={styles.optionGroup}>
                        {groupName}
                      </li>
                    )}
                    {groupOptions.map((option) => {
                      const globalIndex = filteredOptions.indexOf(option);
                      const isSelected = multiple
                        ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
                        : selectedValue === option.value;
                      const isFocused = globalIndex === focusedIndex;
                      
                      return (
                        <li
                          key={option.value}
                          className={[
                            styles.option,
                            isSelected && styles.optionSelected,
                            isFocused && styles.optionFocused,
                            option.disabled && styles.optionDisabled
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => !option.disabled && handleOptionSelect(option.value)}
                        >
                          {multiple && (
                            <span className={styles.checkbox}>
                              {isSelected && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                          )}
                          <span className={styles.optionLabel}>
                            {option.label}
                          </span>
                        </li>
                      );
                    })}
                  </React.Fragment>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

SelectBox.displayName = 'SelectBox';

// Export default
export default SelectBox;

// Additional utility functions
export const getSelectBoxVariantClass = (variant: SelectBoxVariant, theme: SelectBoxTheme) => {
  return `${styles[`variant-${variant}`]} ${styles[`theme-${theme}`]}`;
};

export const getSelectBoxSizeClass = (size: SelectBoxSize) => {
  return styles[`size-${size}`];
};

// SelectBox group component for related selects
export interface SelectBoxGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const SelectBoxGroup: React.FC<SelectBoxGroupProps> = ({
  children,
  orientation = 'horizontal',
  spacing = 'medium',
  className = ''
}) => {
  const groupClasses = [
    styles.selectBoxGroup,
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

SelectBoxGroup.displayName = 'SelectBoxGroup';
