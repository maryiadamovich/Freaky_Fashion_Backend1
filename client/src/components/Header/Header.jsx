/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Logo from './Logo';
import SearchForm from './SearchForm';
import Icons from './Icons';
import Navigation from './Navigation';

const gridStyle = css`
  display: grid;
  grid-template-columns: 1fr 35%;
  grid-template-areas: 
    "logo logo"
    "search icons"
    "nav nav";
  width: 100%;
  padding: 1rem 1rem 0 1rem;
  gap: 0.5rem;

  @media (min-width: 640px) {
    grid-template-columns: 35% 35% 1fr;
    grid-template-areas: 
      "logo search icons"
      "nav nav nav";
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 25% 25% 1fr;
  }
`;

export default function Header() {
    return (
        <header css={gridStyle}>
            <Logo css={css`grid-area: logo;`} />
            <SearchForm css={css`grid-area: search;`} />
            <Icons css={css`grid-area: icons;`}/>
            <Navigation css={css`grid-area: nav;`} />
        </header>
    );
}