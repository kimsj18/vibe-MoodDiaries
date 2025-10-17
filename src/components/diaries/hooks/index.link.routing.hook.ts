import { useRouter } from 'next/navigation';
import { UrlHelpers } from '@/commons/constants/url';

/**
 * 일기 카드 링크 라우팅 훅
 * 일기 카드 클릭 시 상세 페이지로 이동하는 기능을 제공
 */
export const useDiaryLinkRouting = () => {
  const router = useRouter();

  /**
   * 일기 상세 페이지로 이동
   * @param diaryId 일기 ID
   */
  const navigateToDiaryDetail = (diaryId: number | string) => {
    const detailUrl = UrlHelpers.getDiaryDetailUrl(diaryId);
    router.push(detailUrl);
  };

  /**
   * 일기 카드 클릭 핸들러
   * @param diaryId 일기 ID
   * @returns 클릭 이벤트 핸들러
   */
  const handleCardClick = (diaryId: number | string) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      // 이벤트 버블링 방지 (삭제 버튼 클릭 시 카드 클릭 방지)
      event.stopPropagation();
      navigateToDiaryDetail(diaryId);
    };
  };

  /**
   * 삭제 버튼 클릭 핸들러
   * 페이지 이동을 방지하고 이벤트 전파를 중단
   */
  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 전파 중단 (카드 클릭 이벤트 방지)
    event.stopPropagation();
    // 기본 동작 방지
    event.preventDefault();
    
    // TODO: 실제 삭제 로직은 별도 훅에서 처리
    console.log('Delete button clicked - no navigation');
  };

  return {
    navigateToDiaryDetail,
    handleCardClick,
    handleDeleteClick,
  };
};
