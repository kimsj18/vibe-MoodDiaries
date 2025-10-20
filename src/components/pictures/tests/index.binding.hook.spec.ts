import { test, expect } from '@playwright/test';

test.describe('Pictures 컴포넌트 - 강아지 사진 목록 조회', () => {
  test.beforeEach(async ({ page }) => {
    // /pictures 페이지로 이동
    await page.goto('/pictures');
    
    // 페이지 로드 완료 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
  });

  test('페이지 로드시 강아지 목록 조회 API 요청 및 성공 시나리오', async ({ page }) => {
    // API 요청 모니터링
    const apiResponse = page.waitForResponse(response => 
      response.url().includes('https://dog.ceo/api/breeds/image/random/6') && 
      response.status() === 200
    );

    // 페이지 새로고침하여 API 요청 트리거
    await page.reload();
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });

    // API 응답 확인
    const response = await apiResponse;
    const responseData = await response.json();
    
    // 응답 데이터 구조 확인
    expect(responseData).toHaveProperty('message');
    expect(responseData).toHaveProperty('status');
    expect(responseData.status).toBe('success');
    expect(Array.isArray(responseData.message)).toBe(true);
    expect(responseData.message).toHaveLength(6);
    
    // 모든 이미지 URL이 dog.ceo 도메인인지 확인
    responseData.message.forEach((imageUrl: string) => {
      expect(imageUrl).toContain('dog.ceo');
    });
  });

  test('로딩 중 스플래시 스크린 표시', async ({ page }) => {
    // 페이지 새로고침
    await page.reload();
    
    // 스플래시 스크린 확인 (6개)
    const splashScreens = page.locator('[data-testid="splash-screen"]');
    await expect(splashScreens).toHaveCount(6);
    
    // 스플래시 스크린 스타일 확인 (회색 배경, 흰 세로줄)
    const firstSplash = splashScreens.first();
    await expect(firstSplash).toBeVisible();
    
    // 로딩 완료 후 스플래시 스크린 사라짐 확인
    await page.waitForSelector('[data-testid="pictures-grid"]', { timeout: 2000 });
    await expect(splashScreens).toHaveCount(0);
  });

  test('강아지 사진 6마리 표시 확인', async ({ page }) => {
    // 사진 그리드 대기
    await page.waitForSelector('[data-testid="pictures-grid"]', { timeout: 2000 });
    
    // 6마리 강아지 사진 확인
    const pictureItems = page.locator('[data-testid="picture-item"]');
    await expect(pictureItems).toHaveCount(6);
    
    // 각 이미지가 로드되었는지 확인
    for (let i = 0; i < 6; i++) {
      const img = pictureItems.nth(i).locator('img');
      await expect(img).toBeVisible();
      
      // 이미지 src가 dog.ceo 도메인인지 확인
      const src = await img.getAttribute('src');
      expect(src).toContain('dog.ceo');
    }
  });

  test('무한스크롤 - 마지막 2마리 강아지만 남은 상태에서 추가 로드', async ({ page }) => {
    // 첫 번째 로드 완료 대기
    await page.waitForSelector('[data-testid="pictures-grid"]', { timeout: 2000 });
    
    // 초기 6마리 확인
    let pictureItems = page.locator('[data-testid="picture-item"]');
    await expect(pictureItems).toHaveCount(6);
    
    // 마지막 2번째 아이템으로 스크롤 (무한스크롤 트리거)
    const fourthItem = pictureItems.nth(3); // 0-based index, 4번째 아이템
    await fourthItem.scrollIntoViewIfNeeded();
    
    // 추가 API 요청 대기
    await page.waitForResponse(response => 
      response.url().includes('https://dog.ceo/api/breeds/image/random/6') && 
      response.status() === 200,
      { timeout: 2000 }
    );
    
    // 추가 로드 후 12마리 확인
    await page.waitForFunction(() => {
      const items = document.querySelectorAll('[data-testid="picture-item"]');
      return items.length === 12;
    }, { timeout: 2000 });
    
    pictureItems = page.locator('[data-testid="picture-item"]');
    await expect(pictureItems).toHaveCount(12);
  });

  test('API 실패 시나리오 - 모킹된 실패 응답', async ({ page }) => {
    // API 실패 모킹
    await page.route('**/api/breeds/image/random/6', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ 
          message: 'Internal Server Error',
          status: 'error' 
        })
      });
    });
    
    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="pictures-container"]', { timeout: 2000 });
    
    // 에러 상태 확인
    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible({ timeout: 1000 });
    await expect(errorMessage).toContainText('사진을 불러오는데 실패했습니다');
  });
});