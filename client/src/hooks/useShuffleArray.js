import { useContext } from 'react';
import { DataContext } from '../contexts/dataServer.tsx';

export const useShuffleArray = (slice, query = undefined) => {

    const { products } = useContext(DataContext);

    const productsNew = products.filter(product => product.name !== product.kategori);
    
    for (let i = productsNew.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [productsNew[i], productsNew[j]] = [productsNew[j], productsNew[i]];
    }
  
    if (query) {
         const filteredProducts = productsNew.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        return filteredProducts.slice(0, slice);
    };

    return productsNew.slice(0,  slice );
};
