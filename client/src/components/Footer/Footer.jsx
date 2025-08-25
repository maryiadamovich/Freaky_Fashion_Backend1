/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useWindowSizeValues } from '../../contexts/useWindowSizeValues';
import Accordion from './Accordion';
import Data from './Data';

export default function Footer() {

    const { isMobil } = useWindowSizeValues();

    const gridStyle = css`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    width: 100%;
    border-top: 1px solid black;
    margin-top: 1rem;
    padding-bottom: 2rem;
    }
  `;

  return (
    <footer css={gridStyle} className={isMobil ? "bg-white" : "bg-[#b3b3b389]"}>
      <Accordion />
      <Data />
    </footer>
  );
}