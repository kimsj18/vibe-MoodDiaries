import { test, expect } from '@playwright/test';

test.describe('일기쓰기 버튼 권한분기 테스트', () => {
  test.describe('비로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 비로그인 상태 설정 (전역변수 false로 설정)
      await page.addInitScript(() => {
        window.__TEST_BYPASS__ = false;
      });
    });

    test('일기쓰기 버튼 클릭 시 로그인 요청 모달이 노출되어야 한다', async ({ page }) => {
      // 1. /diaries에 접속하여 페이지 로드 확인
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });

      // 2. 일기쓰기 버튼 클릭
      const writeButton = page.locator('[data-testid="diary-write-button"]');
      await expect(writeButton).toBeVisible();
      await writeButton.click();

      // 3. 로그인 요청 모달 노출 여부 확인
      // 모달 제목 확인 (heading role로 더 구체적으로 선택)
      await expect(page.getByRole('heading', { name: '로그인이 필요합니다' })).toBeVisible({ timeout: 500 });
      
      // 모달 메시지 확인
      await expect(page.getByText('이 기능을 사용하려면 로그인이 필요합니다. 로그인하시겠습니까?')).toBeVisible();
      
      // 로그인하러가기 버튼 확인
      await expect(page.getByRole('button', { name: '로그인하러가기' })).toBeVisible();
      
      // 취소 버튼 확인
      await expect(page.getByRole('button', { name: '취소' })).toBeVisible();
    });
  });

  test.describe('로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 로그인 상태 설정 (전역변수 true로 설정)
      await page.addInitScript(() => {
        window.__TEST_BYPASS__ = true;
      });
    });

    test('일기쓰기 버튼 클릭 시 일기쓰기 페이지 모달이 노출되어야 한다', async ({ page }) => {
      // 1. /diaries에 접속하여 페이지 로드 확인
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });

      // 2. 일기쓰기 버튼 클릭
      const writeButton = page.locator('[data-testid="diary-write-button"]');
      await expect(writeButton).toBeVisible();
      await writeButton.click();

      // 3. 일기쓰기 페이지 모달 노출 여부 확인
      // DiariesNew 컴포넌트의 data-testid 확인
      await expect(page.locator('[data-testid="diary-write-modal"]')).toBeVisible({ timeout: 500 });
      
      // 일기쓰기 제목 확인
      await expect(page.getByText('일기 쓰기')).toBeVisible();
      
      // 오늘 기분 질문 확인
      await expect(page.getByText('오늘 기분은 어땠나요?')).toBeVisible();
    });
  });
});