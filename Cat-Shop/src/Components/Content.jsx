import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import wow from "../assets/wow.jpeg";

function Content() {
    const [initialized, setInitialized] = useState(false);
  
    useEffect(() => {
      // Ensure the slider initializes correctly
      setInitialized(true);
    }, []);
  
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
    };
    
  
    const handleClick = () => {
      window.scrollTo(0, 0);
    };
  
    return (
        <div>
          
         <div>
  {/* Header Section */}
  <div className="relative my-2 p-10">
  <img src={wow} alt="Description of the image" className="mx-auto w-full h-auto" />
  
  {/* Overlayed text with left and right padding */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-10 text-gray-200 
  
  ">
    <h2 className="text-4xl mb-2 
    lg:mb-[8rem] lg:pr-[45rem] lg:text-[5rem] lg:pt-[5rem] lg:ml-4
    sm:mb-[7rem] sm:pr-[14rem] 
    ">What is Kit Cat Shelter?</h2>
    <h3 className="text-2xl font-bold text-left
    sm:pr-[9rem] sm:pl-[2rem]
    lg:ml-[1rem] lg:pr-[50rem] lg:pb-[20rem]">
      Kit Cat Shelter is a cat shelter that allows people to foster and adopt cats. We believe cats can help with people's mental health and accompany them whenever they are feeling down.
    </h3>

      <button className="rounded text-blue-800 bg-blue-200 px-3 py-2 hover:bg-blue-800 hover:text-blue-200
      sm:mt-[2rem] sm:mr-[20rem] 
      lg:mb-[3rem] lg:mr-[50rem] lg:text-[2rem]
      ">Learn more</button>
  </div>
</div>


      
  
       
          <div className="bg-orange-300 py-24 p-4 ">
            <h2 className="text-sky-500 text-center text-4xl mb-8 md:pl-[3-rem] md:text-[3rem] lg:pl-[40rem] lg:text-[4rem]">Why choosing Kit Cat Shelter?</h2>
            <div className="flex flex-wrap lg:flex-nowrap ">
              {/* Left Image */}
              <img
                className="w-full sm:w-full lg:w-[40rem] lg:pl-[2rem] mb-4 "
                src="https://i.imgur.com/mCWTFwt.jpeg"
                alt="Sitting cat"
              />
  
              {/* Center Content */}
              <div className="px-4">
                <h3 className="text-sky-500 px-5 my-2 mb-9
                md:text-[1.6rem] lg:text-[1.5rem]">
                  Kit Cat Shelter is set on a mission: to find the perfect home for our cats. Every living being deserves being happy, and that also includes stray cats. There was a record of having around 50,000 to 100,000 cats living outside in Vancouver. Kit Cat Shelter provides shelter and shots for all strays, preparing them from getting adopted into their forever home!
                </h3>
                <Link
                  className="text-white bg-sky-500 rounded-md py-2 px-4 hover:bg-white hover:text-sky-500
                  sm:ml-[18rem] lg:text-[1.5rem] md:ml-[25rem] 
                  "
                  to="/Search"
                  onClick={handleClick}
                >
                  Adopt Now!
                </Link>
              </div>
              
            </div>
            
          </div>

            </div>
             {/* Slider Section */}
        <div className="mt-8">
          {initialized && (
            <Slider {...settings}>
              <div className="p-2">
                <img src="https://i.imgur.com/WFdwqPK.jpeg" alt="sleepy cat" />
              </div>
              <div className="p-2">
                <img src="https://i.imgur.com/xdvwuGl.jpeg" alt="box cat" />
              </div>
              <div className="p-2 ">
                <img src="https://i.imgur.com/es1BDlc.jpeg" alt="grey cat" />
              </div>
              <div className="p-2 " >
                <img src="https://i.imgur.com/Ruru5kx.jpeg" alt="staring cat" />
              </div>
              <div className="p-2">
                <img src="https://i.imgur.com/PQeIuNF.jpeg" alt="tux cat" />
              </div>
              <div className="p-2 ">
                <img src="https://i.imgur.com/AqnYRNs.jpeg" alt="black cats are so cute omg" />
              </div>
            </Slider>
          )}
        </div>
  
         </div>


      
    );
  }
  
  export default Content;
  