import { test, expect } from '@playwright/test';

test.describe('Layout Link Routing', () => {
  test.beforeEach(async ({ page }) => {
    // 일기목록 페이지로 이동
    await page.goto('/diaries');
    // 레이아웃이 로드될 때까지 대기
    await page.waitForSelector('[data-testid="layout"]');
  });

  test('로고 클릭시 일기목록 페이지로 이동', async ({ page }) => {
    // 로고 클릭
    await page.click('[data-testid="logo"]');
    
    // URL이 /diaries로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries');
    
    // 일기목록 페이지가 로드되었는지 확인
    await page.waitForSelector('[data-testid="layout"]');
  });

  test('일기보관함 탭 클릭시 일기목록 페이지로 이동하고 액티브 상태 변경', async ({ page }) => {
    // 일기보관함 탭 클릭
    await page.click('[data-testid="tab-diaries"]');
    
    // URL이 /diaries로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries');
    
    // 일기보관함 탭이 액티브 상태인지 확인
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // 사진보관함 탭이 비활성 상태인지 확인
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });

  test('사진보관함 탭 클릭시 사진목록 페이지로 이동하고 액티브 상태 변경', async ({ page }) => {
    // 사진보관함 탭 클릭
    await page.click('[data-testid="tab-pictures"]');
    
    // URL이 /pictures로 변경되었는지 확인
    await expect(page).toHaveURL('/pictures');
    
    // 사진보관함 탭이 액티브 상태인지 확인
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    await expect(picturesTab).toHaveClass(/tabActive/);
    
    // 일기보관함 탭이 비활성 상태인지 확인
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    await expect(diariesTab).toHaveClass(/tabInactive/);
  });

  test('페이지 직접 접근시 올바른 탭 액티브 상태 표시', async ({ page }) => {
    // 일기목록 페이지에 직접 접근
    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="layout"]');
    
    // 일기보관함 탭이 액티브 상태인지 확인
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    await expect(diariesTab).toHaveClass(/tabActive/);
    
    // 사진보관함 탭이 비활성 상태인지 확인
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    await expect(picturesTab).toHaveClass(/tabInactive/);
  });

  test('탭 간 전환시 액티브 상태가 올바르게 변경', async ({ page }) => {
    // 초기 상태: 일기보관함이 액티브
    const diariesTab = page.locator('[data-testid="tab-diaries"]');
    const picturesTab = page.locator('[data-testid="tab-pictures"]');
    
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