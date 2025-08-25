import React from "react";
import { useWindowSizeValues } from '../../contexts/useWindowSizeValues';
import AccordionButton from "./AccordionButton";

export default function Accordion() {
    const { isMobil } = useWindowSizeValues();

    const buttonsNames = [
        { key: 0, name: "Shopping", list: ["Vinterjackor", "Pufferjackor", "Kappa", "Trenchcoats"] },
        { key: 1, name: "Mina Sidor", list: ["Mina Ordrar", "Mitt Konto"] },
        { key: 2, name: "Kundtjänst", list: ["Returnpolicy", "Integritetspolicy"] }
    ];

    const maxRows = Math.max(...buttonsNames.map(buttonsName => buttonsName.list.length));

    return (
        isMobil ? (
            <div className="w-full overflow-hidden mb-4">
                {buttonsNames.map(buttonsName => (
                    <AccordionButton
                        key={buttonsName.key}
                        buttonsName={buttonsName.name}
                        buttonsTexts={buttonsName.list}
                    />
                ))}
            </div>
        ) : (
            <div className="max-w-lg py-10 pl-6">
                
                    <table className="w-full">
                        <thead>
                            <tr>
                                {buttonsNames.map(buttonsName => (
                                    <th key={buttonsName.key} className="text-left text-1xl pb-4">{buttonsName.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: maxRows }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {buttonsNames.map((buttonsName, colIndex) => (
                                        <td key={colIndex}>
                                            {buttonsName.list[rowIndex] || ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
               
            </div>
        )
    );
}