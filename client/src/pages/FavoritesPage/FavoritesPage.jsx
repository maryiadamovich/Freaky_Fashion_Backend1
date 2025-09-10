import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import { getUser } from '../../moduls/storage';

export default function FavoritesPage() {
    const { isFull, isIPad } = useWindowSizeValues();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user = getUser();
       
        if (!user) return;

        const url = '/api/favorites?user_id=' + user.id;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                // check that data is an array
                if (Array.isArray(data)) {
                    setFavorites(data);
                } else {
                    console.warn('API returned not an array:', data);
                    setFavorites([]);
                }
            })
            .catch(error => {
                alert(error);
            });
    }, []);
    return (
        <main className="px-[1rem]">
            <h1 className="text-center font-bold my-4 text-xl">Mina favoriter</h1>
            <div className={`grid gap-2 ${isFull ? "grid-cols-4" : isIPad ? "grid-cols-2" : "grid-cols-1"}`}>
                {Array.isArray(favorites) && favorites.map(product => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}