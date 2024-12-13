import React from "react";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";

function Footer () {
    const handleClick = () =>{
        window.scrollTo(0, 0);
    };

    return (
        <nav className="font-bold p-8">
            <div className="flex justify-between items-center">
                <div className="text-center text-4xl text-orange-800 ml-6 cursor-pointer hover:text-orange-300
                sm:text-[2rem] md:text-[1.5rem] lg:text-[2rem]
                ">
                    <Link className="" to="/" onClick={handleClick}>Kit Cat Shelter</Link> 
                </div>
                <p className="text-teal-500 text-sm md:text-[1rem] sm:text-[0.7rem] lg:text-[1.5rem]" >
                © 2024 Kit Cat Shelter Updates. All rights reserved
                </p>
                <div className="flex space-x-2 lg:space-x-4 lg:pr-[5rem]">
                <IonIcon className="text-teal-500 hover:text-orange-500 cursor-pointer text-2xl lg:text-[3rem]" name="logo-facebook" />
                <IonIcon className="text-teal-500 hover:text-orange-500 cursor-pointer text-2xl lg:text-[3rem]" name="logo-instagram" />
                <IonIcon className="text-teal-500 hover:text-orange-500 cursor-pointer text-2xl lg:text-[3rem]" name="logo-youtube" />
                </div>

            </div>
        </nav>
    );
}

export default Footer;
