import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';

const MainLayout = ({ children }) => {

    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default MainLayout;
