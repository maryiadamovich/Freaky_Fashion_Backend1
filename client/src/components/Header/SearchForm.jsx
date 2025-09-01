/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchForm({ css: cssProp, ...rest }) {

    const containerStyle = css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `;

    const [searchField, setSearchField] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchField}`);
        setSearchField("");
      };

    return (
        <div css={[containerStyle, cssProp]} {...rest}>
            <form onSubmit={handleSubmit} className="relative inline w-full pr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute mt-1 ml-1 w-6 h-6 pointer-events-none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input className="w-4/5 pl-7 h-8 border rounded-[10px] text-l animate-[myfirst_5s_infinite]" type="text" value={searchField} onChange={(e) => setSearchField(e.target.value)} placeholder="Sök produkt" />
            </form>
        </div>
    );
}