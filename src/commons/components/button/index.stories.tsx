import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

// Meta configuration for Button component
const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'variant(primary/secondary/tertiary) · size(small/medium/large) · theme(light/dark)를 완전 지원하는 버튼',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 시각적 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '버튼의 테마 (시스템 테마 사용 시 undefined)',
      table: {
        defaultValue: { summary: 'undefined (시스템 테마 사용)' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태 (스피너 표시)',
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
    children: {
      control: { type: 'text' },
      description: '버튼 내부 텍스트 또는 콘텐츠',
    },
    leftIcon: {
      control: false,
      description: '왼쪽 아이콘 (ReactNode)',
    },
    rightIcon: {
      control: false,
      description: '오른쪽 아이콘 (ReactNode)',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 버튼',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary 버튼',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary 버튼',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'small',
    children: '작은 버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: '중간 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: '큰 버튼',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화된 버튼',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '로딩 중...',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '전체 너비 버튼',
  },
  parameters: {
    layout: 'padded',
  },
};

// Icon stories
export const WithLeftIcon: Story = {
  args: {
    children: '왼쪽 아이콘',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    children: '오른쪽 아이콘',
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    ),
  },
};

export const WithBothIcons: Story = {
  args: {
    children: '양쪽 아이콘',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    ),
  },
};

// Theme stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    children: 'Light 테마',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    children: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ButtonGroup stories removed per prompt reset

// Figma Design System Stories
// removed Figma-specific stories per prompt reset

// Interactive playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: '플레이그라운드 버튼',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

