import Card from "../../components/Card/Card";
import { useShuffleArray } from "../../hooks/useShuffleArray";

export default function Section_variants({ size, name }) {

    const randomProductsSliced = useShuffleArray(3);

    return (

        <section className={`${size ? "hidden" : ""}`}>
            <h2 className="text-center my-4 text-2xl">Liknande produkter</h2>
            <div className="grid gap-2 grid-cols-3">
                {randomProductsSliced.map(product => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}