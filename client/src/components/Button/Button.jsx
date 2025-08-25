import { Link } from 'react-router-dom';

export default function Button({ size, text, link }) {

    return (
        <Link to={link} className={`inline-block ${size}`}>
            <button className={`my-4 p-2 border rounded-md text-nowrap w-full`}>
                {text}
            </button>
        </Link>
    );
}