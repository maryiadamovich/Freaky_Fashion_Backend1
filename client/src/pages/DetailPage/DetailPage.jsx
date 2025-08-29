import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import Section_main from "./Section_main";
import Section_variants from "./Section_variants";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function DetailPage() {

  const { isMobil } = useWindowSizeValues();
  const { name } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [name]);
  
  return (
    <main className="px-[1rem]">
      <Section_main name={name}/>
      <Section_variants size={isMobil} name={name} />
    </main>
  );
}