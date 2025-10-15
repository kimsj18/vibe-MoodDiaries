"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface ReactQueryProviderProps {
  children: ReactNode;
}

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5분간 캐시 유지
            staleTime: 1000 * 60 * 5,
            // 네트워크 연결 시 자동 refetch
            refetchOnWindowFocus: false,
            // 컴포넌트 마운트 시 자동 refetch
            refetchOnMount: true,
            // 재시도 횟수
            retry: 1,
          },
          mutations: {
            // 뮤테이션 재시도 횟수
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
