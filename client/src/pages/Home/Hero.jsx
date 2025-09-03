import React, { useState, useRef, useContext } from "react";
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues.js';

import { DataContext } from '../../contexts/dataServer.tsx';
import { useUser } from '../../contexts/userInfo';


export default function DetailPage() {

    const { isFull } = useWindowSizeValues();
    const { products } = useContext(DataContext);
    const { user } = useUser();

    const [photo, setPhoto] = useState(null);
    const intervalRef = useRef(null);

    const photos = products.map(product =>
        `https://placehold.co/600x400/grey/white?text=${product.name}`
    );

    const startSlideshow = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (photos.length > 0) {
            let index = 0; 
            setPhoto(photos[index]); 

            intervalRef.current = setInterval(() => {
                index = (index + 1) % photos.length;
                setPhoto(photos[index]); 
            }, 1000);
        }
    };


    if (products.length > 0 && !intervalRef.current) {
        startSlideshow();
    }

    return (
        <section className={`border p-2 my-4 ${isFull ? "flex flex-row-reverse justify-between" : ""}`}>
            <div>
                {user && <p className="text-2xl font-bold mb-2">Välkommen {user.name}!</p>}
                <img className={isFull ? "min-w-[600px] h-[400px]" : "w-full h-auto"} src={photo} alt="Main photo" />
            </div>
            <div className="text-center m-4">
                <h1 className="text-3xl font-bold">Lorem ipsum dolor</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
        </section>
    );
}