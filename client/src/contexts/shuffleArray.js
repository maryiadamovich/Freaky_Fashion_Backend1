import { useContext } from 'react';
import { DataContext } from './dataServer';

export const shuffleArray = (slice, query = undefined) => {

    const { products } = useContext(DataContext);
    
    for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
    }
  
    if (query) {
         const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        return filteredProducts.slice(0, slice);
    };

    return products.slice(0,  slice );
};
