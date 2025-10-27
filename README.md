# Vibe Coding - 다이어리 앱

일기 작성과 감정 기록을 할 수 있는 Next.js 기반 웹 애플리케이션입니다.

## 프로젝트 소개

이 프로젝트는 일기를 작성하고 감정을 기록할 수 있는 기능을 제공합니다. 
사용자는 회원가입/로그인 후 자신의 일기를 작성하고, 사진과 함께 감정을 기록할 수 있습니다.

## 주요 기능

- 🔐 사용자 인증 (회원가입/로그인)
- 📔 일기 작성 및 관리
- 🎨 감정 기록 (행복, 슬픔, 분노, 놀람, 기타)
- 📸 사진 업로드 및 관리
- 🎨 테마 변경 지원

## 기술 스택

- **프레임워크**: Next.js 14
- **언어**: TypeScript
- **스타일링**: CSS Modules, Tailwind CSS
- **상태 관리**: React Query, Context API
- **폼 관리**: React Hook Form, Zod
- **테스트**: Playwright (E2E), Vitest (단위 테스트)
- **컴포넌트 개발**: Storybook

## 실행 방법

### 1. 의존성 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 2. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

개발 서버가 시작되면 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

### 4. Storybook 실행

컴포넌트를 독립적으로 개발하고 테스트할 수 있는 Storybook을 실행합니다:

```bash
npm run storybook
```

http://localhost:6006 에서 Storybook을 확인할 수 있습니다.

## 테스트 방법

### E2E 테스트 (Playwright)

```bash
# 일반 실행
npm run test:e2e

# UI 모드로 실행
npm run test:e2e:ui

# 헤드 모드로 실행
npm run test:e2e:headed

# 디버그 모드로 실행
npm run test:e2e:debug
```

### 린트

```bash
npm run lint
```

## 프로젝트 구조

```
vibe-coding/
├── src/
│   ├── app/                 # Next.js App Router 페이지
│   │   ├── auth/            # 인증 페이지 (로그인/회원가입)
│   │   ├── diaries/        # 다이어리 페이지
│   │   └── pictures/       # 사진 관리 페이지
│   ├── commons/            # 공통 컴포넌트 및 레이아웃
│   │   ├── components/     # 재사용 가능한 컴포넌트
│   │   ├── layout/        # 레이아웃 컴포넌트
│   │   └── providers/     # 컨텍스트 프로바이더
│   └── components/        # 기능별 컴포넌트
├── tests/                  # E2E 테스트 파일
└── public/                 # 정적 파일
```

## 주요 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run start`: 프로덕션 서버 실행
- `npm run lint`: ESLint 실행
- `npm run storybook`: Storybook 실행
- `npm run test:e2e`: E2E 테스트 실행

## 배포

이 프로젝트는 Vercel을 통해 쉽게 배포할 수 있습니다:

- [Vercel 배포 가이드](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 기여하기

프로젝트에 기여하고 싶으시다면 언제든지 Pull Request를 보내주세요!

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
