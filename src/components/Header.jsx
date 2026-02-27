import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 flex items-center justify-between p-4 ">
            <Link to="/" className="text-white text-2xl" >Meal Search</Link>
            <div className='flex gap-4 items-center'>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-indigo-600 p-2' : 'text-whie p-2'}>Home</NavLink>
                <NavLink to="/ingredients" className={({ isActive }) => isActive ? 'text-indigo-600 p-2' : 'text-whie p-2'}> Ingredients</NavLink>
            </div>
        </header >
    );
};

export default Header;