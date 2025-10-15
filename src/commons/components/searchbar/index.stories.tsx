import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar, SearchBarGroup } from './index';

// Meta configuration for SearchBar component
const meta: Meta<typeof SearchBar> = {
  title: 'Commons/Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 검색 컴포넌트입니다. Primary, Secondary, Tertiary 변형과 Light/Dark 테마를 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바의 시각적 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '검색바의 크기',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '검색바의 테마 (시스템 테마 사용 시 undefined)',
      table: {
        defaultValue: { summary: 'undefined (시스템 테마 사용)' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '검색바 비활성화 상태',
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
    showClearButton: {
      control: { type: 'boolean' },
      description: '클리어 버튼 표시',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showSearchIcon: {
      control: { type: 'boolean' },
      description: '검색 아이콘 표시',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    autoFocus: {
      control: { type: 'boolean' },
      description: '자동 포커스',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
      table: {
        defaultValue: { summary: '검색어를 입력하세요' },
      },
    },
    value: {
      control: { type: 'text' },
      description: '검색바 값',
    },
    debounceMs: {
      control: { type: 'number' },
      description: '디바운스 지연 시간 (밀리초)',
      table: {
        defaultValue: { summary: '300' },
      },
    },
    onChange: {
      action: 'changed',
      description: '입력 변경 이벤트 핸들러',
    },
    onSearch: {
      action: 'searched',
      description: '검색 이벤트 핸들러',
    },
    onClear: {
      action: 'cleared',
      description: '클리어 버튼 클릭 이벤트 핸들러',
    },
    onFocus: {
      action: 'focused',
      description: '포커스 이벤트 핸들러',
    },
    onBlur: {
      action: 'blurred',
      description: '블러 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary 검색바',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary 검색바',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary 검색바',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: '작은 검색바',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: '중간 검색바',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: '큰 검색바',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 검색바',
    value: '수정할 수 없는 검색어',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: '로딩 중인 검색바',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: '전체 너비 검색바',
  },
  parameters: {
    layout: 'padded',
  },
};

// Feature stories
export const WithoutSearchIcon: Story = {
  args: {
    showSearchIcon: false,
    placeholder: '검색 아이콘 없는 검색바',
  },
};

export const WithoutClearButton: Story = {
  args: {
    showClearButton: false,
    placeholder: '클리어 버튼 없는 검색바',
    value: '지울 수 없는 텍스트',
  },
};

export const WithValue: Story = {
  args: {
    value: '기본 검색어',
    placeholder: '검색어를 입력하세요',
  },
};

export const AutoFocus: Story = {
  args: {
    autoFocus: true,
    placeholder: '자동 포커스 검색바',
  },
};

export const CustomDebounce: Story = {
  args: {
    debounceMs: 1000,
    placeholder: '1초 디바운스 검색바',
  },
};

// Theme stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: 'Light 테마 검색바',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: 'Dark 테마 검색바',
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
        <SearchBar variant="primary" placeholder="Primary 변형" />
        <SearchBar variant="secondary" placeholder="Secondary 변형" />
        <SearchBar variant="tertiary" placeholder="Tertiary 변형" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>크기 (Sizes)</h3>
        <SearchBar size="small" placeholder="Small 크기" />
        <SearchBar size="medium" placeholder="Medium 크기" />
        <SearchBar size="large" placeholder="Large 크기" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>상태 (States)</h3>
        <SearchBar placeholder="기본 상태" />
        <SearchBar disabled placeholder="비활성화 상태" value="수정 불가" />
        <SearchBar loading placeholder="로딩 상태" />
        <SearchBar value="검색어 입력됨" placeholder="값이 있는 상태" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// SearchBar Group stories
export const SearchBarGroupHorizontal: Story = {
  render: () => (
    <SearchBarGroup orientation="horizontal" spacing="medium">
      <SearchBar placeholder="첫 번째 검색" />
      <SearchBar placeholder="두 번째 검색" />
      <SearchBar placeholder="세 번째 검색" />
    </SearchBarGroup>
  ),
};

export const SearchBarGroupVertical: Story = {
  render: () => (
    <SearchBarGroup orientation="vertical" spacing="small">
      <SearchBar placeholder="제목 검색" />
      <SearchBar placeholder="내용 검색" />
      <SearchBar placeholder="작성자 검색" />
    </SearchBarGroup>
  ),
};

export const SearchBarGroupConnected: Story = {
  render: () => (
    <SearchBarGroup orientation="horizontal" spacing="none">
      <SearchBar placeholder="카테고리" />
      <SearchBar placeholder="키워드" />
      <SearchBar placeholder="태그" />
    </SearchBarGroup>
  ),
};

// Search examples
export const ProductSearch: Story = {
  args: {
    placeholder: '상품명, 브랜드, 카테고리 검색',
    size: 'large',
    variant: 'primary',
  },
};

export const UserSearch: Story = {
  args: {
    placeholder: '사용자명 또는 이메일 검색',
    size: 'medium',
    variant: 'secondary',
  },
};

export const ContentSearch: Story = {
  args: {
    placeholder: '제목, 내용, 태그 검색',
    size: 'medium',
    variant: 'tertiary',
    showClearButton: true,
  },
};

// Advanced features
export const SearchWithFilters: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ margin: 0, textAlign: 'center' }}>필터와 함께 사용</h3>
      <SearchBar 
        placeholder="전체 검색" 
        size="large" 
        variant="primary" 
        fullWidth 
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <SearchBar 
          placeholder="제목" 
          size="small" 
          variant="secondary" 
          style={{ flex: 1 }}
        />
        <SearchBar 
          placeholder="작성자" 
          size="small" 
          variant="secondary" 
          style={{ flex: 1 }}
        />
        <SearchBar 
          placeholder="태그" 
          size="small" 
          variant="secondary" 
          style={{ flex: 1 }}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const SearchHistory: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
      <h3 style={{ margin: 0, textAlign: 'center' }}>검색 기록</h3>
      <SearchBar 
        placeholder="검색어를 입력하세요" 
        variant="primary" 
        fullWidth 
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
        <div>최근 검색어:</div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f1f5f9', borderRadius: '0.25rem' }}>React</span>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f1f5f9', borderRadius: '0.25rem' }}>TypeScript</span>
          <span style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f1f5f9', borderRadius: '0.25rem' }}>Storybook</span>
        </div>
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
    placeholder: '플레이그라운드 검색바',
    disabled: false,
    loading: false,
    fullWidth: false,
    showClearButton: true,
    showSearchIcon: true,
    autoFocus: false,
    debounceMs: 300,
  },
};
