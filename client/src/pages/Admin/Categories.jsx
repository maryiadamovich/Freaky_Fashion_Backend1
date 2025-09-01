import React, { useContext } from 'react';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues.js';
import { DataContext } from '../../contexts/dataServer.tsx';
import Button from "../../components/Button/Button";
import TableRow from "../../components/Table/TableRow";

function Categories() {
    const { isMobil } = useWindowSizeValues();

    const { products } = useContext(DataContext);
    const onlyCategoryNames = [
        ...new Set(
          products
            .map(item => item.kategori)
            .sort((a, b) => a.localeCompare(b))
        )
      ].map((kategori, index) => ({
        id: index,
        kategori
      }));

    return (
        <main className='grid grid-cols-2 grid-rows-[15% 1fr] px-2'>
            <h1 className='self-center font-bold'>Kategorier</h1>
            <Button link="/admin/categories/new" size={`${isMobil ? "w-full" : "w-40"}`} text="Ny kategori" />

            <table className="col-span-2 border">
                <thead>
                    <tr className='text-left border bg-gray-200'>
                        <th>Namn</th>
                    </tr>
                </thead>
                <tbody>
                    {onlyCategoryNames.map((product) => (
                        <TableRow key={product.id} product={product} />
                    ))}
                </tbody>
            </table>
        </main>
    );
}

export default Categories