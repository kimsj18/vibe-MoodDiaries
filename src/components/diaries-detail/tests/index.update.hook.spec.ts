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

// 테스트용 일기 데이터 생성
const createTestDiary = (id: number, title: string, content: string, emotion: EmotionType): DiaryData => ({
  id,
  title,
  content,
  emotion,
  createdAt: '2024. 07. 12'
});

test.describe('일기상세 수정 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 테스트용 일기 데이터를 로컬스토리지에 설정
    const testDiary = createTestDiary(1, '테스트 일기 제목', '테스트 일기 내용입니다.', EmotionType.HAPPY);
    await page.evaluate((diary) => {
      localStorage.setItem('diaries', JSON.stringify([diary]));
    }, testDiary);

    // 일기 상세 페이지로 이동
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-container"]');
  });

  test('수정 버튼 클릭 시 수정 모드로 전환', async ({ page }) => {
    // 1. 수정 버튼 클릭
    await page.click('[data-testid="edit-button"]');
    
    // 2. 수정 모드 UI 확인
    await expect(page.locator('text=오늘 기분은 어땟나요?')).toBeVisible();
    await expect(page.locator('text=제목')).toBeVisible();
    await expect(page.locator('text=내용')).toBeVisible();
    await expect(page.locator('[data-testid="cancel-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="update-button"]')).toBeVisible();
  });

  test('수정 모드에서 회고 입력창 비활성화 확인', async ({ page }) => {
    // 1. 수정 버튼 클릭하여 수정 모드 진입
    await page.click('[data-testid="edit-button"]');
    
    // 2. 회고 입력창이 비활성화되었는지 확인
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    await expect(retrospectInput).toHaveAttribute('disabled');
    
    // 3. 회고 입력창에 플레이스홀더 텍스트 확인
    await expect(page.locator('text=수정중일땐 회고를 작성할 수 없어요.')).toBeVisible();
  });

  test('수정 모드에서 감정 변경', async ({ page }) => {
    // 1. 수정 버튼 클릭
    await page.click('[data-testid="edit-button"]');
    
    // 2. 다른 감정 선택 (슬퍼요)
    await page.click('[data-testid="emotion-sad"]');
    
    // 3. 선택된 감정 확인
    await expect(page.locator('[data-testid="emotion-sad"]')).toBeChecked();
  });

  test('수정 모드에서 제목 변경', async ({ page }) => {
    // 1. 수정 버튼 클릭
    await page.click('[data-testid="edit-button"]');
    
    // 2. 제목 입력 필드에 새 제목 입력
    const titleInput = page.locator('[data-testid="title-input"]');
    await titleInput.clear();
    await titleInput.fill('수정된 제목');
    
    // 3. 입력된 제목 확인
    await expect(titleInput).toHaveValue('수정된 제목');
  });

  test('수정 모드에서 내용 변경', async ({ page }) => {
    // 1. 수정 버튼 클릭
    await page.click('[data-testid="edit-button"]');
    
    // 2. 내용 입력 필드에 새 내용 입력
    const contentInput = page.locator('[data-testid="content-input"]');
    await contentInput.clear();
    await contentInput.fill('수정된 내용입니다.');
    
    // 3. 입력된 내용 확인
    await expect(contentInput).toHaveValue('수정된 내용입니다.');
  });

  test('수정하기 버튼 클릭 시 수정 완료', async ({ page }) => {
    // 1. 수정 버튼 클릭
    await page.click('[data-testid="edit-button"]');
    
    // 2. 수정 내용 입력
    await page.click('[data-testid="emotion-sad"]');
    await page.locator('[data-testid="title-input"]').fill('수정된 제목');
    await page.locator('[data-testid="content-input"]').fill('수정된 내용');
    
    // 3. 수정하기 버튼 클릭
    await page.click('[data-testid="update-button"]');
    
    // 4. 수정 전 화면으로 돌아갔는지 확인
    await expect(page.locator('[data-testid="diary-title"]')).toHaveText('수정된 제목');
    await expect(page.locator('[data-testid="diary-content"]')).toHaveText('수정된 내용');
    await expect(page.locator('[data-testid="emotion-text"]')).toHaveText('슬퍼요');
  });

  test('취소 버튼 클릭 시 수정 모드 종료', async ({ page }) => {
    // 1. 수정 버튼 클릭
    await page.click('[data-testid="edit-button"]');
    
    // 2. 취소 버튼 클릭
    await page.click('[data-testid="cancel-button"]');
    
    // 3. 수정 전 화면으로 돌아갔는지 확인
    await expect(page.locator('[data-testid="diary-title"]')).toHaveText('테스트 일기 제목');
    await expect(page.locator('[data-testid="diary-content"]')).toHaveText('테스트 일기 내용입니다.');
    await expect(page.locator('[data-testid="emotion-text"]')).toHaveText('행복해요');
  });

  test('수정 완료 후 로컬스토리지 데이터 업데이트 확인', async ({ page }) => {
    // 1. 수정 버튼 클릭
    await page.click('[data-testid="edit-button"]');
    
    // 2. 수정 내용 입력
    await page.click('[data-testid="emotion-sad"]');
    await page.locator('[data-testid="title-input"]').fill('수정된 제목');
    await page.locator('[data-testid="content-input"]').fill('수정된 내용');
    
    // 3. 수정하기 버튼 클릭
    await page.click('[data-testid="update-button"]');
    
    // 4. 로컬스토리지 데이터 확인
    const updatedDiary = await page.evaluate(() => {
      const diaries = localStorage.getItem('diaries');
      return diaries ? JSON.parse(diaries)[0] : null;
    });
    
    expect(updatedDiary.title).toBe('수정된 제목');
    expect(updatedDiary.content).toBe('수정된 내용');
    expect(updatedDiary.emotion).toBe(EmotionType.SAD);
  });
});
