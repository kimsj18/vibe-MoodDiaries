import { test, expect } from '@playwright/test';

test.describe('일기쓰기 폼 등록 기능', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지 초기화
    await page.goto('/diaries');
    await page.evaluate(() => {
      localStorage.clear();
    });
    
    // 페이지 로드 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="diaries-page"]');
    
    // 일기쓰기 버튼 클릭하여 모달 열기
    await page.click('[data-testid="diary-write-button"]');
    await page.waitForSelector('[data-testid="diary-write-modal"]');
  });

  test('모든 필드 입력 시 등록하기 버튼이 활성화된다', async ({ page }) => {
    // 감정 선택
    await page.click('input[name="emotion"][value="HAPPY"]');
    
    // 제목 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '테스트 일기 제목');
    
    // 내용 입력
    await page.fill('textarea[placeholder="내용을 입력합니다."]', '테스트 일기 내용입니다.');
    
    // 등록하기 버튼이 활성화되었는지 확인
    const submitButton = page.locator('button:has-text("등록하기")');
    await expect(submitButton).not.toBeDisabled();
  });

  test('필수 필드 미입력 시 등록하기 버튼이 비활성화된다', async ({ page }) => {
    // 등록하기 버튼이 비활성화되었는지 확인 (초기 상태)
    const submitButton = page.locator('button:has-text("등록하기")');
    await expect(submitButton).toBeDisabled();
    
    // 감정만 선택
    await page.click('input[name="emotion"][value="HAPPY"]');
    await expect(submitButton).toBeDisabled();
    
    // 제목만 추가 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '테스트 제목');
    await expect(submitButton).toBeDisabled();
  });

  test('새로운 일기 등록 시 로컬스토리지에 id=1로 저장된다', async ({ page }) => {
    // 폼 입력
    await page.click('input[name="emotion"][value="HAPPY"]');
    await page.fill('input[placeholder="제목을 입력합니다."]', '첫 번째 일기');
    await page.fill('textarea[placeholder="내용을 입력합니다."]', '첫 번째 일기 내용');
    
    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');
    
    // 등록완료 모달 확인
    await page.waitForSelector('text=등록이 완료되었습니다');
    
    // 로컬스토리지 확인
    const diariesData = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });
    
    expect(diariesData).toBeTruthy();
    expect(diariesData).toHaveLength(1);
    expect(diariesData[0]).toMatchObject({
      id: 1,
      title: '첫 번째 일기',
      content: '첫 번째 일기 내용',
      emotion: 'HAPPY'
    });
    expect(diariesData[0].createdAt).toBeTruthy();
  });

  test('기존 일기가 있을 때 새 일기 등록 시 가장 큰 id+1로 저장된다', async ({ page }) => {
    // 기존 데이터 설정
    await page.evaluate(() => {
      const existingData = [
        {
          id: 1,
          title: '기존 일기 1',
          content: '기존 내용 1',
          emotion: 'HAPPY',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        {
          id: 3,
          title: '기존 일기 3',
          content: '기존 내용 3',
          emotion: 'SAD',
          createdAt: '2024-01-02T00:00:00.000Z'
        }
      ];
      localStorage.setItem('diaries', JSON.stringify(existingData));
    });
    
    // 폼 입력
    await page.click('input[name="emotion"][value="ANGRY"]');
    await page.fill('input[placeholder="제목을 입력합니다."]', '새로운 일기');
    await page.fill('textarea[placeholder="내용을 입력합니다."]', '새로운 일기 내용');
    
    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');
    
    // 등록완료 모달 확인
    await page.waitForSelector('text=등록이 완료되었습니다');
    
    // 로컬스토리지 확인
    const diariesData = await page.evaluate(() => {
      const data = localStorage.getItem('diaries');
      return data ? JSON.parse(data) : null;
    });
    
    expect(diariesData).toHaveLength(3);
    const newDiary = diariesData.find((diary: any) => diary.title === '새로운 일기');
    expect(newDiary.id).toBe(4); // 가장 큰 id(3) + 1
  });

  test('등록완료 모달에서 확인 클릭 시 상세페이지로 이동하고 모든 모달이 닫힌다', async ({ page }) => {
    // 폼 입력
    await page.click('input[name="emotion"][value="SURPRISE"]');
    await page.fill('input[placeholder="제목을 입력합니다."]', '상세페이지 테스트');
    await page.fill('textarea[placeholder="내용을 입력합니다."]', '상세페이지 테스트 내용');
    
    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');
    
    // 등록완료 모달 확인 및 확인 버튼 클릭
    await page.waitForSelector('text=등록이 완료되었습니다');
    await page.click('button:has-text("확인")');
    
    // 상세페이지로 이동 확인
    await page.waitForURL('/diaries/1');
    
    // 모든 모달이 닫혔는지 확인
    const modalExists = await page.locator('[data-testid="diary-write-modal"]').count();
    expect(modalExists).toBe(0);
  });

  test('폼 검증 - 제목이 비어있으면 등록하기 버튼이 비활성화된다', async ({ page }) => {
    // 감정과 내용만 입력
    await page.click('input[name="emotion"][value="ETC"]');
    await page.fill('textarea[placeholder="내용을 입력합니다."]', '내용만 있는 경우');
    
    // 등록하기 버튼이 비활성화되었는지 확인
    const submitButton = page.locator('button:has-text("등록하기")');
    await expect(submitButton).toBeDisabled();
  });

  test('폼 검증 - 내용이 비어있으면 등록하기 버튼이 비활성화된다', async ({ page }) => {
    // 감정과 제목만 입력
    await page.click('input[name="emotion"][value="SAD"]');
    await page.fill('input[placeholder="제목을 입력합니다."]', '제목만 있는 경우');
    
    // 등록하기 버튼이 비활성화되었는지 확인
    const submitButton = page.locator('button:has-text("등록하기")');
    await expect(submitButton).toBeDisabled();
  });
});
