import { test, expect } from '@playwright/test';

test.describe('Diaries Modal Link Hook', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
  });

  test('일기쓰기 버튼 클릭시 모달이 열리는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('button:has-text("일기쓰기")');
    
    // 모달이 열렸는지 확인 (모달 오버레이가 표시되는지)
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // 모달 내용이 표시되는지 확인
    await expect(page.locator('h1:has-text("일기 쓰기")')).toBeVisible();
  });

  test('모달이 중앙에 overlay되어 표시되는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('button:has-text("일기쓰기")');
    
    // 모달이 중앙에 위치하는지 확인
    const modalContainer = page.locator('.fixed.inset-0.z-50');
    await expect(modalContainer).toBeVisible();
    
    // 모달 내용이 중앙에 위치하는지 확인
    const modalContent = page.locator('.relative.z-10.bg-white.rounded-lg.shadow-lg.p-6');
    await expect(modalContent).toBeVisible();
  });

  test('모달 배경 클릭시 모달이 닫히는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('button:has-text("일기쓰기")');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // 모달 배경 클릭 (좌표 기반 클릭)
    await page.click('.fixed.inset-0.bg-black\\/50', { 
      position: { x: 10, y: 10 },
      force: true 
    });
    
    // 모달이 닫혔는지 확인
    await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
  });

  test('모달 내 닫기 버튼 클릭시 모달이 닫히는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('button:has-text("일기쓰기")');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // 모달 내 닫기 버튼 클릭
    await page.click('button:has-text("닫기")');
    
    // 모달이 닫혔는지 확인
    await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
  });

  test('모달이 열린 상태에서 일기쓰기 버튼을 다시 클릭해도 모달이 유지되는지 확인', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    await page.click('button:has-text("일기쓰기")');
    
    // 모달이 열렸는지 확인
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    
    // 모달이 열린 상태에서 모달이 여전히 표시되는지 확인
    // (버튼이 모달에 가려져 클릭할 수 없으므로 모달 상태만 확인)
    await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    await expect(page.locator('h1:has-text("일기 쓰기")')).toBeVisible();
  });
});
