import React from 'react';
import { useTheme } from 'next-themes';
import Button from '../button';
import styles from './styles.module.css';

export type ModalVariant = 'info' | 'danger';
export type ModalActions = 'single' | 'dual';
export type ModalTheme = 'light' | 'dark';

export interface ModalProps {
  variant?: ModalVariant;
  actions?: ModalActions;
  theme?: ModalTheme;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  variant = 'info',
  actions = 'single',
  theme,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  isOpen = true
}) => {
  const { theme: systemTheme } = useTheme();
  const resolvedTheme: ModalTheme = (theme || (systemTheme as ModalTheme) || 'light');

  if (!isOpen) return null;

  const modalClasses = [
    styles.modal,
    styles[`variant-${variant}`],
    styles[`actions-${actions}`],
    styles[`theme-${resolvedTheme}`]
  ]
    .filter(Boolean)
    .join(' ');

  const renderButtons = () => {
    if (actions === 'single') {
      return (
        <div className={styles.buttonArea}>
          <Button
            variant="primary"
            theme="light"
            size="large"
            onClick={onConfirm}
            className={styles.singleButton}
          >
            {confirmText}
          </Button>
        </div>
      );
    }

    return (
      <div className={styles.buttonArea}>
        <Button
          variant="secondary"
          theme="light"
          size="large"
          onClick={onCancel}
          className={styles.dualButton}
        >
          {cancelText}
        </Button>
        <Button
          variant="primary"
          theme="light"
          size="large"
          onClick={onConfirm}
          className={styles.dualButton}
        >
          {confirmText}
        </Button>
      </div>
    );
  };

  return (
    <div className={modalClasses}>
      <div className={styles.content}>
        <div className={styles.textArea}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.message}>{message}</p>
        </div>
        {renderButtons()}
      </div>
    </div>
  );
};

export default Modal;
