import { test, expect } from '@playwright/test';

test.describe('회고쓰기 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트용 다이어리 데이터 설정
    const testDiaryData = [
      {
        id: 1,
        title: '테스트 다이어리',
        content: '테스트 내용입니다.',
        emotion: 'happy',
        createdAt: '2024.01.01'
      }
    ];
    
    await page.goto('/');
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify(data));
    }, testDiaryData);
  });

  test('회고 등록 인풋이 입력되면 입력버튼이 활성화되어야 함', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 회고 입력 필드와 버튼 찾기
    const retrospectInput = page.locator('input[placeholder="회고를 남겨보세요."]');
    const submitButton = page.locator('button:has-text("입력")');
    
    // 입력 필드가 존재하는지 확인
    await expect(retrospectInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    // 입력 필드에 텍스트 입력
    await retrospectInput.fill('테스트 회고입니다.');
    
    // 입력 후: 버튼이 활성화되어야 함
    await expect(submitButton).toBeEnabled();
  });

  test('회고 등록 시 로컬스토리지에 저장되어야 함', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 회고 입력 및 등록
    const retrospectInput = page.locator('input[placeholder="회고를 남겨보세요."]');
    const submitButton = page.locator('button:has-text("입력")');
    
    await retrospectInput.fill('새로운 회고입니다.');
    await submitButton.click();
    
    // 로컬스토리지에서 retrospects 데이터 확인
    const retrospectsData = await page.evaluate(() => {
      return localStorage.getItem('retrospects');
    });
    
    expect(retrospectsData).not.toBeNull();
    
    const retrospects = JSON.parse(retrospectsData!);
    expect(retrospects).toHaveLength(1);
    expect(retrospects[0]).toMatchObject({
      id: 1,
      content: '새로운 회고입니다.',
      diaryId: 1,
      createdAt: expect.any(String)
    });
  });

  test('기존 회고가 있을 때 새 회고 등록 시 ID가 증가해야 함', async ({ page }) => {
    // 기존 회고 데이터 설정
    const existingRetrospects = [
      {
        id: 1,
        content: '기존 회고',
        diaryId: 1,
        createdAt: '2024.01.01'
      }
    ];
    
    await page.goto('/');
    await page.evaluate((data) => {
      localStorage.setItem('retrospects', JSON.stringify(data));
    }, existingRetrospects);
    
    await page.goto('/diaries/1');
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 새 회고 입력 및 등록
    const retrospectInput = page.locator('input[placeholder="회고를 남겨보세요."]');
    const submitButton = page.locator('button:has-text("입력")');
    
    await retrospectInput.fill('두 번째 회고입니다.');
    await submitButton.click();
    
    // 로컬스토리지에서 retrospects 데이터 확인
    const retrospectsData = await page.evaluate(() => {
      return localStorage.getItem('retrospects');
    });
    
    const retrospects = JSON.parse(retrospectsData!);
    expect(retrospects).toHaveLength(2);
    expect(retrospects[1]).toMatchObject({
      id: 2,
      content: '두 번째 회고입니다.',
      diaryId: 1,
      createdAt: expect.any(String)
    });
  });

  test('회고 등록 완료 후 페이지가 새로고침되어야 함', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 회고 입력 및 등록
    const retrospectInput = page.locator('input[placeholder="회고를 남겨보세요."]');
    const submitButton = page.locator('button:has-text("입력")');
    
    await retrospectInput.fill('새로고침 테스트 회고입니다.');
    await submitButton.click();
    
    // 페이지 새로고침 확인 (입력 필드가 비어있어야 함)
    await expect(retrospectInput).toHaveValue('');
  });
});
