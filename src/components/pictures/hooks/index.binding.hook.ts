import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

// API 응답 타입 정의
interface DogApiResponse {
  message: string[];
  status: string;
}

// 강아지 사진 데이터 타입
interface DogPicture {
  id: string;
  src: string;
  alt: string;
}

// 강아지 사진 목록 조회 API 함수
const fetchDogPictures = async (): Promise<DogApiResponse> => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random/6');
  
  if (!response.ok) {
    throw new Error('Failed to fetch dog pictures');
  }
  
  return response.json();
};

// 무한스크롤 강아지 사진 목록 훅
export const useDogPictures = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['dogPictures'],
    queryFn: fetchDogPictures,
    getNextPageParam: () => true, // 항상 다음 페이지가 있다고 가정 (무한스크롤)
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    gcTime: 1000 * 60 * 10, // 10분간 가비지 컬렉션 방지
  });

  // 모든 페이지의 강아지 사진들을 하나의 배열로 변환
  const pictures: DogPicture[] = data?.pages.flatMap((page, pageIndex) =>
    page.message.map((src, index) => ({
      id: `${pageIndex}-${index}`,
      src,
      alt: `강아지 사진 ${pageIndex * 6 + index + 1}`,
    }))
  ) || [];

  // 무한스크롤 감지를 위한 ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 무한스크롤 콜백 함수
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Intersection Observer 설정
  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersect, {
        threshold: 0.1,
        rootMargin: '100px',
      });
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect]);

  // 마지막 2개 아이템 중 하나에 ref를 설정하는 함수
  const getItemRef = useCallback(
    (index: number) => {
      const totalItems = pictures.length;
      // 마지막에서 2번째 아이템에 ref 설정 (무한스크롤 트리거)
      if (index === totalItems - 2) {
        return loadMoreRef;
      }
      return null;
    },
    [pictures.length]
  );

  return {
    pictures,
    isLoading,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    getItemRef,
    status,
  };
};