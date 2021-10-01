// outsource dependencies
import { useState, useCallback, useEffect } from 'react';

export const MIN_HEIGHT = 500;
export const HEADER_HEIGHT = 64;

const useFreeHeight = () => {
  const [height, setHeight] = useState(Math.max(window.innerHeight - HEADER_HEIGHT, MIN_HEIGHT));
  const updateWindowDimensions = useCallback(() => {
    setHeight(Math.max(window.innerHeight - HEADER_HEIGHT, MIN_HEIGHT));
  }, []);
  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [updateWindowDimensions]);
  return height;
};

export default useFreeHeight;
