/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 프로덕션 빌드에서 ESLint 오류로 빌드가 중단되지 않도록 설정
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
