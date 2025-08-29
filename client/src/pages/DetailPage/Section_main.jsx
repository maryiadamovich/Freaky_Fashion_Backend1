import { useWindowSizeValues } from '../../hooks/useWindowSizeValues.js';
import Button from "../../components/Button/Button";
import { useContext } from "react";
import { DataContext } from "../../contexts/dataServer.tsx";
import { useChangeTitle } from '../../hooks/useChangeTitle';
import { useLocation } from 'react-router-dom';

export default function Section_main({ name }) {
    const { isFull, isMobil } = useWindowSizeValues();
    const location = useLocation();
    const { products } = useContext(DataContext);

    const isDetailProductRoute = location.pathname.startsWith('/product');
    useChangeTitle(name, isDetailProductRoute);

    //find a product from the Context
    const productDetail = products.find(product => 
        product.name.toLowerCase() === name.toLowerCase()
    );
    
    if (!productDetail) {
        console.log('Product not found - returning early');
        return <p>Product not found</p>;
    }

    const photo = `https://placehold.co/400x600/grey/white?text=${productDetail.name}`;

    return (
        <section className={`my-4 ${!isMobil ? "grid grid-cols-2" : ""}`}>
            <div>
                <img className="w-full h-auto border" src={photo} alt="Main photo" />
            </div>
            <div className={`text-left  ${isFull ? "max-w-2/3" : ""} ${!isMobil ? "ml-8" : ""}`}>
                <h1 className="text-2xl font-bold">{productDetail.name}</h1>
                <span>{productDetail.label}</span>
                <p className='pb-4'>
                    {productDetail.description}
                </p>
                <span className='block'>{productDetail.price} SEK</span>
                <Button
                    size={`${isMobil ? "w-full" : "w-1/2"}`}
                    text="Lägg i varukorg"
                />
            </div>
        </section>
    );
}