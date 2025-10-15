/**
 * URL 경로 관리 상수
 * 모든 URL 경로와 관련 메타데이터를 중앙에서 관리
 */

// 기본 URL 경로 상수
export const URLS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  
  // 일기 관련
  DIARIES: {
    LIST: '/diaries',
    DETAIL: '/diaries/[id]',
  },
  
  // 사진 관련
  PICTURES: {
    LIST: '/pictures',
  },
} as const;

// 접근 권한 타입
export type AccessLevel = '누구나' | '회원전용';

// UI 컴포넌트 가시성 타입
export interface UIVisibility {
  header: {
    show: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// 라우트 메타데이터 타입
export interface RouteMetadata {
  path: string;
  accessLevel: AccessLevel;
  uiVisibility: UIVisibility;
}

// 라우트별 메타데이터
export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  // 로그인 페이지
  LOGIN: {
    path: URLS.AUTH.LOGIN,
    accessLevel: '누구나',
    uiVisibility: {
      header: {
        show: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  // 회원가입 페이지
  SIGNUP: {
    path: URLS.AUTH.SIGNUP,
    accessLevel: '누구나',
    uiVisibility: {
      header: {
        show: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },
  
  // 일기목록 페이지
  DIARIES_LIST: {
    path: URLS.DIARIES.LIST,
    accessLevel: '누구나',
    uiVisibility: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
  
  // 일기상세 페이지
  DIARIES_DETAIL: {
    path: URLS.DIARIES.DETAIL,
    accessLevel: '회원전용',
    uiVisibility: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
  },
  
  // 사진목록 페이지
  PICTURES_LIST: {
    path: URLS.PICTURES.LIST,
    accessLevel: '누구나',
    uiVisibility: {
      header: {
        show: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
} as const;

// 다이나믹 라우팅을 위한 헬퍼 함수들
export const UrlHelpers = {
  /**
   * 일기 상세 페이지 URL 생성
   * @param id 일기 ID
   * @returns 일기 상세 페이지 URL
   */
  getDiaryDetailUrl: (id: string | number): string => {
    return URLS.DIARIES.DETAIL.replace('[id]', String(id));
  },
  
  /**
   * 현재 경로가 특정 라우트와 일치하는지 확인
   * @param currentPath 현재 경로
   * @param targetPath 대상 경로 (다이나믹 라우팅 포함)
   * @returns 일치 여부
   */
  isMatchingRoute: (currentPath: string, targetPath: string): boolean => {
    // 다이나믹 라우팅 패턴을 정규식으로 변환
    const pattern = targetPath.replace(/\[([^\]]+)\]/g, '([^/]+)');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(currentPath);
  },
  
  /**
   * 현재 경로에 해당하는 라우트 메타데이터 조회
   * @param currentPath 현재 경로
   * @returns 라우트 메타데이터 또는 null
   */
  getRouteMetadata: (currentPath: string): RouteMetadata | null => {
    for (const metadata of Object.values(ROUTE_METADATA)) {
      if (UrlHelpers.isMatchingRoute(currentPath, metadata.path)) {
        return metadata;
      }
    }
    return null;
  },
  
  /**
   * 특정 라우트의 접근 권한 확인
   * @param currentPath 현재 경로
   * @returns 접근 권한 레벨
   */
  getAccessLevel: (currentPath: string): AccessLevel | null => {
    const metadata = UrlHelpers.getRouteMetadata(currentPath);
    return metadata?.accessLevel || null;
  },
  
  /**
   * 특정 라우트의 UI 가시성 설정 조회
   * @param currentPath 현재 경로
   * @returns UI 가시성 설정
   */
  getUIVisibility: (currentPath: string): UIVisibility | null => {
    const metadata = UrlHelpers.getRouteMetadata(currentPath);
    return metadata?.uiVisibility || null;
  },
} as const;

// 타입 추출을 위한 유틸리티 타입들
export type UrlPath = typeof URLS[keyof typeof URLS][keyof typeof URLS[keyof typeof URLS]];
export type RouteKey = keyof typeof ROUTE_METADATA;
