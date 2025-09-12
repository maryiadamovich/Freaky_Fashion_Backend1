import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import { getUser, getToken } from '../../moduls/storage';

export default function FavoritesPage() {
    const { isFull, isIPad } = useWindowSizeValues();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const user = getUser();

        if (!user) return;

        const url = '/api/favorites?user_id=' + user.id;
        let accessToken = getToken(); // take accesstoken from session storage

        // async function to send request
        async function makeRequest() {
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
            let res = await makeRequest();  // try to make request with current access token

            if (res.status === 401) {
                // if token is expired, try to refresh it
                const resRefresh = await fetch('/auth/refresh', {
                    method: 'POST',
                    credentials: 'include' // send refreshtoken through cookies
                });

                if (resRefresh.status === 200) {
                    // if refresh is successful, get a new token
                    accessToken = getToken(); // update token
                    res = await makeRequest(); // repeat request with new token
                } else {
                    // if failed to refresh token, throw an error
                    throw new Error('Failed to refresh token');
                }
            }

            // if request is successful, can work with received data
            if (res.status === 200) {
                const data = await res.json(); // convert response to JSON
                console.log('Favorites data:', data); 
                setFavorites(data);
            } else {
                // if failed to make request (for example, after refresh), throw an error
                throw new Error('Failed to fetch favorites');
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