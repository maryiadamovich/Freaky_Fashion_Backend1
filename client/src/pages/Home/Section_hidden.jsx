import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import HiddenCard from '../../components/Card/HiddenCard';

export default function Section_hidden() {

  const { isFull } = useWindowSizeValues();

  const hiddenCards = Array.from({ length: 3 }, (_, index) => (
    <HiddenCard key={index} />
  ));

  return (
    <section className={isFull ? "" : "hidden"}>
      <h3 className='hidden'>Ytterligare bilder</h3>
      <div className='grid gap-2 grid-cols-3'>
        {hiddenCards}
      </div>
    </section>
  );
}
