import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import { getUser, getToken, setToken } from '../../moduls/storage';

export default function FavoritesPage() {
    const { isFull, isIPad } = useWindowSizeValues();
    const [favorites, setFavorites] = useState([]);

    //check is accesstoken is valid
    function isTokenExpired(token) {
        if (!token) return true;

        try {
            const payloadBase64 = token.split('.')[1];
            if (!payloadBase64) return true;
            const payload = JSON.parse(atob(payloadBase64));

            const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
            return payload.exp < currentTime;
        } catch (e) {
            console.error('Cannot decode token', e);
            return true; // We consider that it has expired
        }
    }

    useEffect(() => {
        const user = getUser();
        let accessToken = getToken();

        if (!user) return;

        const url = '/api/favorites?user_id=' + user.id;

        // async function to send request
        async function makeRequest() {
            if (isTokenExpired(accessToken)) {
                // if token is expired, try to refresh it
                const resRefresh = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    credentials: 'include' // send refreshtoken through cookies
                });

                if (resRefresh.status === 200) {
                    const data = await resRefresh.json();
                    setToken(data.accessToken);
                    accessToken = data.accessToken;
                }
                else {
                    throw new Error('Failed to refresh token');
                }
            }

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
            });

            return res;
        }

        // create async function inside useEffect
        const fetchData = async () => {
            try {
                let res = await makeRequest();
                if (res.ok) {
                    const data = await res.json();
                    setFavorites(data);
                } else if (res.status === 404) {
                    setFavorites([]); //no favorites found
                } else {
                    throw new Error('Failed to fetch favorites');
                }
            } catch (err) {
                console.error('Error:', err);
                setFavorites([]);
            }
        };

        // call async function
        fetchData().catch(err => {
            console.error('Error:', err); // log error
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