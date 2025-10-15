import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputGroup } from './index';

// Meta configuration for Input component
const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 입력 컴포넌트입니다. Primary, Secondary, Tertiary 변형과 Light/Dark 테마를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '입력 필드의 시각적 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 필드의 크기',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '입력 필드의 테마 (시스템 테마 사용 시 undefined)',
      table: {
        defaultValue: { summary: 'undefined (시스템 테마 사용)' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '입력 필드 비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: { type: 'boolean' },
      description: '에러 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showClearButton: {
      control: { type: 'boolean' },
      description: '클리어 버튼 표시',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
      description: '입력 필드 라벨',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    helperText: {
      control: { type: 'text' },
      description: '도움말 텍스트',
    },
    errorMessage: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
    leftIcon: {
      control: false,
      description: '왼쪽 아이콘 (ReactNode)',
    },
    rightIcon: {
      control: false,
      description: '오른쪽 아이콘 (ReactNode)',
    },
    onChange: {
      action: 'changed',
      description: '입력 변경 이벤트 핸들러',
    },
    onFocus: {
      action: 'focused',
      description: '포커스 이벤트 핸들러',
    },
    onBlur: {
      action: 'blurred',
      description: '블러 이벤트 핸들러',
    },
    onClear: {
      action: 'cleared',
      description: '클리어 버튼 클릭 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary 입력 필드',
    label: 'Primary 라벨',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 입력 필드',
    label: 'Secondary 라벨',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 입력 필드',
    label: 'Tertiary 라벨',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: '작은 입력 필드',
    label: '작은 크기',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: '중간 입력 필드',
    label: '중간 크기',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: '큰 입력 필드',
    label: '큰 크기',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 입력 필드',
    label: '비활성화 상태',
    value: '수정할 수 없는 텍스트',
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: '에러 상태 입력 필드',
    label: '에러 상태',
    errorMessage: '올바른 형식으로 입력해주세요.',
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: '도움말이 있는 입력 필드',
    label: '도움말 포함',
    helperText: '이 필드는 선택사항입니다.',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: '전체 너비 입력 필드',
    label: '전체 너비',
  },
  parameters: {
    layout: 'padded',
  },
};

// Icon stories
export const WithLeftIcon: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    label: '왼쪽 아이콘',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: '이메일을 입력하세요',
    label: '오른쪽 아이콘',
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: '사용자명을 입력하세요',
    label: '양쪽 아이콘',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    ),
  },
};

// Clear button story
export const WithClearButton: Story = {
  args: {
    placeholder: '클리어 버튼 포함',
    label: '클리어 버튼',
    showClearButton: true,
    value: '지울 수 있는 텍스트',
  },
};

// Theme stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: 'Light 테마',
    label: 'Light 테마',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: 'Dark 테마',
    label: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Input types
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'example@email.com',
    label: '이메일',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
    label: '비밀번호',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '숫자를 입력하세요',
    label: '숫자',
    min: 0,
    max: 100,
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: '검색어를 입력하세요',
    label: '검색',
    showClearButton: true,
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
  },
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>변형 (Variants)</h3>
        <Input variant="primary" placeholder="Primary 변형" label="Primary" />
        <Input variant="secondary" placeholder="Secondary 변형" label="Secondary" />
        <Input variant="tertiary" placeholder="Tertiary 변형" label="Tertiary" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>크기 (Sizes)</h3>
        <Input size="small" placeholder="Small 크기" label="Small" />
        <Input size="medium" placeholder="Medium 크기" label="Medium" />
        <Input size="large" placeholder="Large 크기" label="Large" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>상태 (States)</h3>
        <Input placeholder="기본 상태" label="기본" />
        <Input disabled placeholder="비활성화 상태" label="비활성화" value="수정 불가" />
        <Input error placeholder="에러 상태" label="에러" errorMessage="에러 메시지입니다." />
        <Input placeholder="도움말 포함" label="도움말" helperText="도움말 텍스트입니다." />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Input Group stories
export const InputGroupHorizontal: Story = {
  render: () => (
    <InputGroup orientation="horizontal" spacing="medium">
      <Input placeholder="첫 번째" label="필드 1" />
      <Input placeholder="두 번째" label="필드 2" />
      <Input placeholder="세 번째" label="필드 3" />
    </InputGroup>
  ),
};

export const InputGroupVertical: Story = {
  render: () => (
    <InputGroup orientation="vertical" spacing="small">
      <Input placeholder="이름을 입력하세요" label="이름" />
      <Input type="email" placeholder="이메일을 입력하세요" label="이메일" />
      <Input type="tel" placeholder="전화번호를 입력하세요" label="전화번호" />
    </InputGroup>
  ),
};

export const InputGroupConnected: Story = {
  render: () => (
    <InputGroup orientation="horizontal" spacing="none">
      <Input placeholder="도시" label="주소" />
      <Input placeholder="구/군" />
      <Input placeholder="동/읍/면" />
    </InputGroup>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <h3 style={{ margin: 0, textAlign: 'center' }}>회원가입 폼</h3>
      <Input 
        placeholder="사용자명을 입력하세요" 
        label="사용자명" 
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        }
      />
      <Input 
        type="email" 
        placeholder="이메일을 입력하세요" 
        label="이메일" 
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        }
      />
      <Input 
        type="password" 
        placeholder="비밀번호를 입력하세요" 
        label="비밀번호" 
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        }
      />
      <Input 
        type="tel" 
        placeholder="전화번호를 입력하세요" 
        label="전화번호" 
        helperText="'-' 없이 숫자만 입력하세요."
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    placeholder: '플레이그라운드 입력 필드',
    label: '플레이그라운드',
    disabled: false,
    error: false,
    fullWidth: false,
    showClearButton: false,
  },
};
