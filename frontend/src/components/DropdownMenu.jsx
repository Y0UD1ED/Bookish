import React, { useState } from 'react';

const DropdownMenu = ({btns}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuItemClick = (item) => {
        console.log(`Выбрано: ${item}`);
        setIsOpen(false); // Закрываем меню после выбора
    };

    return (
        <div className="dropdown">
            <div className="three-dots" onClick={toggleMenu}>
                &#x2022;&#x2022;&#x2022; {/* Три точки */}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {btns.map(k=>
                        <div onClick={() =>k.onClickFunc()}>{k.btnText}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
