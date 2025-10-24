import { test, expect } from '@playwright/test';

test.describe('디버그 테스트', () => {
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

  test('페이지 로드 확인', async ({ page }) => {
    await page.goto('/diaries/1');
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 페이지 내용 확인
    const title = page.getByTestId('diary-title');
    const content = page.getByTestId('diary-content');
    
    console.log('Title element:', await title.count());
    console.log('Content element:', await content.count());
    
    // 페이지 내용 확인
    const pageContent = await page.textContent('body');
    console.log('Page content:', pageContent);
    
    if (await title.count() > 0) {
      await expect(title).toBeVisible();
    }
    
    if (await content.count() > 0) {
      await expect(content).toBeVisible();
    }
  });
});
