import React from "react";
import bannerImg from "../assets/kitty.jpeg";

function Banner () {

    return (
        <div className="text-purple-800 text-center">
            <img className="w-full relative -z-10 bottom-14" src={bannerImg} />
            <div className="absolute z-10 left-4 top-24 w-full" >
            </div>
        </div>
    );

}

export default Banner;

// this is the banner image at the top, I only added because I thought it looks empty without a banner image