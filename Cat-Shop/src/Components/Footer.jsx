import React from "react";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";

function Footer () {
    const handleClick = () =>{
        window.scrollTo(0, 0);
    };

    return (
        <nav className="font-bold p-4">
            <div className="flex justify-between items-center">
                <div className="text-center text-4xl text-blue-300 ml-6 cursor-pointer hover:text-orange-300">
                    <Link className="" to="/" onClick={handleClick}>Kittyyyyyy</Link> 
                </div>
                <p className="text-teal-500 text-sm">
                copy 2024 Cat Shop Updates. All rights reserved. 
                </p>
                <IonIcon className="text-teal-500 text-2xl" name="logo-facebook" />
                <IonIcon className="text-teal-500 text-2xl" name="logo-instagram" />
                <IonIcon className="text-teal-500 text-2xl" name="logo-youtube" />
            </div>
        </nav>
    );
}

export default Footer;
