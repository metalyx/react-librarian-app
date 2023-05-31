import React from 'react';
import Navbar from './Navbar';
import { useAppSelector } from '../hooks/redux';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const isLoggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);

    return (
        <div>
            {isLoggedIn && <Navbar />}
            {children}
        </div>
    );
};

export default Layout;
