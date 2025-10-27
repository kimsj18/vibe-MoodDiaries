import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// 테스트용 일기 데이터
const testDiaries = [
  {
    id: 1,
    title: '첫 번째 일기',
    content: '첫 번째 일기 내용',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    title: '두 번째 일기',
    content: '두 번째 일기 내용',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-02'
  },
  {
    id: 3,
    title: '세 번째 일기',
    content: '세 번째 일기 내용',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-03'
  },
  {
    id: 4,
    title: '네 번째 일기',
    content: '네 번째 일기 내용',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-01-04'
  },
  {
    id: 5,
    title: '다섯 번째 일기',
    content: '다섯 번째 일기 내용',
    emotion: EmotionType.ETC,
    createdAt: '2024-01-05'
  }
];

test.describe('일기 삭제 기능 - TDD 기반 Playwright 테스트', () => {
  test.describe('비로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 로컬스토리지에 테스트 데이터 설정
      await page.goto('/diaries');
      await page.evaluate((diaries) => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
      }, testDiaries);
      
      // 전역 변수 설정 (비로그인 상태)
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = false;
      });
      
      // 페이지 새로고침하여 데이터 로드
      await page.reload();
      
      // 페이지 로드 대기
      await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
      
      // 추가 대기 시간 (데이터 로딩을 위해)
      await page.waitForTimeout(100);
    });

    test('/diaries에 접속하여 페이지 로드 확인', async ({ page }) => {
      // 페이지가 로드되었는지 확인
      const diariesPage = page.locator('[data-testid="diaries-page"]');
      await expect(diariesPage).toBeVisible();
    });

    test('일기카드 각각의 삭제아이콘(X) 미노출 확인', async ({ page }) => {
      // 일기 카드들이 로드되었는지 확인
      const diaryCards = page.locator('[data-testid^="diary-card-"]');
      await expect(diaryCards).toHaveCount(testDiaries.length);
      
      // 삭제 버튼이 노출되지 않는지 확인
      const deleteButtons = page.locator('[data-testid^="delete-button-"]');
      await expect(deleteButtons).toHaveCount(0);
    });
  });

  test.describe('로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 로컬스토리지에 테스트 데이터 설정
      await page.goto('/diaries');
      await page.evaluate((diaries) => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
      }, testDiaries);
      
      // 전역 변수 설정 (로그인 상태)
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = true;
      });
      
      // 페이지 새로고침하여 데이터 로드
      await page.reload();
      
      // 페이지 로드 대기
      await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
      
      // 추가 대기 시간 (데이터 로딩을 위해)
      await page.waitForTimeout(100);
    });

    test('/diaries에 접속하여 페이지 로드 확인', async ({ page }) => {
      // 페이지가 로드되었는지 확인
      const diariesPage = page.locator('[data-testid="diaries-page"]');
      await expect(diariesPage).toBeVisible();
    });

    test('일기카드 각각의 삭제아이콘(X) 노출 확인', async ({ page }) => {
      // 일기 카드들이 로드되었는지 확인
      const diaryCards = page.locator('[data-testid^="diary-card-"]');
      await expect(diaryCards).toHaveCount(testDiaries.length);
      
      // 삭제 버튼이 노출되는지 확인
      for (let i = 0; i < testDiaries.length; i++) {
        const diary = testDiaries[i];
        const deleteButton = page.locator(`[data-testid="delete-button-${diary.id}"]`);
        await expect(deleteButton).toBeVisible();
      }
    });

    test('삭제아이콘(X) 클릭 시 일기삭제 모달 노출 확인', async ({ page }) => {
      // 첫 번째 일기의 삭제 버튼 클릭
      const firstDeleteButton = page.locator('[data-testid="delete-button-1"]');
      await firstDeleteButton.click();
      
      // 삭제 모달이 노출되는지 확인
      const deleteModal = page.locator('[data-testid="diary-delete-modal"]');
      await expect(deleteModal).toBeVisible({ timeout: 500 });
      
      // 모달 내용 확인
      await expect(deleteModal).toContainText('일기 삭제');
      await expect(deleteModal).toContainText('일기를 삭제 하시겠어요?');
    });

    test('삭제 모달의 "취소" 버튼 클릭 시 모달 닫기', async ({ page }) => {
      // 첫 번째 일기의 삭제 버튼 클릭
      const firstDeleteButton = page.locator('[data-testid="delete-button-1"]');
      await firstDeleteButton.click();
      
      // 삭제 모달이 노출되는지 확인
      const deleteModal = page.locator('[data-testid="diary-delete-modal"]');
      await expect(deleteModal).toBeVisible({ timeout: 500 });
      
      // "취소" 버튼 클릭
      const cancelButton = page.locator('[data-testid="diary-delete-cancel-button"]');
      await cancelButton.click();
      
      // 모달이 닫혔는지 확인
      await expect(deleteModal).not.toBeVisible({ timeout: 500 });
      
      // 일기가 삭제되지 않았는지 확인 (여전히 5개)
      const diaryCards = page.locator('[data-testid^="diary-card-"]');
      await expect(diaryCards).toHaveCount(testDiaries.length);
    });

    test('삭제 모달의 "삭제" 버튼 클릭 시 일기 삭제 및 페이지 새로고침', async ({ page }) => {
      // 첫 번째 일기의 삭제 버튼 클릭
      const firstDeleteButton = page.locator('[data-testid="delete-button-1"]');
      await firstDeleteButton.click();
      
      // 삭제 모달이 노출되는지 확인
      const deleteModal = page.locator('[data-testid="diary-delete-modal"]');
      await expect(deleteModal).toBeVisible({ timeout: 500 });
      
      // "삭제" 버튼 클릭
      const confirmButton = page.locator('[data-testid="diary-delete-confirm-button"]');
      await confirmButton.click();
      
      // 모달이 닫혔는지 확인
      await expect(deleteModal).not.toBeVisible({ timeout: 500 });
      
      // 페이지가 새로고침되어 삭제된 일기가 보이지 않는지 확인
      await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
      
      // 일기 카드가 하나 줄어들었는지 확인
      const diaryCards = page.locator('[data-testid^="diary-card-"]');
      await expect(diaryCards).toHaveCount(testDiaries.length - 1);
      
      // 첫 번째 일기(id: 1)가 삭제되었으므로 두 번째 일기(id: 2)부터 시작해야 함
      const diary2 = page.locator('[data-testid="diary-card-2"]');
      await expect(diary2).toBeVisible();
    });

    test('여러 일기 삭제 시나리오', async ({ page }) => {
      // 첫 번째 일기 삭제
      const firstDeleteButton = page.locator('[data-testid="delete-button-1"]');
      await firstDeleteButton.click();
      await expect(page.locator('[data-testid="diary-delete-modal"]')).toBeVisible({ timeout: 500 });
      await page.locator('[data-testid="diary-delete-confirm-button"]').click();
      await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
      
      // 두 번째 일기 삭제
      const secondDeleteButton = page.locator('[data-testid="delete-button-2"]');
      await secondDeleteButton.click();
      await expect(page.locator('[data-testid="diary-delete-modal"]')).toBeVisible({ timeout: 500 });
      await page.locator('[data-testid="diary-delete-confirm-button"]').click();
      await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
      
      // 일기 카드가 2개 줄어들었는지 확인
      const diaryCards = page.locator('[data-testid^="diary-card-"]');
      await expect(diaryCards).toHaveCount(testDiaries.length - 2);
      
      // 세 번째 일기부터 시작하는지 확인
      const diary3 = page.locator('[data-testid="diary-card-3"]');
      await expect(diary3).toBeVisible();
    });

    test('삭제 버튼 클릭 시 카드 상세페이지로 이동하지 않음', async ({ page }) => {
      // 현재 URL 저장
      const currentUrl = page.url();
      
      // 삭제 버튼 클릭
      const deleteButton = page.locator('[data-testid="delete-button-1"]');
      await deleteButton.click();
      
      // 모달이 열렸는지 확인
      await expect(page.locator('[data-testid="diary-delete-modal"]')).toBeVisible({ timeout: 500 });
      
      // URL이 변경되지 않았는지 확인
      expect(page.url()).toBe(currentUrl);
    });
  });
});

