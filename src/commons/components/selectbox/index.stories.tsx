import type { Meta, StoryObj } from '@storybook/react';
import { SelectBox, SelectBoxGroup } from './index';

// Meta configuration for SelectBox component
const meta: Meta<typeof SelectBox> = {
  title: 'Commons/Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 상태를 지원하는 선택 박스 컴포넌트입니다. Primary, Secondary, Tertiary 변형과 Light/Dark 테마를 지원하며, 단일/다중 선택, 검색, 그룹화 등의 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '선택 박스의 시각적 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '선택 박스의 크기',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '선택 박스의 테마 (시스템 테마 사용 시 undefined)',
      table: {
        defaultValue: { summary: 'undefined (시스템 테마 사용)' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '선택 박스 비활성화 상태',
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
    searchable: {
      control: { type: 'boolean' },
      description: '검색 기능 활성화',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: { type: 'boolean' },
      description: '클리어 버튼 표시',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    multiple: {
      control: { type: 'boolean' },
      description: '다중 선택 모드',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
      table: {
        defaultValue: { summary: '선택해주세요' },
      },
    },
    maxHeight: {
      control: { type: 'number' },
      description: '드롭다운 최대 높이 (px)',
      table: {
        defaultValue: { summary: '200' },
      },
    },
    options: {
      control: false,
      description: '선택 가능한 옵션 배열',
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
      description: '선택 변경 이벤트 핸들러',
    },
    onSearch: {
      action: 'searched',
      description: '검색 이벤트 핸들러',
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

// Sample options for stories
const basicOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
  { value: 'option5', label: '옵션 5' },
];

const countryOptions = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'de', label: '독일' },
  { value: 'fr', label: '프랑스' },
  { value: 'uk', label: '영국' },
  { value: 'ca', label: '캐나다' },
];

const groupedOptions = [
  { value: 'seoul', label: '서울', group: '수도권' },
  { value: 'incheon', label: '인천', group: '수도권' },
  { value: 'gyeonggi', label: '경기', group: '수도권' },
  { value: 'busan', label: '부산', group: '영남권' },
  { value: 'daegu', label: '대구', group: '영남권' },
  { value: 'ulsan', label: '울산', group: '영남권' },
  { value: 'gwangju', label: '광주', group: '호남권' },
  { value: 'jeonnam', label: '전남', group: '호남권' },
  { value: 'jeonbuk', label: '전북', group: '호남권' },
];

const disabledOptions = [
  { value: 'available1', label: '사용 가능한 옵션 1' },
  { value: 'disabled1', label: '비활성화된 옵션 1', disabled: true },
  { value: 'available2', label: '사용 가능한 옵션 2' },
  { value: 'disabled2', label: '비활성화된 옵션 2', disabled: true },
  { value: 'available3', label: '사용 가능한 옵션 3' },
];

// Default story
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: '옵션을 선택하세요',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    options: basicOptions,
    placeholder: 'Primary 선택 박스',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    options: basicOptions,
    placeholder: 'Secondary 선택 박스',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    options: basicOptions,
    placeholder: 'Tertiary 선택 박스',
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'small',
    options: basicOptions,
    placeholder: '작은 선택 박스',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    options: basicOptions,
    placeholder: '중간 선택 박스',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    options: basicOptions,
    placeholder: '큰 선택 박스',
  },
};

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    options: basicOptions,
    placeholder: '비활성화된 선택 박스',
    value: 'option1',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    options: basicOptions,
    placeholder: '로딩 중...',
  },
};

export const Error: Story = {
  args: {
    error: true,
    options: basicOptions,
    placeholder: '에러 상태 선택 박스',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    options: basicOptions,
    placeholder: '전체 너비 선택 박스',
  },
  parameters: {
    layout: 'padded',
  },
};

// Feature stories
export const Searchable: Story = {
  args: {
    searchable: true,
    options: countryOptions,
    placeholder: '국가를 검색하고 선택하세요',
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
    options: basicOptions,
    placeholder: '클리어 가능한 선택 박스',
    value: 'option1',
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    options: basicOptions,
    placeholder: '다중 선택 가능',
  },
};

export const MultipleWithSearch: Story = {
  args: {
    multiple: true,
    searchable: true,
    clearable: true,
    options: countryOptions,
    placeholder: '다중 선택 + 검색',
  },
};

// Grouped options
export const GroupedOptions: Story = {
  args: {
    options: groupedOptions,
    placeholder: '지역을 선택하세요',
  },
};

export const GroupedWithSearch: Story = {
  args: {
    searchable: true,
    options: groupedOptions,
    placeholder: '지역을 검색하고 선택하세요',
  },
};

// Disabled options
export const WithDisabledOptions: Story = {
  args: {
    options: disabledOptions,
    placeholder: '일부 옵션이 비활성화됨',
  },
};

