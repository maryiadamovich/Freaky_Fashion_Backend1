import Hero from "./Hero";
import Section_hidden from "./Section_hidden";
import Section_variants from "./Section_variants";


export default function Home() {
  
  return (
    <main className="px-[1rem]">
      <Hero />
      <Section_hidden />
      <Section_variants />
    </main>
  );
}