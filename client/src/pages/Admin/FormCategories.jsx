import React from 'react';
import { useState } from "react";
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';

function FormCategories() {

  const { isMobil } = useWindowSizeValues();

  const [formData, setFormData] = useState({
    photo: "",
    kategori: "",
    name: "",
    price: 0.00,
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
    
    // Update data to send
    const dataToSend = {
      ...formData,
      name: formData.kategori,
    };
    
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
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
  };



  return (
    <main className="p-4">
      <h1 className='self-center font-bold'>Ny produkt</h1>

      <form onSubmit={handleSubmit} className={`grid grid-cols-1 ${isMobil ? "w-full" : "w-1/2"}`}>
        <label htmlFor="kategori">Namn</label>
        <input className="border w-2/3" type="text" id="kategori" name="kategori" required pattern=".*\S.*" value={formData.kategori}
          placeholder="Obligatoriskt" onChange={handleInputChange} maxLength="25" />

        <label htmlFor="photo">Bild</label>
        <input className="border w-full" type="text" id="photo" name="photo" value={formData.photo}
          placeholder="Skapas automatiskt" readOnly
        />

        <button className={`my-4 p-2 border rounded-md text-nowrap justify-self-start ${isMobil ? "w-1/2" : "w-40"}`} type="submit">
          Lägg till
        </button>
      </form>
    </main>
  )
}

export default FormCategories