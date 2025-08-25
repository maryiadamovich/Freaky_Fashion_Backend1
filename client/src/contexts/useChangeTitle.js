import { useEffect } from 'react';

const useChangeTitle = (name, isActivePage) => {
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

export default useChangeTitle;