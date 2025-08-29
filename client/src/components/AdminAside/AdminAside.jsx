import { NavLink } from "react-router-dom";


export default function AdminAside() {

  return (
    <aside className="bg-gray-200 p-4">
      <NavLink to="/admin/products" className={({ isActive }) => `text-4xl ${isActive ? 'font-bold' : 'font-normal'}`}>
        <h2>Produkter</h2>
      </NavLink>
      <NavLink to="/admin/categories" className={({ isActive }) => `text-4xl ${isActive ? 'font-bold' : 'font-normal'}`}>
        <h2 className="mt-6">Kategorier</h2>
      </NavLink>
    </aside>
  );
}