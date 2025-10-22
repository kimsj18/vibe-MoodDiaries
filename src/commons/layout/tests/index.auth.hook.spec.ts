import { test, expect } from '@playwright/test';

test.describe('인증 상태 표시 기능 테스트', () => {
  test.describe('비로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      /**
       * 페이지 이동 후 로컬스토리지 초기화
       * 비로그인 상태로 테스트 환경 설정
       */
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
    });

    test('비회원으로 /diaries에 접속하여 페이지 로드 확인', async ({ page }) => {
      /**
       * 비로그인 상태에서 일기목록 페이지 접속
       * 페이지 로드 완료 확인
       */
      await page.goto('/diaries');
      
      // 페이지 로드 완료 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="layout"]');
    });

    test('layout의 로그인버튼 노출여부 확인', async ({ page }) => {
      /**
       * 비로그인 상태에서 레이아웃의 인증 UI 확인
       * 로그인 버튼은 노출되고, 로그아웃 버튼과 유저명은 숨겨져야 함
       */
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout"]');
      
      await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="logout-button"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="user-name"]')).not.toBeVisible();
    });

    test('로그인버튼 클릭하여 /auth/login 페이지로 이동', async ({ page }) => {
      /**
       * 로그인 버튼 클릭 후 로그인 페이지로 이동 확인
       */
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout"]');
      
      await page.locator('[data-testid="login-button"]').click();
      await expect(page).toHaveURL('/auth/login');
    });
  });

  test.describe('로그인 유저 시나리오', () => {
    test('로그인 프로세스 및 인증 상태 표시 확인', async ({ page }) => {
      /**
       * 전체 로그인 프로세스 및 인증 상태 UI 변경 확인
       * 1. 로그인 페이지 접속
       * 2. 로그인 시도
       * 3. 로그인 성공 후 모달 처리
       * 4. 인증 상태 UI 확인
       * 5. 로그아웃 처리
       * 6. 비로그인 상태 UI 확인
       */
      
      // 1. 비회원으로 /auth/login에 접속하여 페이지 로드 확인
      await page.goto('/auth/login');
      await page.waitForSelector('[data-testid="auth-login-container"]');

      // 2. 로그인 시도
      await page.fill('[data-testid="email-input"]', 'a@c.com');
      await page.fill('[data-testid="password-input"]', '1234qwer');
      await page.click('[data-testid="login-button"]');

      // 3. 로그인 성공 후, 완료 모달 클릭하여 /diaries 페이지 로드 확인
      await expect(page.locator('[data-testid="login-success-modal"]')).toBeVisible({ timeout: 3000 });
      await page.click('[data-testid="modal-confirm-button"]');
      await expect(page).toHaveURL('/diaries');
      await page.waitForSelector('[data-testid="layout"]');

      // 4. layout에서 유저이름, 로그아웃버튼 노출여부 확인
      await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
      await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="login-button"]')).not.toBeVisible();

      // 5. 로그아웃버튼 클릭하여 /auth/login 페이지 로드 확인
      await page.click('[data-testid="logout-button"]');
      await expect(page).toHaveURL('/auth/login');

      // 6. /diaries에 접속하여 페이지 로드 확인
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="layout"]');

      // 7. layout에 로그인버튼 노출여부 확인
      await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="logout-button"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="user-name"]')).not.toBeVisible();
    });
  });
});
