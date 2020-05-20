import {useEffect, useState} from 'react';

export function useWindowSize() {
  const isClient =
    typeof window === 'object' && typeof window.addEventListener === 'function';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      diagonal: isClient
        ? Math.sqrt(
            Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2),
          )
        : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
