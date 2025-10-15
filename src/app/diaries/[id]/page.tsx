import React from 'react';
import DiariesDetail from '@/components/diaries-detail';

interface PageProps {
  params: {
    id: string;
  };
}

const DiariesDetailPage: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <DiariesDetail id={params.id} />
    </div>
  );
};

export default DiariesDetailPage;
