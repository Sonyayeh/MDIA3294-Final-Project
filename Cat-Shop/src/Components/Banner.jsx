import React from "react";
import bannerImg from "../assets/kitty.jpeg";

function Banner () {

    return (
        <div className="text-orange-500 text-center">
            <img className="w-full relative -z-10 bottom-14 left-12" src={bannerImg} />
            <div className="absolute z-10 left-4 top-24 w-full" >
                <h1 className="font-bold text-4xl mb-6">
                    Hello!
                </h1>
                <p className="font-semibold text-2xl mt-2">
                    Do you like cat naps too?
                </p>
            </div>
        </div>
    );

}

export default Banner;