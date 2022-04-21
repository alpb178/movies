import useMediaContext from '@/hooks/useMediaContext';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { useRouter } from 'next/router';
import React from 'react';

function NotFound() {
  const { isSmallScreen } = useMediaContext();
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{
        maxHeight: '100%',
        height: isSmallScreen
          ? `calc(100vh - ${NAVBAR_HEIGHT + 8}px)`
          : `calc(100vh - ${NAVBAR_HEIGHT}px)`
      }}
    >
      <h1 className="text-xl">
        <span className="font-semibold">Error 404</span>
        {` page not found`}
      </h1>
      <button type="button" onClick={() => router.back()}></button>
    </div>
  );
}

export default NotFound;
