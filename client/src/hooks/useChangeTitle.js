import { useEffect } from 'react';

export const useChangeTitle = (name, isActivePage) => {
  useEffect(() => {
    if (isActivePage && name) {
      document.title = name; 
    }

    return () => {
      if (isActivePage) {
        document.title = 'Freaky Fashion'; 
      }
    };
  }, [name, isActivePage]);
};