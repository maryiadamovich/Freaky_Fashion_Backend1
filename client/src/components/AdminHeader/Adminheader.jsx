import { useWindowSizeValues } from '../../contexts/useWindowSizeValues';
import { Link } from 'react-router-dom';

export default function AdminHeader() {

  const { isMobil } = useWindowSizeValues();

  return (
    <header className={`bg-black text-white p-4 items-center ${!isMobil ? "col-span-2" : ""}`}>
      <Link to="/">
        <h2 className="text-4xl">Administration</h2>
      </Link>
    </header>
  );
}