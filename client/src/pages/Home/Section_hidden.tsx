import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import HiddenCard from '../../components/Card/HiddenCard';

export default function Section_hidden(): JSX.Element {
  const { isFull } = useWindowSizeValues();

  // Создаем массив из 3 элементов для цикла
  const hiddenCards: JSX.Element[] = Array.from({ length: 3 }, (_, index: number) => (
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

