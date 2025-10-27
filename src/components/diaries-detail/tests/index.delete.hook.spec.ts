import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

test.describe('일기 삭제 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트용 다이어리 데이터 설정
    const testDiaryData = [
      {
        id: 1,
        title: '삭제 테스트 일기 1',
        content: '이 일기는 삭제될 것입니다.',
        emotion: EmotionType.HAPPY,
        createdAt: '2024.01.01'
      },
      {
        id: 2,
        title: '유지될 일기 2',
        content: '이 일기는 유지될 것입니다.',
        emotion: EmotionType.SAD,
        createdAt: '2024.01.02'
      },
      {
        id: 3,
        title: '삭제 테스트 일기 3',
        content: '이 일기도 삭제될 것입니다.',
        emotion: EmotionType.ANGRY,
        createdAt: '2024.01.03'
      }
    ];
    
    await page.goto('/');
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify(data));
    }, testDiaryData);
  });

  test('삭제 모달이 정상적으로 노출되고 닫힌다', async ({ page }) => {
    // 1. /diaries/1에 접속하여 페이지 로드 확인
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]', { timeout: 500 });
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 2. 삭제 버튼 클릭
    const deleteButton = page.locator('button:has-text("삭제")');
    await deleteButton.click();
    
    // 3. 일기삭제 모달이 노출됨을 확인
    await expect(page.getByText('일기 삭제')).toBeVisible();
    await expect(page.getByText('일기를 삭제 하시겠어요?')).toBeVisible();
    
    // 4. "취소" 클릭
    const cancelButton = page.getByTestId('modal-cancel-button');
    await cancelButton.click();
    
    // 5. 모달이 닫힌 것을 확인
    await expect(page.getByText('일기 삭제')).not.toBeVisible();
    
    // 일기가 유지되어 있는지 확인
    await expect(page.getByTestId('diary-title')).toContainText('삭제 테스트 일기 1');
  });

  test('삭제 버튼을 클릭하면 해당 일기가 삭제되고 /diaries로 이동한다', async ({ page }) => {
    // 1. /diaries/1에 접속하여 페이지 로드 확인
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]', { timeout: 500 });
    
    // 페이지 로드 확인
    await expect(page.getByTestId('diary-detail-container')).toBeVisible();
    
    // 삭제 전 일기 데이터 확인
    const diaryDataBefore = await page.evaluate(() => {
      const diariesJson = localStorage.getItem('diaries');
      return diariesJson ? JSON.parse(diariesJson) : [];
    });
    
    expect(diaryDataBefore).toHaveLength(3);
    expect(diaryDataBefore.find((d: any) => d.id === 1)).toBeTruthy();
    
    // 2. 삭제 버튼 클릭
    const deleteButton = page.locator('button:has-text("삭제")');
    await deleteButton.click();
    
    // 3. 일기삭제 모달이 노출됨을 확인
    await expect(page.getByText('일기 삭제')).toBeVisible();
    await expect(page.getByText('일기를 삭제 하시겠어요?')).toBeVisible();
    
    // 4. "삭제" 클릭
    const confirmButton = page.getByTestId('modal-confirm-button');
    await confirmButton.click();
    
    // 5. /diaries로 페이지 이동 확인
    await page.waitForURL('/diaries', { timeout: 500 });
    expect(page.url()).toContain('/diaries');
    
    // 6. 삭제 후 일기 데이터 확인
    await page.goto('/');
    const diaryDataAfter = await page.evaluate(() => {
      const diariesJson = localStorage.getItem('diaries');
      return diariesJson ? JSON.parse(diariesJson) : [];
    });
    
    expect(diaryDataAfter).toHaveLength(2);
    expect(diaryDataAfter.find((d: any) => d.id === 1)).toBeFalsy();
    expect(diaryDataAfter.find((d: any) => d.id === 2)).toBeTruthy();
    expect(diaryDataAfter.find((d: any) => d.id === 3)).toBeTruthy();
  });

  test('여러 일기를 순차적으로 삭제할 수 있다', async ({ page }) => {
    // 첫 번째 일기 삭제
    await page.goto('/diaries/3');
    await page.waitForSelector('[data-testid="diary-detail-container"]', { timeout: 500 });
    
    const deleteButton1 = page.locator('button:has-text("삭제")');
    await deleteButton1.click();
    
    const confirmButton1 = page.getByTestId('modal-confirm-button');
    await confirmButton1.click();
    
    await page.waitForURL('/diaries', { timeout: 500 });
    
    // 삭제 후 확인
    await page.goto('/');
    const diaryDataAfter1 = await page.evaluate(() => {
      const diariesJson = localStorage.getItem('diaries');
      return diariesJson ? JSON.parse(diariesJson) : [];
    });
    
    expect(diaryDataAfter1).toHaveLength(2);
    
    // 두 번째 일기 삭제
    await page.goto('/diaries/2');
    await page.waitForSelector('[data-testid="diary-detail-container"]', { timeout: 500 });
    
    const deleteButton2 = page.locator('button:has-text("삭제")');
    await deleteButton2.click();
    
    const confirmButton2 = page.getByTestId('modal-confirm-button');
    await confirmButton2.click();
    
    await page.waitForURL('/diaries', { timeout: 500 });
    
    // 최종 확인
    await page.goto('/');
    const diaryDataAfter2 = await page.evaluate(() => {
      const diariesJson = localStorage.getItem('diaries');
      return diariesJson ? JSON.parse(diariesJson) : [];
    });
    
    expect(diaryDataAfter2).toHaveLength(1);
    expect(diaryDataAfter2[0].id).toBe(1);
  });
});

