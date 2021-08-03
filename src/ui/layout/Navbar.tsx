import React from 'react';
import NavbarLink from '../components/NavbarLink';
import '../stylesheets/navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-xl">
            <a className="navbar-brand">inquirED</a>
            <i
                id="loading-icon"
                className="fas fa-cog fa-spin fa-2x loading-icon"
                title="Loading..."
                style={{ display: 'none' }}
            ></i>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul className="navbar-nav">
                    <NavbarLink text="Admin Panel" />
                    <NavbarLink text="Unit Dashboard" />
                    <NavbarLink text="Curriculum Library" />
                    <NavbarLink text="PD & Learning" />
                    <NavbarLink text="Help" />
                    <li className="nav-item dropdown show"></li>
                    <li className="nav-item dropdown show">
                        <a
                            className="nav-link dropdown-toggle text-lowercase text-capitalize"
                            href="#"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Admin
                            <div
                                className="avatar avatar-sm"
                                style={{ position: 'relative' }}
                            >
                                A
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
