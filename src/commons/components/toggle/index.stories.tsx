import type { Meta, StoryObj } from '@storybook/react';
import { Toggle, ToggleGroup } from './index';

// Meta configuration for Toggle component
const meta: Meta<typeof Toggle> = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 토글 스위치 컴포넌트입니다. Primary, Secondary, Tertiary 변형과 Light/Dark 테마를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '토글의 시각적 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '토글의 크기',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '토글의 테마 (시스템 테마 사용 시 undefined)',
      table: {
        defaultValue: { summary: 'undefined (시스템 테마 사용)' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: '토글 활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '토글 비활성화 상태',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: { type: 'text' },
      description: '토글 라벨',
    },
    description: {
      control: { type: 'text' },
      description: '토글 설명 텍스트',
    },
    onChange: {
      action: 'changed',
      description: '토글 상태 변경 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: '기본 토글',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary 토글',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary 토글',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    label: 'Tertiary 토글',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'small',
    label: '작은 토글',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: '중간 토글',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: '큰 토글',
  },
};

// State stories
export const Checked: Story = {
  args: {
    checked: true,
    label: '활성화된 토글',
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    label: '비활성화된 토글',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: '비활성화된 토글',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: '비활성화된 활성 토글',
  },
};

// With description
export const WithDescription: Story = {
  args: {
    label: '알림 설정',
    description: '새로운 메시지가 도착하면 알림을 받습니다.',
  },
};

export const WithLongDescription: Story = {
  args: {
    label: '개인정보 수집 동의',
    description: '서비스 이용을 위한 필수 개인정보 수집 및 이용에 동의합니다. 자세한 내용은 개인정보처리방침을 참고하세요.',
  },
};

// Theme stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    label: 'Light 테마',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    label: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>변형 (Variants)</h3>
        <Toggle variant="primary" label="Primary 변형" />
        <Toggle variant="secondary" label="Secondary 변형" />
        <Toggle variant="tertiary" label="Tertiary 변형" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>크기 (Sizes)</h3>
        <Toggle size="small" label="Small 크기" />
        <Toggle size="medium" label="Medium 크기" />
        <Toggle size="large" label="Large 크기" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>상태 (States)</h3>
        <Toggle label="기본 상태" />
        <Toggle checked label="활성화 상태" />
        <Toggle disabled label="비활성화 상태" />
        <Toggle disabled checked label="비활성화된 활성 상태" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Toggle Group stories
export const ToggleGroupVertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" spacing="medium">
      <Toggle label="이메일 알림" description="새로운 이메일이 도착하면 알림을 받습니다." />
      <Toggle label="푸시 알림" description="앱에서 푸시 알림을 받습니다." />
      <Toggle label="SMS 알림" description="중요한 알림을 SMS로 받습니다." />
    </ToggleGroup>
  ),
};

export const ToggleGroupHorizontal: Story = {
  render: () => (
    <ToggleGroup orientation="horizontal" spacing="large">
      <Toggle label="Wi-Fi" />
      <Toggle label="Bluetooth" />
      <Toggle label="위치 서비스" />
    </ToggleGroup>
  ),
};

export const ToggleGroupConnected: Story = {
  render: () => (
    <ToggleGroup orientation="vertical" spacing="small">
      <Toggle label="자동 저장" description="변경사항을 자동으로 저장합니다." />
      <Toggle label="자동 백업" description="데이터를 자동으로 백업합니다." />
      <Toggle label="자동 동기화" description="다른 기기와 자동으로 동기화합니다." />
    </ToggleGroup>
  ),
};

// Settings example
export const SettingsExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ margin: 0, textAlign: 'center' }}>계정 설정</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>알림 설정</h4>
        <Toggle 
          label="이메일 알림" 
          description="새로운 메시지와 업데이트를 이메일로 받습니다."
          checked
        />
        <Toggle 
          label="푸시 알림" 
          description="실시간 알림을 받습니다."
          checked
        />
        <Toggle 
          label="마케팅 알림" 
          description="프로모션과 특별 혜택 정보를 받습니다."
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>개인정보 설정</h4>
        <Toggle 
          label="프로필 공개" 
          description="다른 사용자가 내 프로필을 볼 수 있습니다."
          checked
        />
        <Toggle 
          label="활동 내역 공개" 
          description="내 활동 내역을 다른 사용자가 볼 수 있습니다."
        />
        <Toggle 
          label="검색 허용" 
          description="검색 결과에 내 프로필이 표시됩니다."
          checked
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>접근성</h4>
        <Toggle 
          label="고대비 모드" 
          description="더 나은 가독성을 위해 고대비 색상을 사용합니다."
        />
        <Toggle 
          label="큰 글씨" 
          description="텍스트 크기를 크게 표시합니다."
        />
        <Toggle 
          label="애니메이션 줄이기" 
          description="화면 전환 애니메이션을 줄입니다."
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Different sizes showcase
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <h3 style={{ margin: 0 }}>크기 비교</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Toggle size="small" label="Small" />
        <Toggle size="medium" label="Medium" />
        <Toggle size="large" label="Large" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Toggle size="small" label="Small (checked)" checked />
        <Toggle size="medium" label="Medium (checked)" checked />
        <Toggle size="large" label="Large (checked)" checked />
      </div>
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
    label: '플레이그라운드 토글',
    description: '이 토글을 사용해서 다양한 설정을 테스트해보세요.',
    checked: false,
    disabled: false,
  },
};