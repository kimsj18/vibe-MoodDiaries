import { test, expect } from '@playwright/test';

test.describe('간단한 페이지 로드 테스트', () => {
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

  test('페이지가 로드되는지 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 페이지 내용 확인
    await expect(page.getByTestId('diary-title')).toBeVisible();
    await expect(page.getByTestId('diary-content')).toBeVisible();
  });
});
