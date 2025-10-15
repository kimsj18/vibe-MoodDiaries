import React, { forwardRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// Toggle variant types
export type ToggleVariant = 'primary' | 'secondary' | 'tertiary';
export type ToggleSize = 'small' | 'medium' | 'large';
export type ToggleTheme = 'light' | 'dark';

// Toggle props interface
export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  theme?: ToggleTheme;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
}

// Toggle component with forwardRef for better ref handling
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      checked = false,
      disabled = false,
      label,
      description,
      onChange,
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    
    // Determine effective theme
    const effectiveTheme = theme || (systemTheme as ToggleTheme) || 'light';
    
    // Generate unique ID if not provided
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate CSS class names based on props
    const toggleClasses = [
      styles.toggle,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      checked && styles.checked,
      disabled && styles.disabled,
      className
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.toggleWrapper,
      disabled && styles.wrapperDisabled,
    ]
      .filter(Boolean)
      .join(' ');

    // Handle change events
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onChange?.(event.target.checked, event);
    }, [disabled, onChange]);

    // Handle keyboard events for accessibility
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      // Space key should toggle the switch
      if (event.key === ' ') {
        event.preventDefault();
        // Create a synthetic change event
        const target = event.currentTarget;
        const syntheticEvent = {
          target,
          currentTarget: target,
          type: 'change',
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 2,
          isTrusted: false,
          preventDefault: () => {},
          stopPropagation: () => {},
          stopImmediatePropagation: () => {},
          nativeEvent: event.nativeEvent,
          timeStamp: event.timeStamp,
          persist: () => {},
          isDefaultPrevented: () => false,
          isPropagationStopped: () => false,
        } as React.ChangeEvent<HTMLInputElement>;
        
        // Update the target's checked property
        target.checked = !checked;
        
        onChange?.(!checked, syntheticEvent);
      }
    }, [disabled, checked, onChange]);

    return (
      <div className={wrapperClasses}>
        <div className={styles.toggleContainer}>
          {/* Hidden input for form submission and accessibility */}
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={styles.hiddenInput}
            aria-describedby={description ? `${toggleId}-description` : undefined}
            {...rest}
          />
          
          {/* Visual toggle switch */}
          <label
            htmlFor={toggleId}
            className={toggleClasses}
            aria-label={label || 'Toggle switch'}
          >
            {/* Toggle track */}
            <span className={styles.track}>
              {/* Toggle thumb */}
              <span className={styles.thumb}>
                {/* Check icon for checked state - Using existing icon per @03-ui.mdc */}
                <span className={styles.checkIcon}>
                  <img 
                    src="/icons/check_outline_light_xs.svg" 
                    alt="checked" 
                    width="12" 
                    height="12"
                  />
                </span>
                
                {/* X icon for unchecked state - Using existing icon per @03-ui.mdc */}
                <span className={styles.xIcon}>
                  <img 
                    src="/icons/close_outline_light_s.svg" 
                    alt="unchecked" 
                    width="12" 
                    height="12"
                  />
                </span>
              </span>
            </span>
          </label>
        </div>
        
        {/* Label and description */}
        {(label || description) && (
          <div className={styles.labelContainer}>
            {label && (
              <label
                htmlFor={toggleId}
                className={styles.label}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={`${toggleId}-description`}
                className={styles.description}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

// Export default
export default Toggle;

// Additional utility functions for toggle variants
export const getToggleVariantClass = (variant: ToggleVariant, theme: ToggleTheme) => {
  return `${styles[`variant-${variant}`]} ${styles[`theme-${theme}`]}`;
};

export const getToggleSizeClass = (size: ToggleSize) => {
  return styles[`size-${size}`];
};

// Toggle group component for related toggles
export interface ToggleGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  children,
  orientation = 'vertical',
  spacing = 'medium',
  className = ''
}) => {
  const groupClasses = [
    styles.toggleGroup,
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

ToggleGroup.displayName = 'ToggleGroup';
