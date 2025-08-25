import { useWindowSizeValues } from '../../contexts/useWindowSizeValues';
import Button from "../../components/Button/Button";
import { shuffleArray } from "../../contexts/shuffleArray";
import useChangeTitle from '../../contexts/useChangeTitle';
import { useLocation } from 'react-router-dom';

export default function Section_main({ name }) {
    const { isFull, isMobil } = useWindowSizeValues();
    const location = useLocation();

    const isDetailProductRoute = location.pathname.startsWith('/product');

    useChangeTitle(name, isDetailProductRoute);

    const productDetail = shuffleArray(1, name);

    if (!productDetail || productDetail.length === 0) {
        return <p>Product not found</p>;
    }

    const photo = `https://placehold.co/400x600/grey/white?text=${productDetail[0].name}`;

    return (
        <section className={`my-4 ${!isMobil ? "grid grid-cols-2" : ""}`}>
            <div>
                <img className="w-full h-auto border" src={photo} alt="Main photo" />
            </div>
            <div className={`text-left  ${isFull ? "max-w-2/3" : ""} ${!isMobil ? "ml-8" : ""}`}>
                <h1 className="text-2xl font-bold">{productDetail[0].name}</h1>
                <span>{productDetail[0].label}</span>
                <p className='pb-4'>
                    {productDetail[0].description}
                </p>
                <span className='block'>{productDetail[0].price} SEK</span>
                <Button
                    size={`${isMobil ? "w-full" : "w-1/2"}`}
                    text="Lägg i varukorg"
                />
            </div>
        </section>
    );
}