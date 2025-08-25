/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";

export default function Logo({ css: cssProp, ...rest }) {

    const logo = 'https://placehold.co/300x100/grey/white?text=Logo';

    return (
        <div css={cssProp} {...rest}>
            <Link to="/">
                <img className="w-full" src={logo} alt="logo" />
            </Link>
        </div>

    );
}