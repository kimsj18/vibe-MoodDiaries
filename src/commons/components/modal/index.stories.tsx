import type { Meta, StoryObj } from '@storybook/react';
import Modal from './index';

const meta: Meta<typeof Modal> = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'danger'],
    },
    actions: {
      control: { type: 'select' },
      options: ['single', 'dual'],
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    title: {
      control: { type: 'text' },
    },
    message: {
      control: { type: 'text' },
    },
    confirmText: {
      control: { type: 'text' },
    },
    cancelText: {
      control: { type: 'text' },
    },
    isOpen: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Info 모달 (단일 버튼)
export const Default: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    title: '알림',
    message: '작업이 완료되었습니다.',
    confirmText: '확인',
    isOpen: true,
  },
};

// 위험 모달 (단일 버튼)
export const DangerSingle: Story = {
  args: {
    variant: 'danger',
    actions: 'single',
    title: '삭제 확인',
    message: '정말로 삭제하시겠습니까?',
    confirmText: '삭제',
    isOpen: true,
  },
};

// Info 모달 (이중 버튼)
export const InfoDual: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    title: '저장 확인',
    message: '변경사항을 저장하시겠습니까?',
    confirmText: '저장',
    cancelText: '취소',
    isOpen: true,
  },
};

// 위험 모달 (이중 버튼)
export const DangerDual: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    title: '계정 삭제',
    message: '계정을 삭제하면 복구할 수 없습니다. 계속하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
    isOpen: true,
  },
};

// 다크 테마 모달
export const DarkTheme: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'dark',
    title: '다크 모드',
    message: '다크 테마로 표시되는 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
    isOpen: true,
  },
};

// 다크 테마 위험 모달
export const DarkDanger: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    theme: 'dark',
    title: '위험 작업',
    message: '이 작업은 되돌릴 수 없습니다.',
    confirmText: '계속',
    cancelText: '취소',
    isOpen: true,
  },
};

// 긴 텍스트 모달
export const LongText: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    title: '긴 제목이 있는 모달입니다. 이것은 매우 긴 제목입니다.',
    message: '이것은 매우 긴 메시지입니다. 여러 줄에 걸쳐 표시될 수 있는 긴 텍스트를 포함하고 있습니다. 사용자에게 중요한 정보를 전달하기 위한 상세한 설명이 포함되어 있습니다.',
    confirmText: '이해했습니다',
    isOpen: true,
  },
};

// 닫힌 모달 (isOpen: false)
export const Closed: Story = {
  args: {
    variant: 'info',
    actions: 'single',
    title: '닫힌 모달',
    message: '이 모달은 닫혀있습니다.',
    confirmText: '확인',
    isOpen: false,
  },
};

// 커스텀 버튼 텍스트
export const CustomButtons: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    title: '커스텀 버튼',
    message: '버튼 텍스트가 커스터마이징된 모달입니다.',
    confirmText: '예, 계속하겠습니다',
    cancelText: '아니오, 취소합니다',
    isOpen: true,
  },
};
