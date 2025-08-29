import React, { createContext, useState, useEffect, ReactNode } from 'react';

// waiting that format from server
interface Product {
  id: number;
  name: string;
  description?: string;
  photo?: string;
  label?: string;
  sku?: string;
  price: number;
  kategori?: string;
}

// declare what will be send to the app in the value
interface DataContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// create context with type
export const DataContext = createContext<DataContextType | undefined>(undefined);

// declare what props will be taken
interface DataProviderProps {
  children: ReactNode;
}

// DataProvider - this is React functional component, which:
// 1. creates context provider (DataContext.Provider)
// 2. takes props of type DataProviderProps (children)
// 3. returns JSX element (DataContext.Provider with value)
export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setError(null);
      })
      .catch((error: Error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DataContext.Provider value={{ products, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
