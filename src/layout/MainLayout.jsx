import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/footer/Footer';
import Nav from '../components/shared/navber/Nav';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">

            <Nav/>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;