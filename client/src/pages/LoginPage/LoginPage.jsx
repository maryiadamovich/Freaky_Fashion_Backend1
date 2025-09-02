import React from 'react';
import { useState } from 'react';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const { isMobil } = useWindowSizeValues();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "", //John567doe
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                console.log('Response status:', response.status);
                
                // Проверяем статус ответа
                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || 'Login failed');
                    });
                }
                
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
                //alert(data.message);
                //window.location.reload();
                setFormData({
                    email: "",
                    password: "",
                });

                if (data.message === "User logged in") {
                    navigate('/');
                } else {
                    alert(data.message || 'Error logging in');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <main className="p-4">
            <h1 className='self-center font-bold'>Logga in</h1>
            <form onSubmit={handleSubmit} className={`grid grid-cols-1 ${isMobil ? "w-full" : "w-1/2"}`}>
                <label htmlFor="email">E-post</label>
                <input className="border w-2/3" type="email" id="email" name="email" required pattern=".*\S.*"
                    value={formData.email} onChange={handleInputChange} />
                <label htmlFor="password">Lösenord</label>
                <input className="border w-2/3" type="password" id="password" name="password" required pattern=".*\S.*"
                    value={formData.password} onChange={handleInputChange} />
                <button className={`my-4 p-2 border rounded-md text-nowrap justify-self-start ${isMobil ? "w-1/2" : "w-40"}`} type="submit">Login</button>
            </form>
        </main>
    );
}
