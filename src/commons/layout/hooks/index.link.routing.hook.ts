import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { URLS } from '../../constants/url';

export const useLinkRouting = () => {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 로고 클릭 핸들러
   * 일기목록 페이지로 이동
   */
  const handleLogoClick = () => {
    router.push(URLS.DIARIES.LIST);
  };

  /**
   * 일기보관함 탭 클릭 핸들러
   * 일기목록 페이지로 이동
   */
  const handleDiariesTabClick = () => {
    router.push(URLS.DIARIES.LIST);
  };

  /**
   * 사진보관함 탭 클릭 핸들러
   * 사진목록 페이지로 이동
   */
  const handlePicturesTabClick = () => {
    router.push(URLS.PICTURES.LIST);
  };

  /**
   * 일기보관함 탭 CSS 클래스 결정
   * @param styles CSS 모듈 객체
   * @returns 액티브 또는 비활성 CSS 클래스명
   */
  const getDiariesTabClass = (styles: any) => {
    const isActive = pathname === URLS.DIARIES.LIST || pathname.startsWith('/diaries');
    return isActive ? styles.tabActive : styles.tabInactive;
  };

  /**
   * 사진보관함 탭 CSS 클래스 결정
   * @param styles CSS 모듈 객체
   * @returns 액티브 또는 비활성 CSS 클래스명
   */
  const getPicturesTabClass = (styles: any) => {
    const isActive = pathname === URLS.PICTURES.LIST || pathname.startsWith('/pictures');
    return isActive ? styles.tabActive : styles.tabInactive;
  };

  return {
    handleLogoClick,
    handleDiariesTabClick,
    handlePicturesTabClick,
    getDiariesTabClass,
    getPicturesTabClass,
  };
};