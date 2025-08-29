import Card from '../../components/Card/Card';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import { useShuffleArray } from '../../hooks/useShuffleArray';


export default function Section_variants() {
  const { isMobil, isIPad, isFull } = useWindowSizeValues();

  let index = 0;

  const randomProductsSliced = useShuffleArray(8);

  return (
    <section className='py-4'>
      <h3 className='hidden'>Ytterligare varianter</h3>
      <div className={`grid gap-2 ${isFull ? "grid-cols-4" : isIPad ? "grid-cols-2" : "grid-cols-1"}`}>
        {randomProductsSliced.map((product) => {
          const sizeClass = index >= 4 && isMobil ? "hidden" : "";
          index++;
          return (
            <Card
              key={product.id}
              product={product}
              className={sizeClass}
            />
          );
        })}

      </div>
    </section>
  );
}