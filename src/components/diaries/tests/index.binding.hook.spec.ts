import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// 테스트용 일기 데이터 타입
type DiaryData = {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
};

// 테스트용 일기 데이터
const testDiaries: DiaryData[] = [
  {
    id: 1,
    title: '첫 번째 일기',
    content: '오늘은 정말 행복한 하루였다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024.03.12'
  },
  {
    id: 2,
    title: '두 번째 일기',
    content: '조금 슬픈 일이 있었다.',
    emotion: EmotionType.SAD,
    createdAt: '2024.03.11'
  },
  {
    id: 3,
    title: '세 번째 일기',
    content: '화가 나는 일이 있었다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024.03.10'
  },
  {
    id: 4,
    title: '네 번째 일기',
    content: '놀라운 일이 일어났다.',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024.03.09'
  },
  {
    id: 5,
    title: '다섯 번째 일기',
    content: '기타 감정의 일기이다.',
    emotion: EmotionType.ETC,
    createdAt: '2024.03.08'
  },
  {
    id: 6,
    title: '매우 긴 제목을 가진 일기입니다. 이 제목은 일기카드 사이즈를 넘어가는 경우를 테스트하기 위한 것입니다.',
    content: '긴 제목 테스트용 내용',
    emotion: EmotionType.HAPPY,
    createdAt: '2024.03.07'
  }
];

test.describe('Diaries Data Binding', () => {
  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    
    // 로컬스토리지 데이터 설정
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    
    // 페이지 새로고침하여 데이터 반영
    await page.reload();
    
    // 페이지 로드 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });
    
    // 추가 대기 시간 (데이터 로딩을 위해)
    await page.waitForTimeout(100);
  });

  test('로컬스토리지 데이터가 일기 카드에 올바르게 바인딩되는지 확인', async ({ page }) => {
    // 일기 카드들이 렌더링되었는지 확인
    const diaryCards = page.locator('[class*="styles_diaryCard"]');
    await expect(diaryCards).toHaveCount(testDiaries.length);

    // 각 일기 카드의 데이터 바인딩 확인
    for (let i = 0; i < testDiaries.length; i++) {
      const diary = testDiaries[i];
      const card = diaryCards.nth(i);

      // 감정 텍스트 확인
      const emotionText = card.locator('[class*="styles_emotionChip"]');
      let expectedEmotionText = '';
      switch (diary.emotion) {
        case EmotionType.HAPPY:
          expectedEmotionText = '행복해요';
          break;
        case EmotionType.SAD:
          expectedEmotionText = '슬퍼요';
          break;
        case EmotionType.ANGRY:
          expectedEmotionText = '화나요';
          break;
        case EmotionType.SURPRISE:
          expectedEmotionText = '놀랐어요';
          break;
        case EmotionType.ETC:
          expectedEmotionText = '기타';
          break;
      }
      await expect(emotionText).toHaveText(expectedEmotionText);

      // 작성일 확인
      const dateText = card.locator('[class*="styles_dateText"]');
      await expect(dateText).toHaveText(diary.createdAt);

      // 제목 확인 (긴 제목의 경우 ellipsis 처리 확인)
      const titleText = card.locator('[class*="styles_cardBody"]');
      if (diary.title.length > 20) {
        // 긴 제목의 경우 CSS ellipsis가 적용되는지 확인
        await expect(titleText).toHaveCSS('text-overflow', 'ellipsis');
        await expect(titleText).toHaveCSS('white-space', 'nowrap');
        await expect(titleText).toHaveCSS('overflow', 'hidden');
      } else {
        await expect(titleText).toHaveText(diary.title);
      }

      // 감정에 따른 이미지 확인 (Next.js Image 최적화로 인해 URL이 변환됨)
      const emotionImage = card.locator('img[class*="styles_cardImage"]');
      let expectedImagePath = '';
      switch (diary.emotion) {
        case EmotionType.HAPPY:
          expectedImagePath = 'emotion-happy-m.png';
          break;
        case EmotionType.SAD:
          expectedImagePath = 'emotion-sad-m.png';
          break;
        case EmotionType.ANGRY:
          expectedImagePath = 'emotion-angry-m.png';
          break;
        case EmotionType.SURPRISE:
          expectedImagePath = 'emotion-surprise-m.png';
          break;
        case EmotionType.ETC:
          expectedImagePath = 'emotion-etc-m.png';
          break;
      }
      // Next.js Image 컴포넌트가 URL을 최적화하므로 파일명만 확인
      const srcAttribute = await emotionImage.getAttribute('src');
      expect(srcAttribute).toContain(expectedImagePath);
    }
  });

  test('로컬스토리지가 비어있을 때 빈 상태가 표시되는지 확인', async ({ page }) => {
    // 로컬스토리지 비우기
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });
    
    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });

    // 일기 카드가 없는지 확인
    const diaryCards = page.locator('[class*="styles_diaryCard"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test('로컬스토리지 데이터가 잘못된 형식일 때 에러 처리 확인', async ({ page }) => {
    // 잘못된 형식의 데이터 설정
    await page.evaluate(() => {
      localStorage.setItem('diaries', 'invalid-json');
    });
    
    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });

    // 일기 카드가 없는지 확인 (에러 처리로 인해)
    const diaryCards = page.locator('[class*="styles_diaryCard"]');
    await expect(diaryCards).toHaveCount(0);
  });

  test('감정별 색상이 올바르게 적용되는지 확인', async ({ page }) => {
    const diaryCards = page.locator('[class*="styles_diaryCard"]');
    
    for (let i = 0; i < Math.min(testDiaries.length, 5); i++) {
      const card = diaryCards.nth(i);
      const emotionChip = card.locator('[class*="styles_emotionChip"]');

      // 감정별 색상 확인 (실제 적용된 색상 값 확인)
      const actualColor = await emotionChip.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      // 색상이 적용되었는지 확인 (기본 색상이 아닌지)
      expect(actualColor).not.toBe('rgb(0, 0, 0)'); // 기본 검정색이 아님
      expect(actualColor).not.toBe(''); // 색상이 설정됨
    }
  });

  test('페이지네이션이 데이터 개수에 따라 올바르게 작동하는지 확인', async ({ page }) => {
    // 12개 이상의 데이터로 테스트 (페이지네이션 확인)
    const manyDiaries: DiaryData[] = [];
    for (let i = 1; i <= 25; i++) {
      manyDiaries.push({
        id: i,
        title: `일기 ${i}`,
        content: `내용 ${i}`,
        emotion: Object.values(EmotionType)[i % 5] as EmotionType,
        createdAt: `2024.03.${String(i).padStart(2, '0')}`
      });
    }

    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, manyDiaries);
    
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 500 });

    // 첫 페이지에 12개 카드가 표시되는지 확인
    const diaryCards = page.locator('[class*="styles_diaryCard"]');
    await expect(diaryCards).toHaveCount(12);

    // 페이지네이션 버튼 확인
    const paginationButtons = page.locator('[class*="paginationContent"] button');
    await expect(paginationButtons).toHaveCount(5); // 이전, 1, 2, 3, 다음 (총 25개 데이터 -> 3페이지)
  });
});
