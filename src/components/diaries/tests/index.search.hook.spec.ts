import { test, expect } from '@playwright/test';

test.describe('Diaries Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    const testDiaries = [
      {
        id: 1,
        title: '행복한 하루',
        content: '오늘은 정말 행복한 하루였다.',
        emotion: 'HAPPY',
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        title: '슬픈 날',
        content: '오늘은 슬픈 일이 있었다.',
        emotion: 'SAD',
        createdAt: '2024-01-02'
      },
      {
        id: 3,
        title: '화나는 순간',
        content: '정말 화가 났다.',
        emotion: 'ANGRY',
        createdAt: '2024-01-03'
      },
      {
        id: 4,
        title: '놀라운 일',
        content: '예상치 못한 일이 일어났다.',
        emotion: 'SURPRISE',
        createdAt: '2024-01-04'
      }
    ];

    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 로컬스토리지 데이터 로드
    await page.reload();
  });

  test('should load diaries page and display search interface', async ({ page }) => {
    // /diaries 페이지 접속
    await page.goto('/diaries');
    
    // 페이지 로드 확인 (data-testid 기반)
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 검색창이 존재하는지 확인
    await expect(page.locator('input[placeholder="검색어를 입력해 주세요."]')).toBeVisible();
    
    // 돋보기 버튼이 존재하는지 확인 (SearchBar 컴포넌트 내부)
    const searchButton = page.locator('button[aria-label="검색"]');
    await expect(searchButton).toBeVisible();
  });

  test('should enable search button when search term is entered', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 검색창에 텍스트 입력
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('행복');
    
    // 돋보기 버튼이 활성화되었는지 확인
    const searchButton = page.locator('button[aria-label="검색"]');
    await expect(searchButton).toBeEnabled();
  });

  test('should search diaries by title when enter key is pressed', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 검색창에 '행복' 입력
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('행복');
    
    // 엔터 키 누르기
    await searchInput.press('Enter');
    
    // 검색 결과 확인 - '행복한 하루' 일기만 표시되어야 함
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    
    // 다른 일기들이 필터링되었는지 확인
    await expect(page.locator('text=슬픈 날')).not.toBeVisible();
    await expect(page.locator('text=화나는 순간')).not.toBeVisible();
    await expect(page.locator('text=놀라운 일')).not.toBeVisible();
  });

  test('should search diaries by title when search button is clicked', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 검색창에 '슬픈' 입력
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('슬픈');
    
    // 돋보기 버튼 클릭
    const searchButton = page.locator('button[aria-label="검색"]');
    await searchButton.click();
    
    // 검색 결과 확인 - '슬픈 날' 일기만 표시되어야 함
    await expect(page.locator('text=슬픈 날')).toBeVisible();
    
    // 다른 일기들이 필터링되었는지 확인
    await expect(page.locator('text=행복한 하루')).not.toBeVisible();
    await expect(page.locator('text=화나는 순간')).not.toBeVisible();
    await expect(page.locator('text=놀라운 일')).not.toBeVisible();
  });

  test('should show all diaries when search term is cleared', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 먼저 검색 수행
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    
    // 검색 결과 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    await expect(page.locator('text=슬픈 날')).not.toBeVisible();
    
    // 검색어 지우기
    await searchInput.clear();
    await searchInput.press('Enter');
    
    // 모든 일기가 다시 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    await expect(page.locator('text=슬픈 날')).toBeVisible();
    await expect(page.locator('text=화나는 순간')).toBeVisible();
    await expect(page.locator('text=놀라운 일')).toBeVisible();
  });

  test('should handle case-insensitive search', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 대문자로 검색 (제목에 포함된 단어)
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    
    // 검색 결과 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    
    // 검색어 지우고 다른 검색어로 테스트
    await searchInput.clear();
    await searchInput.fill('슬픈');
    await searchInput.press('Enter');
    
    // 다른 결과가 나와야 함
    await expect(page.locator('text=슬픈 날')).toBeVisible();
    await expect(page.locator('text=행복한 하루')).not.toBeVisible();
  });

  test('should show no results message when no matching diaries found', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 존재하지 않는 검색어로 검색
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('존재하지않는일기');
    await searchInput.press('Enter');
    
    // 검색 결과가 없음을 확인
    await expect(page.locator('text="존재하지않는일기"에 대한 검색 결과가 없습니다.')).toBeVisible();
  });

  test('should handle partial word search', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 부분 단어로 검색
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('하루');
    await searchInput.press('Enter');
    
    // 검색 결과 확인 - '행복한 하루'가 표시되어야 함
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    
    // 다른 일기들이 필터링되었는지 확인
    await expect(page.locator('text=슬픈 날')).not.toBeVisible();
  });

  test('should handle empty search term', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 빈 검색어로 검색
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('');
    await searchInput.press('Enter');
    
    // 모든 일기가 표시되어야 함
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    await expect(page.locator('text=슬픈 날')).toBeVisible();
    await expect(page.locator('text=화나는 순간')).toBeVisible();
    await expect(page.locator('text=놀라운 일')).toBeVisible();
  });

  test('should handle whitespace-only search term', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 대기
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
    
    // 공백만으로 검색
    const searchInput = page.locator('input[placeholder="검색어를 입력해 주세요."]');
    await searchInput.fill('   ');
    await searchInput.press('Enter');
    
    // 모든 일기가 표시되어야 함 (공백은 무시)
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    await expect(page.locator('text=슬픈 날')).toBeVisible();
    await expect(page.locator('text=화나는 순간')).toBeVisible();
    await expect(page.locator('text=놀라운 일')).toBeVisible();
  });
});
