import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

test.describe('Diaries Pagination Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // 실제 로컬스토리지 데이터 사용 (Mock 데이터 사용 금지)
    // 기존 로컬스토리지 데이터를 백업하고 테스트용 데이터로 교체
    await page.goto('/diaries');
    
    // 기존 데이터 백업
    const existingData = await page.evaluate(() => {
      return localStorage.getItem('diaries');
    });
    
    // 테스트용 실제 데이터 설정 (25개 일기 - 페이지네이션 테스트용)
    const testDiaries = [
      { id: 1, title: '첫 번째 일기', content: '첫 번째 일기 내용', emotion: EmotionType.HAPPY, createdAt: '2024-01-01' },
      { id: 2, title: '두 번째 일기', content: '두 번째 일기 내용', emotion: EmotionType.SAD, createdAt: '2024-01-02' },
      { id: 3, title: '세 번째 일기', content: '세 번째 일기 내용', emotion: EmotionType.ANGRY, createdAt: '2024-01-03' },
      { id: 4, title: '네 번째 일기', content: '네 번째 일기 내용', emotion: EmotionType.SURPRISE, createdAt: '2024-01-04' },
      { id: 5, title: '다섯 번째 일기', content: '다섯 번째 일기 내용', emotion: EmotionType.ETC, createdAt: '2024-01-05' },
      { id: 6, title: '여섯 번째 일기', content: '여섯 번째 일기 내용', emotion: EmotionType.HAPPY, createdAt: '2024-01-06' },
      { id: 7, title: '일곱 번째 일기', content: '일곱 번째 일기 내용', emotion: EmotionType.SAD, createdAt: '2024-01-07' },
      { id: 8, title: '여덟 번째 일기', content: '여덟 번째 일기 내용', emotion: EmotionType.ANGRY, createdAt: '2024-01-08' },
      { id: 9, title: '아홉 번째 일기', content: '아홉 번째 일기 내용', emotion: EmotionType.SURPRISE, createdAt: '2024-01-09' },
      { id: 10, title: '열 번째 일기', content: '열 번째 일기 내용', emotion: EmotionType.ETC, createdAt: '2024-01-10' },
      { id: 11, title: '열한 번째 일기', content: '열한 번째 일기 내용', emotion: EmotionType.HAPPY, createdAt: '2024-01-11' },
      { id: 12, title: '열두 번째 일기', content: '열두 번째 일기 내용', emotion: EmotionType.SAD, createdAt: '2024-01-12' },
      { id: 13, title: '열세 번째 일기', content: '열세 번째 일기 내용', emotion: EmotionType.ANGRY, createdAt: '2024-01-13' },
      { id: 14, title: '열네 번째 일기', content: '열네 번째 일기 내용', emotion: EmotionType.SURPRISE, createdAt: '2024-01-14' },
      { id: 15, title: '열다섯 번째 일기', content: '열다섯 번째 일기 내용', emotion: EmotionType.ETC, createdAt: '2024-01-15' },
      { id: 16, title: '열여섯 번째 일기', content: '열여섯 번째 일기 내용', emotion: EmotionType.HAPPY, createdAt: '2024-01-16' },
      { id: 17, title: '열일곱 번째 일기', content: '열일곱 번째 일기 내용', emotion: EmotionType.SAD, createdAt: '2024-01-17' },
      { id: 18, title: '열여덟 번째 일기', content: '열여덟 번째 일기 내용', emotion: EmotionType.ANGRY, createdAt: '2024-01-18' },
      { id: 19, title: '열아홉 번째 일기', content: '열아홉 번째 일기 내용', emotion: EmotionType.SURPRISE, createdAt: '2024-01-19' },
      { id: 20, title: '스무 번째 일기', content: '스무 번째 일기 내용', emotion: EmotionType.ETC, createdAt: '2024-01-20' },
      { id: 21, title: '스물한 번째 일기', content: '스물한 번째 일기 내용', emotion: EmotionType.HAPPY, createdAt: '2024-01-21' },
      { id: 22, title: '스물두 번째 일기', content: '스물두 번째 일기 내용', emotion: EmotionType.SAD, createdAt: '2024-01-22' },
      { id: 23, title: '스물세 번째 일기', content: '스물세 번째 일기 내용', emotion: EmotionType.ANGRY, createdAt: '2024-01-23' },
      { id: 24, title: '스물네 번째 일기', content: '스물네 번째 일기 내용', emotion: EmotionType.SURPRISE, createdAt: '2024-01-24' },
      { id: 25, title: '스물다섯 번째 일기', content: '스물다섯 번째 일기 내용', emotion: EmotionType.ETC, createdAt: '2024-01-25' },
    ];

    // 로컬스토리지에 실제 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    
    // 페이지 로드 식별: data-testid 대기 방법 사용 (networkidle 금지)
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
  });

  test('한 페이지에 3행 4열로 총 12개의 일기카드가 노출되는지 확인', async ({ page }) => {
    // 일기 카드 개수 확인 (12개)
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(12);
    
    // 그리드 레이아웃 확인 (3행 4열)
    const cardGrid = page.locator('.cardGrid');
    await expect(cardGrid).toBeVisible();
  });

  test('페이지 번호가 1, 2, 3, 4, 5 형태로 5개 단위로 노출되는지 확인', async ({ page }) => {
    // 페이지네이션 컴포넌트 확인
    const pagination = page.locator('[data-testid="pagination"]');
    await expect(pagination).toBeVisible();
    
    // 페이지 번호 버튼들 확인 (1, 2, 3, 4, 5)
    const pageButtons = pagination.locator('button[data-testid^="page-"]');
    await expect(pageButtons).toHaveCount(5);
    
    // 각 페이지 번호 확인
    for (let i = 1; i <= 5; i++) {
      const pageButton = page.locator(`[data-testid="page-${i}"]`);
      await expect(pageButton).toBeVisible();
    }
  });

  test('페이지번호 클릭 시 해당 페이지번호에 맞는 일기 컨텐츠목록이 보여지는지 확인', async ({ page }) => {
    // 2페이지로 이동
    const page2Button = page.locator('[data-testid="page-2"]');
    await page2Button.click();
    
    // 페이지 변경 대기 (timeout 500ms 미만)
    await page.waitForTimeout(100);
    
    // 2페이지의 일기 카드들 확인 (13-24번 일기)
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(12);
    
    // 첫 번째 카드가 13번 일기인지 확인
    const firstCard = page.locator('[data-testid="diary-card-13"]');
    await expect(firstCard).toBeVisible();
    
    // 마지막 카드가 24번 일기인지 확인
    const lastCard = page.locator('[data-testid="diary-card-24"]');
    await expect(lastCard).toBeVisible();
  });

  test('3페이지로 이동하여 올바른 일기들이 표시되는지 확인', async ({ page }) => {
    // 3페이지로 이동
    const page3Button = page.locator('[data-testid="page-3"]');
    await page3Button.click();
    
    // 페이지 변경 대기 (timeout 500ms 미만)
    await page.waitForTimeout(100);
    
    // 3페이지의 일기 카드들 확인 (25번 일기만 1개)
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
    
    // 25번 일기가 표시되는지 확인
    const card25 = page.locator('[data-testid="diary-card-25"]');
    await expect(card25).toBeVisible();
  });

  test('검색창에 검색어를 입력하여 검색하고 검색 결과에 맞게 페이지 수가 변경되었는지 확인', async ({ page }) => {
    // 검색창에 "첫 번째" 입력
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('첫 번째');
    
    // 검색 실행
    const searchButton = page.locator('[data-testid="search-button"]');
    await searchButton.click();
    
    // 검색 결과 대기 (timeout 500ms 미만)
    await page.waitForTimeout(100);
    
    // 검색 결과가 1개이므로 페이지네이션이 1페이지만 표시되는지 확인
    const pagination = page.locator('[data-testid="pagination"]');
    const pageButtons = pagination.locator('button[data-testid^="page-"]');
    await expect(pageButtons).toHaveCount(1);
    
    // 검색된 일기 카드가 1개인지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
    
    // 첫 번째 일기가 표시되는지 확인
    const firstDiary = page.locator('[data-testid="diary-card-1"]');
    await expect(firstDiary).toBeVisible();
  });

  test('필터선택박스 클릭하여 메뉴 선택시, 선택한 emotion과 일치하는 일기 카드들로 페이지 수가 변경되었는지 확인', async ({ page }) => {
    // 필터 선택박스 클릭
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await filterSelect.click();
    
    // "행복해요" 옵션 선택
    const happyOption = page.locator('[data-testid="filter-option-HAPPY"]');
    await happyOption.click();
    
    // 필터 적용 대기 (timeout 500ms 미만)
    await page.waitForTimeout(100);
    
    // HAPPY 감정의 일기들만 필터링되어 페이지 수가 변경되는지 확인
    // HAPPY 감정의 일기: 1, 6, 11, 16, 21번 (5개)
    const pagination = page.locator('[data-testid="pagination"]');
    const pageButtons = pagination.locator('button[data-testid^="page-"]');
    await expect(pageButtons).toHaveCount(1); // 5개이므로 1페이지만 표시
    
    // 필터된 일기 카드가 5개인지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);
    
    // HAPPY 감정의 일기들이 표시되는지 확인
    const happyDiaries = [1, 6, 11, 16, 21];
    for (const id of happyDiaries) {
      const card = page.locator(`[data-testid="diary-card-${id}"]`);
      await expect(card).toBeVisible();
    }
  });
});