/**
 * Typography 토큰 정의
 * 
 * 한국어: Pretendard 폰트 사용
 * 영어/숫자: SUIT 폰트 사용
 * 
 * 모바일과 데스크톱을 분기하여 사용할 수 있도록 구조화
 */

// 폰트 패밀리 정의
export const FONT_FAMILY = {
  korean: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  english: 'SUIT Variable, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
} as const;

// 폰트 웨이트 정의
export const FONT_WEIGHT = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

// 폰트 크기 정의 (px 단위)
export const FONT_SIZE = {
  // Web Headline
  webHeadline01: 48,
  webHeadline02: 36,
  webHeadline03: 28,
  
  // Headline
  headline01: 24,
  headline02: 22,
  headline03: 20,
  
  // Title
  title01: 18,
  title02: 16,
  title03: 14,
  subTitle01: 14,
  subTitle02: 12,
  
  // Body
  body01: 16,
  body02_m: 14,
  body03: 12,
  body01_regular: 16,
  body02_s: 14,
  body03_regular: 12,
  
  // Caption
  caption01: 12,
  caption02_m: 10,
  caption02_s: 10,
  caption03: 8,
} as const;

// 라인 높이 정의 (px 단위)
export const LINE_HEIGHT = {
  // Web Headline
  webHeadline01: 60,
  webHeadline02: 48,
  webHeadline03: 36,
  
  // Headline
  headline01: 32,
  headline02: 30,
  headline03: 28,
  
  // Title
  title01: 24,
  title02: 22,
  title03: 20,
  subTitle01: 22,
  subTitle02: 18,
  
  // Body
  body01: 24,
  body02_m: 22,
  body03: 18,
  body01_regular: 24,
  body02_s: 20,
  body03_regular: 16,
  
  // Caption
  caption01: 14,
  caption02_m: 12,
  caption02_s: 12,
  caption03: 10,
} as const;

// Typography 스타일 정의
export const TYPOGRAPHY = {
  // Web Headline
  webHeadline01: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.webHeadline01,
    lineHeight: LINE_HEIGHT.webHeadline01,
  },
  webHeadline02: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.webHeadline02,
    lineHeight: LINE_HEIGHT.webHeadline02,
  },
  webHeadline03: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.webHeadline03,
    lineHeight: LINE_HEIGHT.webHeadline03,
  },
  
  // Headline
  headline01: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.headline01,
    lineHeight: LINE_HEIGHT.headline01,
  },
  headline02: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.extrabold,
    fontSize: FONT_SIZE.headline02,
    lineHeight: LINE_HEIGHT.headline02,
  },
  headline03: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.headline03,
    lineHeight: LINE_HEIGHT.headline03,
  },
  
  // Title
  title01: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.title01,
    lineHeight: LINE_HEIGHT.title01,
  },
  title02: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.title02,
    lineHeight: LINE_HEIGHT.title02,
  },
  title03: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.title03,
    lineHeight: LINE_HEIGHT.title03,
  },
  subTitle01: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.subTitle01,
    lineHeight: LINE_HEIGHT.subTitle01,
  },
  subTitle02: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.subTitle02,
    lineHeight: LINE_HEIGHT.subTitle02,
  },
  
  // Body
  body01: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.body01,
    lineHeight: LINE_HEIGHT.body01,
  },
  body02_m: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.body02_m,
    lineHeight: LINE_HEIGHT.body02_m,
  },
  body03: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.body03,
    lineHeight: LINE_HEIGHT.body03,
  },
  body01_regular: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.body01_regular,
    lineHeight: LINE_HEIGHT.body01_regular,
  },
  body02_s: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.body02_s,
    lineHeight: LINE_HEIGHT.body02_s,
  },
  body03_regular: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.body03_regular,
    lineHeight: LINE_HEIGHT.body03_regular,
  },
  
  // Caption
  caption01: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.caption01,
    lineHeight: LINE_HEIGHT.caption01,
  },
  caption02_m: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.caption02_m,
    lineHeight: LINE_HEIGHT.caption02_m,
  },
  caption02_s: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.caption02_s,
    lineHeight: LINE_HEIGHT.caption02_s,
  },
  caption03: {
    fontFamily: FONT_FAMILY.korean,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.caption03,
    lineHeight: LINE_HEIGHT.caption03,
  },
} as const;