// Icon stories
export const WithLeftIcon: Story = {
  args: {
    options: countryOptions,
    placeholder: '국가 선택',
    leftIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    options: basicOptions,
    placeholder: '설정 선택',
    rightIcon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
      </svg>
    ),
  },
};

// Theme stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    options: basicOptions,
    placeholder: 'Light 테마',
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    options: basicOptions,
    placeholder: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Custom max height
export const CustomMaxHeight: Story = {
  args: {
    options: countryOptions,
    placeholder: '높이 제한 (100px)',
    maxHeight: 100,
  },
};

// Comprehensive showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>변형 (Variants)</h3>
        <SelectBox variant="primary" options={basicOptions} placeholder="Primary 변형" />
        <SelectBox variant="secondary" options={basicOptions} placeholder="Secondary 변형" />
        <SelectBox variant="tertiary" options={basicOptions} placeholder="Tertiary 변형" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>크기 (Sizes)</h3>
        <SelectBox size="small" options={basicOptions} placeholder="Small 크기" />
        <SelectBox size="medium" options={basicOptions} placeholder="Medium 크기" />
        <SelectBox size="large" options={basicOptions} placeholder="Large 크기" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>상태 (States)</h3>
        <SelectBox options={basicOptions} placeholder="기본 상태" />
        <SelectBox disabled options={basicOptions} placeholder="비활성화 상태" value="option1" />
        <SelectBox loading options={basicOptions} placeholder="로딩 상태" />
        <SelectBox error options={basicOptions} placeholder="에러 상태" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <h3 style={{ margin: 0, textAlign: 'center' }}>기능 (Features)</h3>
        <SelectBox searchable options={countryOptions} placeholder="검색 가능" />
        <SelectBox clearable options={basicOptions} placeholder="클리어 가능" value="option1" />
        <SelectBox multiple options={basicOptions} placeholder="다중 선택" />
        <SelectBox options={groupedOptions} placeholder="그룹화된 옵션" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// SelectBox Group stories
export const SelectBoxGroupHorizontal: Story = {
  render: () => (
    <SelectBoxGroup orientation="horizontal" spacing="medium">
      <SelectBox options={[{ value: 'year', label: '2024' }, { value: 'year2', label: '2023' }]} placeholder="년도" />
      <SelectBox options={[{ value: 'month', label: '12월' }, { value: 'month2', label: '11월' }]} placeholder="월" />
      <SelectBox options={[{ value: 'day', label: '25일' }, { value: 'day2', label: '24일' }]} placeholder="일" />
    </SelectBoxGroup>
  ),
};

export const SelectBoxGroupVertical: Story = {
  render: () => (
    <SelectBoxGroup orientation="vertical" spacing="small">
      <SelectBox options={countryOptions} placeholder="국가 선택" />
      <SelectBox options={groupedOptions} placeholder="지역 선택" />
      <SelectBox options={basicOptions} placeholder="세부 옵션" />
    </SelectBoxGroup>
  ),
};

export const SelectBoxGroupConnected: Story = {
  render: () => (
    <SelectBoxGroup orientation="horizontal" spacing="none">
      <SelectBox options={[{ value: 'http', label: 'HTTP' }, { value: 'https', label: 'HTTPS' }]} placeholder="프로토콜" />
      <SelectBox options={[{ value: 'www', label: 'www' }, { value: 'api', label: 'api' }]} placeholder="서브도메인" />
      <SelectBox options={[{ value: 'com', label: '.com' }, { value: 'net', label: '.net' }]} placeholder="도메인" />
    </SelectBoxGroup>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
      <h3 style={{ margin: 0, textAlign: 'center' }}>사용자 정보 입력</h3>
      <SelectBox 
        options={countryOptions}
        placeholder="국가를 선택하세요"
        searchable
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        }
      />
      <SelectBox 
        options={groupedOptions}
        placeholder="지역을 선택하세요"
        searchable
      />
      <SelectBox 
        options={[
          { value: 'frontend', label: '프론트엔드 개발자' },
          { value: 'backend', label: '백엔드 개발자' },
          { value: 'fullstack', label: '풀스택 개발자' },
          { value: 'mobile', label: '모바일 개발자' },
          { value: 'devops', label: 'DevOps 엔지니어' },
        ]}
        placeholder="직업을 선택하세요"
        clearable
      />
      <SelectBox 
        options={[
          { value: 'javascript', label: 'JavaScript' },
          { value: 'typescript', label: 'TypeScript' },
          { value: 'python', label: 'Python' },
          { value: 'java', label: 'Java' },
          { value: 'csharp', label: 'C#' },
          { value: 'go', label: 'Go' },
          { value: 'rust', label: 'Rust' },
        ]}
        placeholder="관심 있는 언어를 선택하세요"
        multiple
        searchable
        clearable
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
    options: basicOptions,
    placeholder: '플레이그라운드 선택 박스',
    disabled: false,
    loading: false,
    error: false,
    fullWidth: false,
    searchable: false,
    clearable: false,
    multiple: false,
    maxHeight: 200,
  },
};
