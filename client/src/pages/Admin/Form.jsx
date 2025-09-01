import { useState } from "react";
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import Button from "../../components/Button/Button";


export default function NewProduct() {

    const { isMobil } = useWindowSizeValues();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        photo: "",
        label: "",
        sku: "",
        price: 0.00,
        kategori: "",
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
    };


    return (
        <main className="p-4">
            <h1 className='self-center font-bold'>Ny produkt</h1>

            <form onSubmit={handleSubmit} className={`grid grid-cols-1 ${isMobil ? "w-full" : "w-1/2"}`}>
                <label htmlFor="name">Namn</label>
                <input className="border w-2/3" type="text" id="name" name="name" required pattern=".*\S.*" value={formData.name}
                    placeholder="Obligatoriskt" onChange={handleInputChange} maxLength="25" />

                <label htmlFor="description">Beskrivning</label>
                <textarea className="border w-full" id="description" name="description" rows="5" cols="50" maxLength="500" value={formData.description}
                    onChange={handleInputChange}
                ></textarea>

                <label htmlFor="photo">Bild</label>
                <input className="border w-full" type="text" id="photo" name="photo" value={formData.photo}
                    placeholder="Skapas automatiskt" readOnly
                />

                <label htmlFor="label">Märke</label>
                <input className="border w-full" type="text" id="label" name="label" maxLength="50" pattern=".*\S.*" value={formData.label}
                    onChange={handleInputChange}
                />

                <label htmlFor="sku">SKU</label>
                <input className="border w-1/3" type="text" id="sku" name="sku" maxLength="20" value={formData.sku}
                    onChange={handleInputChange}
                />

                <label htmlFor="price">Pris</label>
                <input className="border w-1/3" type="real" name="price" min="0" max="10000" step="0.01" value={formData.price}
                    onChange={handleInputChange}
                />

                <label htmlFor="kategori">Kategori</label>
                <select className="border w-full" id="kategori" name="kategori" value={formData.kategori}
                    onChange={handleInputChange}>
                    <option value="">Välj kategori</option>
                    <option value="kläder">Kläder</option>
                    <option value="accessoarer">Accessoarer</option>
                    <option value="skor">Skor</option>
                </select>

            <button className={`my-4 p-2 border rounded-md text-nowrap justify-self-start ${isMobil ? "w-1/2" : "w-40"}`} type="submit">
                Lägg till
            </button>
        </form>
        </main >
    );
}