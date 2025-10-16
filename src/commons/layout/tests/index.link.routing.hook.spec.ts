import { test, expect } from '@playwright/test';

test.describe('Layout Link Routing', () => {
  // timeout 설정: 요구사항에 따라 500ms 미만으로 설정하지 않음 (기본값 사용)
  test.beforeEach(async ({ page }) => {
    /**
     * 일기목록 페이지로 이동
     * 레이아웃이 로드될 때까지 대기
     */
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="layout"]');
  });

  test('로고 클릭시 일기목록 페이지로 이동', async ({ page }) => {
    /**
     * 로고 클릭 후 URL 변경 및 페이지 로드 확인
     */
    await page.click('[data-testid="logo"]');
    await expect(page).toHaveURL('/diaries');
    await page.waitForSelector('[data-testid="layout"]');
  });

  test('일기보관함 탭 클릭시 일기목록 페이지로 이동하고 액티브 상태 변경', async ({ page }) => {
    /**
     * 일기보관함 탭 클릭 후 URL 변경 및 액티브 상태 확인
     */
    await page.click('[data-testid="tab-diaries"]');
    await expect(page).toHaveURL('/diaries');
    
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });

  test.skip('사진보관함 탭 클릭시 사진목록 페이지로 이동하고 액티브 상태 변경', async ({ page }) => {
    /**
     * 사진보관함 탭 클릭 후 URL 변경 및 액티브 상태 확인
     * 요구사항에 따라 /pictures 경로는 테스트 skip 대상
     */
    await page.click('[data-testid="tab-pictures"]');
    await expect(page).toHaveURL('/pictures');
    
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    
    await expect(picturesTab).toHaveClass(/tabActive/);
    await expect(diariesTab).toHaveClass(/tabInactive/);
  });

  test('페이지 직접 접근시 올바른 탭 액티브 상태 표시', async ({ page }) => {
    /**
     * 일기목록 페이지 직접 접근 후 액티브 상태 확인
     */
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="layout"]');
    
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });

  test.skip('탭 간 전환시 액티브 상태가 올바르게 변경', async ({ page }) => {
    /**
     * 탭 간 전환시 액티브 상태 변경 확인
     * 사진보관함 관련 테스트이므로 skip 처리
     */
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    
    // 초기 상태 확인
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
    
    // 사진보관함으로 전환
    await picturesTab.click();
    await expect(page).toHaveURL('/pictures');
    await expect(picturesTab).toHaveClass(/tabActive/);
    await expect(diariesTab).toHaveClass(/tabInactive/);
    
    // 다시 일기보관함으로 전환
    await diariesTab.click();
    await expect(page).toHaveURL('/diaries');
    await expect(diariesTab).toHaveClass(/tabActive/);
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });
});