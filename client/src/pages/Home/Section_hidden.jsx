import { useWindowSizeValues } from '../../contexts/useWindowSizeValues';
import HiddenCard from '../../components/Card/HiddenCard';

export default function Section_hidden() {

  const { isFull } = useWindowSizeValues();

  return (
    <section className={isFull ? "" : "hidden"}>
      <h3 className='hidden'>Ytterligare bilder</h3>
      <div className='grid gap-2 grid-cols-3'>
        <HiddenCard />
        <HiddenCard />
        <HiddenCard />
      </div>
    </section>
  );
}