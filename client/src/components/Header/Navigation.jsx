/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from 'react';
import { DataContext } from '../../contexts/dataServer';

export default function Navigation({ css: cssProp, ...rest }) {

    const containerStyle = css`
        ul li {
            font-weight: 700; 
            margin-right: 1em;
        }
    @media (min-width: 640px) {
        ul li {
            display: inline;
        }
    }
    `;

    const location = useLocation();
    const isLocation = location.pathname.startsWith('/product');

    const { products } = useContext(DataContext);
    const categories = [...new Set(products.map(item => item.kategori).filter(Boolean))];

    return (
        <nav css={[containerStyle, cssProp]} {...rest}>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>
                        <NavLink to={`/`} className={({ isActive }) =>
                            isActive ? "text-black font-bold" : "text-black"
                        }>
                            {category}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
