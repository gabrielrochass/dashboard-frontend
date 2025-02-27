import React, { useState } from 'react';
import './navbar.css';
const logo = require('../assets/oncase-logo.png');

export default function Sidebar() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <button onClick={toggleMenu} className="menu-toggle-button">
                ☰
            </button>
            <div className={`sidebar ${showMenu ? 'show' : ''}`}>
                <nav className="sidebar-menu">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/partners">Partners</a></li>
                        <li><a href="/companies">Companies</a></li>
                        <li><a href="/participation">Participation</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
