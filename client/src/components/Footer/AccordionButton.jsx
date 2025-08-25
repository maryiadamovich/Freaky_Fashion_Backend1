import React, { useState } from "react";

export default function AccordionButton({ buttonKey, buttonsName, buttonsTexts }) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="border-b">
            <button
                className="w-full text-left p-4 text-black focus:outline-none"
                onClick={toggleList}
            >
                {buttonsName}
            </button>
            {isOpen && (
                <ul className="pl-4 pb-4">
                    {buttonsTexts.map((buttonsText, index) => (
                        <li key={index} className="text-left">{buttonsText}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
