import React from 'react';
import { useState } from 'react';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userInfo';

export default function RegisterPage() {
    const { isMobil } = useWindowSizeValues();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "", //John567doe
    });
    const [error, setError] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
        })
            .then((response) => {
                console.log('Response status:', response.status);

                if (!response.ok) {
                    return response.json().then(errorData => {
                        throw new Error(errorData.error || 'Login failed');
                    });
                }

                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);

                // create user object
                const userData = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                };

                // save to context
                setUser(userData);

                // clear form data
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                });

                sessionStorage.setItem('accessToken', data.accessToken);

                if (data.message === "User logged in") {
                    navigate('/');
                } else {
                    alert(data.message || 'Error logging in');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message || 'Login failed. Check email and password.');
            });
    };
    return (
        <main className="p-4">
            <h2 className="font-bold">Registrera dig</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className={`grid grid-cols-1 ${isMobil ? "w-full" : "w-1/2"}`}>
                <label htmlFor="name">Namn</label>
                <input className="border w-2/3" type="text" id="name" name="name" required pattern=".*\S.*"
                    value={formData.name} onChange={handleInputChange} />
                <label htmlFor="email">E-post</label>
                <input className="border w-2/3" type="email" id="email" name="email" required pattern=".*\S.*"
                    value={formData.email} onChange={handleInputChange} />
                <label htmlFor="password">Lösenord</label>
                <input className="border w-2/3" type="password" id="password" name="password" required pattern=".*\S.*"
                    value={formData.password} onChange={handleInputChange} />
                <button className={`my-4 p-2 border rounded-md text-nowrap justify-self-start ${isMobil ? "w-1/2" : "w-40"}`} type="submit">Registrera dig</button>
            </form>
        </main>
    );
}