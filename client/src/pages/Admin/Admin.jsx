import { useLocation } from 'react-router-dom';
import { useWindowSizeValues } from '../../contexts/useWindowSizeValues';
import AdminHeader from "../../components/AdminHeader/Adminheader";
import AdminAside from "../../components/AdminAside/AdminAside";
import Table from './Table';
import Form from './Form';

export default function Admin() {

    const { isMobil } = useWindowSizeValues();

    const location = useLocation();
    const isActive = location.pathname === '/admin/products';

    return (
        <div className={`grid ${isMobil ? "grid-cols-1 grid-rows-[15% 15% 1fr]" : "grid-cols-[25% 1fr] grid-rows-[15% 1fr]"}`}>
            <AdminHeader />
            <AdminAside />
            {isActive ? <Table /> : <Form />}
        </div>
    );
}