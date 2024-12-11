import React, { useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import IonIcon from "@reacticons/ionicons";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="font-bold p-4">
            <div className="flex justify-between items-center">
               
                 <div className="text-center text-4xl cursor-pointer">
                    <Link to="/" className="text-indigo-800  hover:text-indigo-400">Kitty</Link>
                </div>
                
                <div className="flex items-center space-x-4">
                   
                    <div className="md:hidden text-indigo-800" onClick={toggleMenu}>
                        <IonIcon
                            name={isMenuOpen ? "close-outline" :"menu-outline"}
                            className="text-indigo-800 text-3xl cursor-pointer"
                        />
                    </div>
                    <ul
    className={`${
        isMenuOpen ? "block" : "hidden"
    } absolute md:static top-16 left-0 w-full md:w-auto text-center bg-white shadow-md md:shadow-none md:flex space-x-4 md:space-x-0 p-2 md:p-0`}
>
    <li className="list-none mb-2 md:mb-0 md:space-x-0">
        <Link
            to="/"
            className="block md:inline-block rounded-md px-4 py-2 text-indigo-800 hover:bg-indigo-400 hover:text-white"
        >
            Home
        </Link>
    </li>
    <li className="list-none mb-2 md:mb-0 md:space-x-0">
        <Link
            to="/search"
            className="block md:inline-block rounded-md px-4 py-2 text-indigo-800 hover:bg-indigo-400 hover:text-white"
        >
            Search
        </Link>
    </li>
    <li className="list-none mb-2 md:mb-0 md:space-x-0">
        <Link
            to="/fav"
            className="block md:inline-block rounded-md px-4 py-2 text-indigo-800 hover:bg-indigo-400 hover:text-white"
        >
            My Favourite
        </Link>
    </li>
</ul>

                </div>
            </div>
        </nav>
    );
}

// Export Header component to be used in App.jsx
export default Header;