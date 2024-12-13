import React from "react";
// i installed ionicon for the social media buttons, as well as imported the links from router dom to ensure that I can use the sections in the footer to navigate to other pages
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
                    {/* this is the footer shelter name, upon clicking, you can be navigated back to home page */}
                    <Link className="" to="/" onClick={handleClick}>Kit Cat Shelter</Link> 
                </div>
                {/* this is a copyright section, I added it to make it more professional and official looking */}
                <p className="text-teal-500 text-sm md:text-[1rem] sm:text-[0.7rem] lg:text-[1.5rem]" >
                © 2024 Kit Cat Shelter Updates. All rights reserved
                </p>
                {/* here are the ionicon social media button section, I also made it so you can hover over them, but they don't take you to anywhere, just for the overall presentation */}
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
