import React, { useContext } from 'react';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues.js';
import { DataContext } from '../../contexts/dataServer.tsx';
import Button from "../../components/Button/Button";
import TableRow from "../../components/Table/TableRow";


export default function Table() {

    const { isMobil } = useWindowSizeValues();

    const { products } = useContext(DataContext);
    const sortedData = [...products].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <main className='grid grid-cols-2 grid-rows-[15% 1fr] px-2'>
            <h1 className='self-center font-bold'>Produkter</h1>
            <Button link="/admin/products/new" size={`${isMobil ? "w-full" : "w-40"}`} text="Ny produkt" />

            <table className="col-span-2 border">
                <thead>
                    <tr className='text-left border bg-gray-200'>
                        <th>Namn</th>
                        <th>SKU</th>
                        <th>Pris</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((product) => (
                        <TableRow key={product.id} product={product} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}