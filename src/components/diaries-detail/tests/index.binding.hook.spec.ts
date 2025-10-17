import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// 테스트 데이터 타입 정의
interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

test.describe('DiariesDetail Binding Hook Tests', () => {
  // 테스트용 실제 데이터
  const testDiaries: DiaryData[] = [
    {
      id: 1,
      title: '첫 번째 일기',
      content: '오늘은 정말 행복한 하루였다. 새로운 프로젝트를 시작했고, 팀원들과 좋은 아이디어를 많이 나눴다.',
      emotion: EmotionType.HAPPY,
      createdAt: '2024. 10. 17'
    },
    {
      id: 2,
      title: '두 번째 일기',
      content: '조금 슬픈 하루였다. 예상했던 결과가 나오지 않아서 아쉬웠지만, 다음에는 더 잘할 수 있을 것 같다.',
      emotion: EmotionType.SAD,
      createdAt: '2024. 10. 16'
    },
    {
      id: 3,
      title: '세 번째 일기',
      content: '화가 나는 일이 있었다. 하지만 감정을 조절하고 차분하게 해결책을 찾으려고 노력했다.',
      emotion: EmotionType.ANGRY,
      createdAt: '2024. 10. 15'
    }
  ];

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 실제 테스트 데이터 설정
    await page.addInitScript((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
  });

  test('should display diary detail with correct data binding for id 1', async ({ page }) => {
    // 다이어리 상세 페이지로 이동
    await page.goto('/diaries/1');
    
    // 페이지 로드 완료 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 제목 확인
    const titleElement = page.locator('[data-testid="diary-title"]');
    await expect(titleElement).toHaveText('첫 번째 일기');
    
    // 감정 아이콘 확인 (HAPPY)
    const emotionIcon = page.locator('[data-testid="emotion-icon"]');
    await expect(emotionIcon).toBeVisible();
    
    // 감정 텍스트 확인 (HAPPY)
    const emotionText = page.locator('[data-testid="emotion-text"]');
    await expect(emotionText).toHaveText('행복해요');
    
    // 작성일 확인
    const dateText = page.locator('[data-testid="created-date"]');
    await expect(dateText).toHaveText('2024. 10. 17');
    
    // 내용 확인
    const contentText = page.locator('[data-testid="diary-content"]');
    await expect(contentText).toHaveText('오늘은 정말 행복한 하루였다. 새로운 프로젝트를 시작했고, 팀원들과 좋은 아이디어를 많이 나눴다.');
  });

  test('should display diary detail with correct data binding for id 2', async ({ page }) => {
    // 다이어리 상세 페이지로 이동
    await page.goto('/diaries/2');
    
    // 페이지 로드 완료 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 제목 확인
    const titleElement = page.locator('[data-testid="diary-title"]');
    await expect(titleElement).toHaveText('두 번째 일기');
    
    // 감정 아이콘 확인 (SAD)
    const emotionIcon = page.locator('[data-testid="emotion-icon"]');
    await expect(emotionIcon).toBeVisible();
    
    // 감정 텍스트 확인 (SAD)
    const emotionText = page.locator('[data-testid="emotion-text"]');
    await expect(emotionText).toHaveText('슬퍼요');
    
    // 작성일 확인
    const dateText = page.locator('[data-testid="created-date"]');
    await expect(dateText).toHaveText('2024. 10. 16');
    
    // 내용 확인
    const contentText = page.locator('[data-testid="diary-content"]');
    await expect(contentText).toHaveText('조금 슬픈 하루였다. 예상했던 결과가 나오지 않아서 아쉬웠지만, 다음에는 더 잘할 수 있을 것 같다.');
  });

  test('should display diary detail with correct data binding for id 3', async ({ page }) => {
    // 다이어리 상세 페이지로 이동
    await page.goto('/diaries/3');
    
    // 페이지 로드 완료 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 제목 확인
    const titleElement = page.locator('[data-testid="diary-title"]');
    await expect(titleElement).toHaveText('세 번째 일기');
    
    // 감정 아이콘 확인 (ANGRY)
    const emotionIcon = page.locator('[data-testid="emotion-icon"]');
    await expect(emotionIcon).toBeVisible();
    
    // 감정 텍스트 확인 (ANGRY)
    const emotionText = page.locator('[data-testid="emotion-text"]');
    await expect(emotionText).toHaveText('화나요');
    
    // 작성일 확인
    const dateText = page.locator('[data-testid="created-date"]');
    await expect(dateText).toHaveText('2024. 10. 15');
    
    // 내용 확인
    const contentText = page.locator('[data-testid="diary-content"]');
    await expect(contentText).toHaveText('화가 나는 일이 있었다. 하지만 감정을 조절하고 차분하게 해결책을 찾으려고 노력했다.');
  });

  test('should handle non-existent diary id gracefully', async ({ page }) => {
    // 존재하지 않는 ID로 페이지 이동
    await page.goto('/diaries/999');
    
    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 에러 메시지가 표시되는지 확인
    const containerElement = page.locator('[data-testid="diary-detail-container"]');
    await expect(containerElement).toContainText('데이터를 불러올 수 없습니다');
  });

  test('should handle empty localStorage gracefully', async ({ page }) => {
    // 로컬스토리지 비우기
    await page.addInitScript(() => {
      localStorage.removeItem('diaries');
    });
    
    // 다이어리 상세 페이지로 이동
    await page.goto('/diaries/1');
    
    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 에러 메시지가 표시되는지 확인
    const containerElement = page.locator('[data-testid="diary-detail-container"]');
    await expect(containerElement).toContainText('데이터를 불러올 수 없습니다');
  });

  test('should copy diary content when copy button is clicked', async ({ page }) => {
    // 다이어리 상세 페이지로 이동
    await page.goto('/diaries/1');
    
    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="diary-detail-container"]');
    
    // 복사 버튼 클릭
    const copyButton = page.locator('[data-testid="copy-button"]');
    await copyButton.click();
    
    // 클립보드 내용 확인 (브라우저 권한 필요)
    // 실제 구현에서는 alert나 토스트 메시지로 확인할 수 있음
  });
});
