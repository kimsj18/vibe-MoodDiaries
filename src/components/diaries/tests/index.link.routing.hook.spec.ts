import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// 테스트용 일기 데이터
const testDiaries = [
  {
    id: 1,
    title: '첫 번째 일기',
    content: '오늘은 정말 행복한 하루였다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    title: '두 번째 일기',
    content: '오늘은 조금 슬픈 일이 있었다.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-02'
  },
  {
    id: 3,
    title: '세 번째 일기',
    content: '오늘은 화가 났다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-03'
  }
];

test.describe('일기 카드 링크 라우팅 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 로드
    await page.reload();
    
    // 페이지가 완전히 로드될 때까지 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-page"]');
  });

  test('일기 카드 클릭 시 상세 페이지로 이동해야 한다', async ({ page }) => {
    // 첫 번째 일기 카드가 로드될 때까지 대기
    const firstCard = page.locator('.styles_diaryCard').first();
    await expect(firstCard).toBeVisible();
    
    // 일기 카드 클릭
    await firstCard.click();
    
    // URL이 올바른 상세 페이지로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries/1');
  });

  test('두 번째 일기 카드 클릭 시 해당 ID의 상세 페이지로 이동해야 한다', async ({ page }) => {
    // 두 번째 일기 카드가 로드될 때까지 대기
    const secondCard = page.locator('.styles_diaryCard').nth(1);
    await expect(secondCard).toBeVisible();
    
    // 일기 카드 클릭
    await secondCard.click();
    
    // URL이 올바른 상세 페이지로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries/2');
  });

  test('세 번째 일기 카드 클릭 시 해당 ID의 상세 페이지로 이동해야 한다', async ({ page }) => {
    // 세 번째 일기 카드가 로드될 때까지 대기
    const thirdCard = page.locator('.styles_diaryCard').nth(2);
    await expect(thirdCard).toBeVisible();
    
    // 일기 카드 클릭
    await thirdCard.click();
    
    // URL이 올바른 상세 페이지로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries/3');
  });

  test('삭제 버튼 클릭 시 페이지 이동하지 않아야 한다', async ({ page }) => {
    // 첫 번째 일기 카드의 삭제 버튼이 로드될 때까지 대기
    const deleteButton = page.locator('.styles_closeButton').first();
    await expect(deleteButton).toBeVisible();
    
    // 현재 URL 저장
    const currentUrl = page.url();
    
    // 삭제 버튼 클릭
    await deleteButton.click();
    
    // URL이 변경되지 않았는지 확인 (짧은 대기 후)
    await page.waitForTimeout(100);
    expect(page.url()).toBe(currentUrl);
  });

  test('일기 카드에 cursor: pointer 스타일이 적용되어야 한다', async ({ page }) => {
    // 첫 번째 일기 카드가 로드될 때까지 대기
    const firstCard = page.locator('.styles_diaryCard').first();
    await expect(firstCard).toBeVisible();
    
    // cursor 스타일이 pointer인지 확인
    const cursorStyle = await firstCard.evaluate((element) => {
      return window.getComputedStyle(element).cursor;
    });
    
    expect(cursorStyle).toBe('pointer');
  });

  test('일기가 없을 때 카드가 표시되지 않아야 한다', async ({ page }) => {
    // 로컬스토리지 비우기
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });
    
    // 페이지 새로고침
    await page.reload();
    
    // 페이지가 완전히 로드될 때까지 대기
    await page.waitForSelector('[data-testid="diaries-page"]');
    
    // 일기 카드가 없는지 확인
    const cards = page.locator('.styles_diaryCard');
    await expect(cards).toHaveCount(0);
    
    // "작성된 일기가 없습니다" 메시지 확인
    await expect(page.locator('text=작성된 일기가 없습니다')).toBeVisible();
  });
});
