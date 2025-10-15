/**
 * Color tokens
 * - 피그마 파운데이션(노드ID: 3459:1130) 기준 팔레트 + 시맨틱 토큰
 * - 라이트/다크를 TS로 관리하고, CSS 변수로 소비
 */

export const palette = {
  blue: {
    5: '#F0F7FF',
    10: '#DBEEFF',
    20: '#BDDBFF',
    30: '#93BEFF',
    40: '#6DA5FA',
    50: '#497CFF',
    60: '#3A5CF3',
    70: '#274AE1',
    80: '#1530A6',
    90: '#0B2184',
  },
  gray: {
    white: '#FFFFFF',
    5: '#F2F2F2',
    10: '#E4E4E4',
    20: '#D4D3D3',
    30: '#C7C7C7',
    40: '#ABABAB',
    50: '#919191',
    60: '#777777',
    70: '#5F5F5F',
    80: '#333333',
    90: '#1C1C1C',
    black: '#000000',
  },
  red: { 5: '#FDD7DC', 10: '#F797A4', 20: '#F4677A', 30: '#F03851', 40: '#E4112E', 50: '#B40E24', 60: '#850A1B' },
  green: { 5: '#D3F3E0', 10: '#92E6B9', 20: '#15D66F', 30: '#12B75F', 40: '#109C51', 50: '#0E723C', 60: '#084424' },
  yellow: { 5: '#FFE499', 10: '#FFD666', 20: '#FFC933', 30: '#FFB300', 40: '#EBA500', 50: '#D69600', 60: '#B27D00' },
  coolGray: { 1: '#F8F8FA', 5: '#F6F6F9', 10: '#EDEEF2', 20: '#DDDFE5', 30: '#D2D4DD', 40: '#C7C9D5', 50: '#BBBECD', 60: '#B0B3C4' },
  gradient: {
    primary: 'linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)',
    skeleton: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 48.5%, rgba(255,255,255,0) 100%)',
  },
} as const;

export const light = {
  primary: { 50: palette.blue[5], 100: palette.blue[10], 200: palette.blue[20], 300: palette.blue[30], 400: palette.blue[40], 500: palette.blue[50], 600: palette.blue[60], 700: palette.blue[70], 800: palette.blue[80], 900: palette.blue[90] },
  neutral: { 0: palette.gray.white, 50: palette.gray[5], 100: palette.gray[10], 200: palette.gray[20], 300: palette.gray[30], 400: palette.gray[40], 500: palette.gray[50], 600: palette.gray[60], 700: palette.gray[70], 800: palette.gray[80], 900: palette.gray[90], 1000: palette.gray.black },
  coolGray: { 50: palette.coolGray[1], 100: palette.coolGray[5], 200: palette.coolGray[10], 300: palette.coolGray[20], 400: palette.coolGray[30], 500: palette.coolGray[40], 600: palette.coolGray[50], 700: palette.coolGray[60] },
  success: { 50: palette.green[5], 100: palette.green[10], 200: palette.green[20], 300: palette.green[30], 400: palette.green[40], 500: palette.green[50], 600: palette.green[60] },
  error: { 50: palette.red[5], 100: palette.red[10], 200: palette.red[20], 300: palette.red[30], 400: palette.red[40], 500: palette.red[50], 600: palette.red[60] },
  warning: { 50: palette.yellow[5], 100: palette.yellow[10], 200: palette.yellow[20], 300: palette.yellow[30], 400: palette.yellow[40], 500: palette.yellow[50], 600: palette.yellow[60] },
  background: { primary: palette.gray.white, secondary: palette.gray[5], tertiary: palette.gray[10], inverse: palette.gray.black },
  text: { primary: palette.gray.black, secondary: palette.gray[60], tertiary: palette.gray[50], inverse: palette.gray.white, disabled: palette.gray[40] },
  border: { primary: palette.gray[20], secondary: palette.gray[10], focus: palette.blue[50], error: palette.red[30], success: palette.green[30] },
  gradient: { primary: palette.gradient.primary, skeleton: palette.gradient.skeleton },
} as const;

export const dark = {
  primary: { 50: palette.blue[90], 100: palette.blue[80], 200: palette.blue[70], 300: palette.blue[60], 400: palette.blue[50], 500: palette.blue[40], 600: palette.blue[30], 700: palette.blue[20], 800: palette.blue[10], 900: palette.blue[5] },
  neutral: { 0: palette.gray.black, 50: palette.gray[90], 100: palette.gray[80], 200: palette.gray[70], 300: palette.gray[60], 400: palette.gray[50], 500: palette.gray[40], 600: palette.gray[30], 700: palette.gray[20], 800: palette.gray[10], 900: palette.gray[5], 1000: palette.gray.white },
  coolGray: { 50: palette.coolGray[60], 100: palette.coolGray[50], 200: palette.coolGray[40], 300: palette.coolGray[30], 400: palette.coolGray[20], 500: palette.coolGray[10], 600: palette.coolGray[5], 700: palette.coolGray[1] },
  success: { 50: palette.green[60], 100: palette.green[50], 200: palette.green[40], 300: palette.green[30], 400: palette.green[20], 500: palette.green[10], 600: palette.green[5] },
  error: { 50: palette.red[60], 100: palette.red[50], 200: palette.red[40], 300: palette.red[30], 400: palette.red[20], 500: palette.red[10], 600: palette.red[5] },
  warning: { 50: palette.yellow[60], 100: palette.yellow[50], 200: palette.yellow[40], 300: palette.yellow[30], 400: palette.yellow[20], 500: palette.yellow[10], 600: palette.yellow[5] },
  background: { primary: palette.gray.black, secondary: palette.gray[90], tertiary: palette.gray[80], inverse: palette.gray.white },
  text: { primary: palette.gray.white, secondary: palette.gray[30], tertiary: palette.gray[40], inverse: palette.gray.black, disabled: palette.gray[50] },
  border: { primary: palette.gray[70], secondary: palette.gray[80], focus: palette.blue[40], error: palette.red[30], success: palette.green[30] },
  gradient: { primary: palette.gradient.primary, skeleton: palette.gradient.skeleton },
} as const;

export const themes = { light, dark } as const;

export type ThemeName = 'light' | 'dark';

interface Nested {
  [key: string]: string | Nested;
}
export const toCSSVars = (obj: Nested, path: string[] = [], out: Record<string,string> = {}) => {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      toCSSVars(value as Nested, [...path, key], out);
    } else {
      const token = [...path, key].join('-');
      out[`--color-${token}`] = String(value);
    }
  }
  return out;
};

export const lightCSSVars = toCSSVars(light as unknown as Nested);
export const darkCSSVars = toCSSVars(dark as unknown as Nested);

export const cssVar = (token: string) => `var(--color-${token})`;

