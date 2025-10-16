import { test, expect } from '@playwright/test';

test.describe('Area Hook - UI Visibility Tests', () => {
  // 테스트 skip 대상: /auth/login, /auth/signup, /pictures
  
  test('일기목록 페이지(/diaries)에서 모든 영역이 노출되어야 함', async ({ page }) => {
    await page.goto('/diaries');
    
    // 페이지 로드 완료 대기 (layout data-testid 기준)
    await page.waitForSelector('[data-testid="layout"]');
    
    // header 영역 및 로고 노출 확인
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();
    
    // banner 영역 노출 확인
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();
    
    // navigation 영역 노출 확인
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeVisible();
    
    // footer 영역 노출 확인
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test('일기상세 페이지(/diaries/1)에서 header, footer만 노출되고 banner, navigation은 숨겨져야 함', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="layout"]');
    
    // header 영역 및 로고 노출 확인
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();
    
    // banner 영역 숨김 확인
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeHidden();
    
    // navigation 영역 숨김 확인
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeHidden();
    
    // footer 영역 노출 확인
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test('루트 페이지(/)에서 기본 UI 노출 상태 확인', async ({ page }) => {
    await page.goto('/');
    
    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="layout"]');
    
    // 기본적으로 모든 영역이 노출되어야 함 (일기목록과 동일)
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();
    
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();
    
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeVisible();
    
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });

  test('존재하지 않는 경로에서 기본 UI 노출 상태 확인', async ({ page }) => {
    await page.goto('/nonexistent');
    
    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="layout"]');
    
    // 알 수 없는 경로에서는 기본적으로 모든 영역이 노출되어야 함
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();
    
    const banner = page.locator('[data-testid="banner"]');
    await expect(banner).toBeVisible();
    
    const navigation = page.locator('[data-testid="navigation"]');
    await expect(navigation).toBeVisible();
    
    const footer = page.locator('[data-testid="footer"]');
    await expect(footer).toBeVisible();
  });
});
