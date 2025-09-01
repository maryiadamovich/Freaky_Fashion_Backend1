import React from 'react';
import { useState } from 'react';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';

export default function LoginPage() {

    const { isMobil } = useWindowSizeValues();

    const [formData, setFormData] = useState({
        user_e_post: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    /*const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                alert(data.message);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };*/


    return (
        <main className="p-4">
            <h1 className='self-center font-bold'>Logga in</h1>
            <form className={`grid grid-cols-1 ${isMobil ? "w-full" : "w-1/2"}`}>
                <label htmlFor="user_e_post">E-post</label>
                <input className="border w-2/3" type="email" id="user_e_post" name="user_e_post" required pattern=".*\S.*"
                    value={formData.user_e_post} onChange={handleInputChange} />
                <label htmlFor="password">Lösenord</label>
                <input className="border w-2/3" type="password" id="password" name="password" required pattern=".*\S.*"
                    value={formData.password} onChange={handleInputChange} />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}
