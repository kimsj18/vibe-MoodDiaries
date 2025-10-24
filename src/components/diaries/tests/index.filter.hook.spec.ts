import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

test.describe('Diaries Filter Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    const testDiaries = [
      {
        id: 1,
        title: '행복한 하루',
        content: '오늘은 정말 행복한 하루였어요!',
        emotion: EmotionType.HAPPY,
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        title: '슬픈 하루',
        content: '오늘은 정말 슬픈 하루였어요.',
        emotion: EmotionType.SAD,
        createdAt: '2024-01-02'
      },
      {
        id: 3,
        title: '화난 하루',
        content: '오늘은 정말 화가 났어요.',
        emotion: EmotionType.ANGRY,
        createdAt: '2024-01-03'
      },
      {
        id: 4,
        title: '놀라운 하루',
        content: '오늘은 정말 놀라운 하루였어요!',
        emotion: EmotionType.SURPRISE,
        createdAt: '2024-01-04'
      },
      {
        id: 5,
        title: '기타 하루',
        content: '오늘은 특별한 하루였어요.',
        emotion: EmotionType.ETC,
        createdAt: '2024-01-05'
      }
    ];

    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]');
  });

  test('필터 선택박스 클릭 시 올바른 메뉴 옵션들이 표시되는지 확인', async ({ page }) => {
    // 필터 선택박스 클릭
    await page.click('[data-testid="emotion-filter-select"]');
    
    // 드롭다운 메뉴가 표시되는지 확인
    await expect(page.locator('[data-testid="filter-dropdown"]')).toBeVisible();
    
    // 각 emotion 옵션이 올바르게 표시되는지 확인
    await expect(page.locator('[data-testid="filter-option-all"]')).toHaveText('전체');
    await expect(page.locator('[data-testid="filter-option-HAPPY"]')).toHaveText('행복해요');
    await expect(page.locator('[data-testid="filter-option-SAD"]')).toHaveText('슬퍼요');
    await expect(page.locator('[data-testid="filter-option-SURPRISE"]')).toHaveText('놀랐어요');
    await expect(page.locator('[data-testid="filter-option-ANGRY"]')).toHaveText('화나요');
    await expect(page.locator('[data-testid="filter-option-ETC"]')).toHaveText('기타');
  });

  test('행복해요 필터 선택 시 HAPPY emotion 일기만 노출되는지 확인', async ({ page }) => {
    // 행복해요 필터 선택
    await page.click('[data-testid="emotion-filter-select"]');
    await page.click('[data-testid="filter-option-HAPPY"]');
    
    // 필터 적용을 위해 잠시 대기
    await page.waitForTimeout(100);
    
    // HAPPY emotion 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
  });

  test('슬퍼요 필터 선택 시 SAD emotion 일기만 노출되는지 확인', async ({ page }) => {
    // 슬퍼요 필터 선택
    await page.click('[data-testid="emotion-filter-select"]');
    await page.click('[data-testid="filter-option-SAD"]');
    
    // 필터 적용을 위해 잠시 대기
    await page.waitForTimeout(100);
    
    // SAD emotion 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
    await expect(page.locator('[data-testid="diary-card-2"]')).toBeVisible();
  });

  test('화나요 필터 선택 시 ANGRY emotion 일기만 노출되는지 확인', async ({ page }) => {
    // 화나요 필터 선택
    await page.click('[data-testid="emotion-filter-select"]');
    await page.click('[data-testid="filter-option-ANGRY"]');
    
    // 필터 적용을 위해 잠시 대기
    await page.waitForTimeout(100);
    
    // ANGRY emotion 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
    await expect(page.locator('[data-testid="diary-card-3"]')).toBeVisible();
  });

  test('놀랐어요 필터 선택 시 SURPRISE emotion 일기만 노출되는지 확인', async ({ page }) => {
    // 놀랐어요 필터 선택
    await page.click('[data-testid="emotion-filter-select"]');
    await page.click('[data-testid="filter-option-SURPRISE"]');
    
    // 필터 적용을 위해 잠시 대기
    await page.waitForTimeout(100);
    
    // SURPRISE emotion 일기만 노출되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
    await expect(page.locator('[data-testid="diary-card-4"]')).toBeVisible();
  });

  test('전체 필터 선택 시 모든 일기가 노출되는지 확인', async ({ page }) => {
    // 먼저 특정 필터를 선택한 후
    await page.click('[data-testid="emotion-filter-select"]');
    await page.click('[data-testid="filter-option-HAPPY"]');
    
    // 전체 필터로 다시 변경
    await page.click('[data-testid="emotion-filter-select"]');
    await page.click('[data-testid="filter-option-all"]');
    
    // 모든 일기가 노출되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);
  });

  test('검색 결과에 필터 적용 시 올바르게 작동하는지 확인', async ({ page }) => {
    // 먼저 검색 수행
    await page.fill('[data-testid="search-input"]', '하루');
    await page.click('[data-testid="search-button"]');
    
    // 검색 결과 확인 (모든 일기가 '하루'라는 단어를 포함)
    let diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);
    
    // 행복해요 필터 적용
    await page.click('[data-testid="emotion-filter-select"]');
    await page.click('[data-testid="filter-option-HAPPY"]');
    
    // 필터 적용을 위해 잠시 대기
    await page.waitForTimeout(100);
    
    // 검색된 결과 중에서 HAPPY emotion 일기만 노출되는지 확인
    diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
    await expect(page.locator('[data-testid="diary-card-1"]')).toBeVisible();
  });
});
