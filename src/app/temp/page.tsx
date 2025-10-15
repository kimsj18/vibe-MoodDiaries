import React from 'react';
import DiariesNew from '@/components/diaries-new';

const TempPage = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <DiariesNew />
    </div>
  );
};

export default TempPage;
