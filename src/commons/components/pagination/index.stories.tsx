import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Pagination from './index';

// Meta configuration for Pagination component
const meta: Meta<typeof Pagination> = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '페이지네이션 컴포넌트입니다. 다양한 스타일과 크기를 지원하며, 첫/마지막 페이지 이동, 이전/다음 페이지 이동 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '페이지네이션의 시각적 스타일 변형',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '페이지네이션의 크기',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '페이지네이션의 테마 (시스템 테마 사용 시 undefined)',
      table: {
        defaultValue: { summary: 'undefined (시스템 테마 사용)' },
      },
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수',
    },
    visiblePages: {
      control: { type: 'number', min: 3, max: 10 },
      description: '한 번에 표시할 페이지 번호 개수',
      table: {
        defaultValue: { summary: '5' },
      },
    },
    onPageChange: {
      action: 'page-changed',
      description: '페이지 변경 이벤트 핸들러',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log('페이지 변경:', page),
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Primary 페이지 변경:', page),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    currentPage: 3,
    totalPages: 8,
    onPageChange: (page: number) => console.log('Secondary 페이지 변경:', page),
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    currentPage: 7,
    totalPages: 12,
    onPageChange: (page: number) => console.log('Tertiary 페이지 변경:', page),
  },
};

// Size stories
export const Small: Story = {
  args: {
    size: 'small',
    currentPage: 2,
    totalPages: 6,
    onPageChange: (page: number) => console.log('Small 페이지 변경:', page),
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    currentPage: 4,
    totalPages: 9,
    onPageChange: (page: number) => console.log('Medium 페이지 변경:', page),
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    currentPage: 6,
    totalPages: 15,
    onPageChange: (page: number) => console.log('Large 페이지 변경:', page),
  },
};

// State stories

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: (page: number) => console.log('첫 페이지:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 20,
    totalPages: 20,
    onPageChange: (page: number) => console.log('마지막 페이지:', page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log('단일 페이지:', page),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    onPageChange: (page: number) => console.log('적은 페이지:', page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 50,
    totalPages: 100,
    onPageChange: (page: number) => console.log('많은 페이지:', page),
  },
};

// Theme stories
export const LightTheme: Story = {
  args: {
    theme: 'light',
    currentPage: 5,
    totalPages: 12,
    onPageChange: (page: number) => console.log('Light 테마:', page),
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    currentPage: 7,
    totalPages: 15,
    onPageChange: (page: number) => console.log('Dark 테마:', page),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Navigation options

// Max visible pages options
export const VisiblePages3: Story = {
  args: {
    currentPage: 10,
    totalPages: 20,
    visiblePages: 3,
    onPageChange: (page: number) => console.log('3개 페이지 표시:', page),
  },
};

export const VisiblePages7: Story = {
  args: {
    currentPage: 15,
    totalPages: 30,
    visiblePages: 7,
    onPageChange: (page: number) => console.log('7개 페이지 표시:', page),
  },
};

// Comprehensive showcase
export const AllVariantsShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>Primary Variant</h3>
        <Pagination
          variant="primary"
          currentPage={5}
          totalPages={10}
          onPageChange={(page) => console.log('Primary:', page)}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>Secondary Variant</h3>
        <Pagination
          variant="secondary"
          currentPage={3}
          totalPages={8}
          onPageChange={(page) => console.log('Secondary:', page)}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>Tertiary Variant</h3>
        <Pagination
          variant="tertiary"
          currentPage={7}
          totalPages={12}
          onPageChange={(page) => console.log('Tertiary:', page)}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>Small Size</h3>
        <Pagination
          size="small"
          currentPage={2}
          totalPages={6}
          onPageChange={(page) => console.log('Small:', page)}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>Medium Size</h3>
        <Pagination
          size="medium"
          currentPage={4}
          totalPages={9}
          onPageChange={(page) => console.log('Medium:', page)}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', fontWeight: '600' }}>Large Size</h3>
        <Pagination
          size="large"
          currentPage={6}
          totalPages={15}
          onPageChange={(page) => console.log('Large:', page)}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};


// Interactive playground component wrapper
const InteractivePlaygroundComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [visiblePages, setVisiblePages] = useState(5);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', maxWidth: '600px' }}>
        {/* Controls */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          width: '100%',
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          backgroundColor: '#f9fafb'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              현재 페이지:
            </label>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages))}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              전체 페이지:
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={totalPages}
              onChange={(e) => {
                const newTotal = Math.max(1, parseInt(e.target.value) || 1);
                setTotalPages(newTotal);
                if (currentPage > newTotal) setCurrentPage(newTotal);
              }}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Variant:
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as 'primary' | 'secondary' | 'tertiary')}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Size:
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value as 'small' | 'medium' | 'large')}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              표시할 페이지 수:
            </label>
            <input
              type="number"
              min="3"
              max="10"
              value={visiblePages}
              onChange={(e) => setVisiblePages(Math.min(Math.max(3, parseInt(e.target.value) || 3), 10))}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>

        {/* Pagination Component */}
        <div style={{ 
          padding: '2rem', 
          border: '2px dashed #d1d5db', 
          borderRadius: '0.5rem',
          backgroundColor: '#ffffff',
          minWidth: '400px'
        }}>
          <Pagination
            variant={variant}
            size={size}
            currentPage={currentPage}
            totalPages={totalPages}
            visiblePages={visiblePages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Current State Display */}
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
          width: '100%'
        }}>
          <strong>현재 상태:</strong><br />
          현재 페이지: {currentPage} / 전체: {totalPages}<br />
          Variant: {variant}, Size: {size}<br />
          표시할 페이지 수: {visiblePages}
        </div>
      </div>
    );
};

export const InteractivePlayground: Story = {
  render: () => <InteractivePlaygroundComponent />,
  parameters: {
    layout: 'padded',
  },
};


// Final playground story for controls
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    currentPage: 5,
    totalPages: 20,
    visiblePages: 5,
    onPageChange: (page: number) => console.log('Playground 페이지 변경:', page),
  },
};
