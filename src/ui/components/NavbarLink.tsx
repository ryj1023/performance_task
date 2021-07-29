import React from 'react';

const NavbarLink = ({ text }: { text: string }): JSX.Element => {
    return (
        <li className="nav-item-inquired">
            <a href="#" className="nav-link-inquired">
                {text}
            </a>
        </li>
    );
};

export default NavbarLink;
