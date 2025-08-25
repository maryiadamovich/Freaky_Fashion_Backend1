import { useWindowSize } from 'react-use';

export function useWindowSizeValues() {
  const { width } = useWindowSize();
  
  const isMobil = width < 640;
  const isIPad = width >= 640 && width < 1024;
  const isFull = width >= 1024;

  return { isMobil, isIPad, isFull };
}