import { useLocation } from 'react-router-dom';
import { useWindowSizeValues } from '../../hooks/useWindowSizeValues';
import AdminHeader from "../../components/AdminHeader/Adminheader";
import AdminAside from "../../components/AdminAside/AdminAside";
import Table from './Table';
import Form from './Form';
import Categories from './Categories';
import FormCategories from './FormCategories';

export default function Admin() {

    const { isMobil } = useWindowSizeValues();

    const location = useLocation();
    const isActiveProducts = location.pathname === '/admin/products';
    const isActiveNewProducts = location.pathname === '/admin/products/new';
    const isActiveCategories = location.pathname === '/admin/categories';
    const isActiveNewCategories = location.pathname === '/admin/categories/new';

    return (
        <div className={`grid ${isMobil ? "grid-cols-1 grid-rows-[15% 15% 1fr]" : "grid-cols-[25% 1fr] grid-rows-[15% 1fr]"}`}>
            <AdminHeader />
            <AdminAside />
            {isActiveProducts ? <Table /> : isActiveNewProducts ? <Form /> : null}
            {isActiveCategories ? <Categories /> : isActiveNewCategories ? <FormCategories /> : null}
        </div>
    );
}