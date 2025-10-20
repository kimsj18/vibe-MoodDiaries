import { test, expect } from '@playwright/test';

test.describe('회원가입 폼 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // /auth/signup 페이지로 이동
    await page.goto('/auth/signup');
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="auth-signup-form"]', { timeout: 2000 });
  });

  test('모든 인풋이 입력되면 회원가입 버튼이 활성화되어야 함', async ({ page }) => {
    // 이메일 입력
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    
    // 비밀번호 입력
    await page.fill('[data-testid="password-input"]', 'password123');
    
    // 비밀번호 재입력
    await page.fill('[data-testid="password-confirm-input"]', 'password123');
    
    // 이름 입력
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 회원가입 버튼이 활성화되었는지 확인
    const signupButton = page.locator('[data-testid="signup-button"]');
    await expect(signupButton).toBeEnabled();
  });

  test('이메일 형식이 잘못되면 검증 오류가 표시되어야 함', async ({ page }) => {
    // 잘못된 이메일 입력
    await page.fill('[data-testid="email-input"]', 'invalid-email');
    
    // 다른 필드들 입력
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="password-confirm-input"]', 'password123');
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 이메일 오류 메시지 확인
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    
    // 회원가입 버튼이 비활성화되어야 함
    const signupButton = page.locator('[data-testid="signup-button"]');
    await expect(signupButton).toBeDisabled();
  });

  test('비밀번호가 8자리 미만이면 검증 오류가 표시되어야 함', async ({ page }) => {
    // 이메일 입력
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    
    // 8자리 미만 비밀번호 입력
    await page.fill('[data-testid="password-input"]', 'pass123');
    await page.fill('[data-testid="password-confirm-input"]', 'pass123');
    
    // 이름 입력
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 비밀번호 오류 메시지 확인
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
    
    // 회원가입 버튼이 비활성화되어야 함
    const signupButton = page.locator('[data-testid="signup-button"]');
    await expect(signupButton).toBeDisabled();
  });

  test('비밀번호에 영문과 숫자가 모두 포함되지 않으면 검증 오류가 표시되어야 함', async ({ page }) => {
    // 이메일 입력
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    
    // 영문만 포함된 비밀번호 입력
    await page.fill('[data-testid="password-input"]', 'password');
    await page.fill('[data-testid="password-confirm-input"]', 'password');
    
    // 이름 입력
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 비밀번호 오류 메시지 확인
    await expect(page.locator('[data-testid="password-error"]')).toBeVisible();
    
    // 회원가입 버튼이 비활성화되어야 함
    const signupButton = page.locator('[data-testid="signup-button"]');
    await expect(signupButton).toBeDisabled();
  });

  test('비밀번호와 비밀번호 확인이 일치하지 않으면 검증 오류가 표시되어야 함', async ({ page }) => {
    // 이메일 입력
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    
    // 비밀번호 입력
    await page.fill('[data-testid="password-input"]', 'password123');
    
    // 다른 비밀번호 확인 입력
    await page.fill('[data-testid="password-confirm-input"]', 'password456');
    
    // 이름 입력
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 비밀번호 확인 오류 메시지 확인
    await expect(page.locator('[data-testid="password-confirm-error"]')).toBeVisible();
    
    // 회원가입 버튼이 비활성화되어야 함
    const signupButton = page.locator('[data-testid="signup-button"]');
    await expect(signupButton).toBeDisabled();
  });

  test('이름이 입력되지 않으면 검증 오류가 표시되어야 함', async ({ page }) => {
    // 이메일 입력
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    
    // 비밀번호 입력
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="password-confirm-input"]', 'password123');
    
    // 이름 필드에 포커스를 주고 텍스트를 입력한 후 모두 지우기
    await page.focus('[data-testid="name-input"]');
    await page.fill('[data-testid="name-input"]', '홍길동');
    await page.fill('[data-testid="name-input"]', '');
    
    // 다른 필드를 클릭하여 blur 이벤트 발생
    await page.click('[data-testid="email-input"]');
    
    // 잠시 대기
    await page.waitForTimeout(100);
    
    // 이름 오류 메시지 확인
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    
    // 회원가입 버튼이 비활성화되어야 함
    const signupButton = page.locator('[data-testid="signup-button"]');
    await expect(signupButton).toBeDisabled();
  });

  test('회원가입 성공 시 가입완료 모달이 표시되어야 함', async ({ page }) => {
    // 유효한 데이터 입력
    const timestamp = Date.now();
    await page.fill('[data-testid="email-input"]', `test${timestamp}@example.com`);
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="password-confirm-input"]', 'password123');
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 회원가입 버튼 클릭
    await page.click('[data-testid="signup-button"]');
    
    // 가입완료 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="signup-success-modal"]')).toBeVisible();
    
    // 모달 내용 확인
    await expect(page.locator('[data-testid="signup-success-modal"]')).toContainText('가입이 완료되었습니다');
  });

  test('회원가입 실패 시 가입실패 모달이 표시되어야 함', async ({ page }) => {
    // API 모킹 설정 (실패 시나리오)
    await page.route('**/graphql', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [{ message: '이미 존재하는 이메일입니다.' }]
        })
      });
    });
    
    // 유효한 데이터 입력
    await page.fill('[data-testid="email-input"]', 'existing@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="password-confirm-input"]', 'password123');
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 회원가입 버튼 클릭
    await page.click('[data-testid="signup-button"]');
    
    // 가입실패 모달이 표시되는지 확인
    await expect(page.locator('[data-testid="signup-error-modal"]')).toBeVisible();
    
    // 모달 내용 확인
    await expect(page.locator('[data-testid="signup-error-modal"]')).toContainText('가입에 실패했습니다');
  });

  test('가입완료 모달 확인 클릭 시 로그인 페이지로 이동해야 함', async ({ page }) => {
    // 유효한 데이터 입력
    const timestamp = Date.now();
    await page.fill('[data-testid="email-input"]', `test${timestamp}@example.com`);
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="password-confirm-input"]', 'password123');
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 회원가입 버튼 클릭
    await page.click('[data-testid="signup-button"]');
    
    // 가입완료 모달 확인 버튼 클릭
    await page.click('[data-testid="signup-success-modal-confirm"]');
    
    // 로그인 페이지로 이동했는지 확인
    await expect(page).toHaveURL('/auth/login');
  });

  test('가입실패 모달 확인 클릭 시 모달이 닫혀야 함', async ({ page }) => {
    // API 모킹 설정 (실패 시나리오)
    await page.route('**/graphql', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          errors: [{ message: '이미 존재하는 이메일입니다.' }]
        })
      });
    });
    
    // 유효한 데이터 입력
    await page.fill('[data-testid="email-input"]', 'existing@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.fill('[data-testid="password-confirm-input"]', 'password123');
    await page.fill('[data-testid="name-input"]', '홍길동');
    
    // 회원가입 버튼 클릭
    await page.click('[data-testid="signup-button"]');
    
    // 가입실패 모달 확인 버튼 클릭
    await page.click('[data-testid="signup-error-modal-confirm"]');
    
    // 모달이 닫혔는지 확인
    await expect(page.locator('[data-testid="signup-error-modal"]')).not.toBeVisible();
  });
});
