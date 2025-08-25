/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { NavLink, useLocation } from "react-router-dom";

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

    return (
        <nav css={[containerStyle, cssProp]} {...rest}>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => { return isActive ? "text-lime-500" : "text-black"; }}>
                    Nyheter
                </NavLink></li>
                <li><NavLink to="product/svart-t-shirt" className={({ isActive }) => { return isActive || isLocation ? "text-lime-500" : "text-black"; }}>
                    Topplistan
                </NavLink></li>
                <li><NavLink to="/search" className={({ isActive }) => { return isActive ? "text-lime-500" : "text-black"; }}>
                    Rea
                </NavLink></li>
                <li><NavLink to="/admin/products" className="text-black">
                    Kampanjer
                </NavLink></li>
            </ul>
        </nav>
    );
}