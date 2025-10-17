import { test, expect } from '@playwright/test';

test.describe('일기쓰기 모달 닫기 기능 - TDD 기반 Playwright 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.click('[data-testid="diary-write-button"]');
    
    // 일기쓰기 모달이 열릴 때까지 대기
    await page.waitForSelector('[data-testid="diary-write-modal"]', { timeout: 500 });
  });

  test('닫기 버튼 클릭시 등록취소 모달이 2중 모달로 표시되어야 함', async ({ page }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="diary-close-button"]');
    
    // 등록취소 모달이 표시되는지 확인
    const cancelModal = page.locator('[data-testid="cancel-confirmation-modal"]');
    await expect(cancelModal).toBeVisible({ timeout: 500 });
    
    // 기존 일기쓰기 모달도 여전히 존재하는지 확인 (2중 모달)
    const diaryModal = page.locator('[data-testid="diary-write-modal"]');
    await expect(diaryModal).toBeVisible();
    
    // 등록취소 모달이 일기쓰기 모달 위에 표시되는지 확인 (z-index)
    const cancelModalZIndex = await cancelModal.evaluate(el => 
      window.getComputedStyle(el.closest('[class*="modalOverlay"]') || el).zIndex
    );
    const diaryModalZIndex = await diaryModal.evaluate(el => 
      window.getComputedStyle(el.closest('[class*="modalOverlay"]') || el).zIndex
    );
    
    expect(parseInt(cancelModalZIndex)).toBeGreaterThan(parseInt(diaryModalZIndex));
  });

  test('등록취소 모달의 계속작성 버튼 클릭시 등록취소 모달만 닫혀야 함', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diary-close-button"]');
    
    // 등록취소 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).toBeVisible({ timeout: 500 });
    
    // 계속작성 버튼 클릭
    await page.click('[data-testid="continue-writing-button"]');
    
    // 등록취소 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).not.toBeVisible({ timeout: 500 });
    
    // 일기쓰기 모달은 여전히 열려있는지 확인
    await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible();
  });

  test('등록취소 모달의 등록취소 버튼 클릭시 모든 모달이 닫혀야 함', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diary-close-button"]');
    
    // 등록취소 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).toBeVisible({ timeout: 500 });
    
    // 등록취소 버튼 클릭
    await page.click('[data-testid="cancel-registration-button"]');
    
    // 모든 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="cancel-confirmation-modal"]')).not.toBeVisible({ timeout: 500 });
    await expect(page.locator('[data-testid="diary-write-modal"]')).not.toBeVisible({ timeout: 500 });
    
    // /diaries 페이지로 돌아갔는지 확인
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
  });

  test('등록취소 모달이 올바른 variant와 actions로 렌더링되어야 함', async ({ page }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diary-close-button"]');
    
    // 등록취소 모달 확인
    const cancelModal = page.locator('[data-testid="cancel-confirmation-modal"]');
    await expect(cancelModal).toBeVisible({ timeout: 500 });
    
    // Modal 컴포넌트가 info variant로 렌더링되는지 확인
    await expect(cancelModal.locator('.variant-info')).toBeVisible();
    
    // dual actions로 렌더링되는지 확인 (두 개의 버튼)
    await expect(cancelModal.locator('.actions-dual')).toBeVisible();
    
    // 버튼 텍스트 확인
    await expect(page.locator('[data-testid="continue-writing-button"]')).toHaveText('계속작성');
    await expect(page.locator('[data-testid="cancel-registration-button"]')).toHaveText('등록취소');
  });
});
