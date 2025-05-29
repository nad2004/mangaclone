import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
const Layout = () => {
    return (
        <div className="min-h-screen" >
            <Header />
            <div className='pt-[100px]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;