// 영어/숫자용 Typography 스타일 정의
export const TYPOGRAPHY_EN = {
  // Web Headline
  webHeadline01: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.webHeadline01,
    lineHeight: LINE_HEIGHT.webHeadline01,
  },
  webHeadline02: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.webHeadline02,
    lineHeight: LINE_HEIGHT.webHeadline02,
  },
  webHeadline03: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.webHeadline03,
    lineHeight: LINE_HEIGHT.webHeadline03,
  },
  
  // Headline
  headline01: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.headline01,
    lineHeight: LINE_HEIGHT.headline01,
  },
  headline02: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.extrabold,
    fontSize: FONT_SIZE.headline02,
    lineHeight: LINE_HEIGHT.headline02,
  },
  headline03: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.headline03,
    lineHeight: LINE_HEIGHT.headline03,
  },
  
  // Title
  title01: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.title01,
    lineHeight: LINE_HEIGHT.title01,
  },
  title02: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.title02,
    lineHeight: LINE_HEIGHT.title02,
  },
  title03: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.title03,
    lineHeight: LINE_HEIGHT.title03,
  },
  subTitle01: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.subTitle01,
    lineHeight: LINE_HEIGHT.subTitle01,
  },
  subTitle02: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.subTitle02,
    lineHeight: LINE_HEIGHT.subTitle02,
  },
  
  // Body
  body01: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.body01,
    lineHeight: LINE_HEIGHT.body01,
  },
  body02_m: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.body02_m,
    lineHeight: LINE_HEIGHT.body02_m,
  },
  body03: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.body03,
    lineHeight: LINE_HEIGHT.body03,
  },
  body01_regular: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.body01_regular,
    lineHeight: LINE_HEIGHT.body01_regular,
  },
  body02_s: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.body02_s,
    lineHeight: LINE_HEIGHT.body02_s,
  },
  body03_regular: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.regular,
    fontSize: FONT_SIZE.body03_regular,
    lineHeight: LINE_HEIGHT.body03_regular,
  },
  
  // Caption
  caption01: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.caption01,
    lineHeight: LINE_HEIGHT.caption01,
  },
  caption02_m: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.caption02_m,
    lineHeight: LINE_HEIGHT.caption02_m,
  },
  caption02_s: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.medium,
    fontSize: FONT_SIZE.caption02_s,
    lineHeight: LINE_HEIGHT.caption02_s,
  },
  caption03: {
    fontFamily: FONT_FAMILY.english,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.caption03,
    lineHeight: LINE_HEIGHT.caption03,
  },
} as const;

// 모바일/데스크톱 분기용 Typography 정의
export const TYPOGRAPHY_RESPONSIVE = {
  mobile: TYPOGRAPHY,
  desktop: TYPOGRAPHY,
} as const;

// Typography 타입 정의
export type TypographyKey = keyof typeof TYPOGRAPHY;
export type TypographyEnKey = keyof typeof TYPOGRAPHY_EN;
export type FontWeightKey = keyof typeof FONT_WEIGHT;
export type FontSizeKey = keyof typeof FONT_SIZE;
export type LineHeightKey = keyof typeof LINE_HEIGHT;

// CSS 변수명 생성 함수
export const getTypographyCSSVar = (key: TypographyKey, property: 'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight') => {
  return `--typography-${key}-${property}`;
};

// CSS 변수명 생성 함수 (영어용)
export const getTypographyEnCSSVar = (key: TypographyEnKey, property: 'fontFamily' | 'fontWeight' | 'fontSize' | 'lineHeight') => {
  return `--typography-en-${key}-${property}`;
};
