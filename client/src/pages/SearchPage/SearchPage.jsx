import React from "react";
import { useSearchParams } from "react-router-dom";
import { useWindowSizeValues } from '../../contexts/useWindowSizeValues';
import Card from "../../components/Card/Card";
import { shuffleArray } from "../../contexts/shuffleArray";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { isIPad, isFull } = useWindowSizeValues();

  const randomProductsSliced = shuffleArray(3, query);

  return (
    <main className="px-[1rem]">
      <h1 className="text-center font-bold my-4 text-xl">Hittade {randomProductsSliced.length} produkter</h1>
      <div className={`grid gap-2 ${isFull ? "grid-cols-4" : isIPad ? "grid-cols-2" : "grid-cols-1"}`}>
        {randomProductsSliced.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}