import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Content() {
    const [initialized, setInitialized] = useState(false);
  
    useEffect(() => {
      // Ensure the slider initializes correctly
      setInitialized(true);
    }, []);
  
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000, // Speed of the slide transition
      autoplaySpeed: 2000, // Delay between slides
      cssEase: "linear", // Smooth animation
    };
  
    const handleClick = () => {
      window.scrollTo(0, 0);
    };
  
    return (
      <div>
        {/* Header Section */}
        <div className="bg-indigo-800 text-white text-center my-2 p-10">
          <h2 className="text-4xl mb-2">Muffin Our Weekly Winner</h2>
          <h3 className="text-2xl">Muffin is an adorable bulldog with a personality as big as his paws! 
              He is cute and funny where shows off his goofy side—whether.  
              His playful antics and charming expressions will steal your heart!</h3>
        </div>
  
        {/* Slider Section */}
        <div className="mb-8">
          {initialized && (
            <Slider {...settings}>
              <div className="p-2">
                <img src="https://imgur.com/a/aA7N1G5" alt="sleepy cat" />
              </div>
              <div className="p-2">
                <img src="https://imgur.com/a/4OD3SJd" alt="box cat" />
              </div>
              <div className="p-2 ">
                <img src="https://imgur.com/a/wmQl1Pp" alt="grey cat" />
              </div>
              <div className="p-2 " >
                <img src="https://imgur.com/a/jHhftD8" alt="staring cat" />
              </div>
              <div className="p-2">
                <img src="https://imgur.com/a/X0wL53B" alt="tux cat" />
              </div>
              <div className="p-2 ">
                <img src="https://imgur.com/a/sLDuPcJ" alt="black cats are so cute omg" />
              </div>
            </Slider>
          )}
        </div>
  
          <div className="bg-indigo-800 py-24 p-4 ">
            <h2 className="text-white text-center text-4xl mb-6">Vote For Your Favourite DogZ</h2>
            <div className="flex flex-wrap justify-center lg:flex-nowrap items-center">
              {/* Left Image */}
              <img
                className="w-full sm:w-8/12 lg:w-80 mb-4 lg:mb-0"
                src="https://i.imgur.com/jQIQEqh.jpeg"
                alt="golden"
              />
  
              {/* Center Content */}
              <div className="text-center px-4">
                <h3 className="text-white px-5 text-center my-2 mb-8">
                  Our contest kicks off every Sunday at 12:00 PST! Join the fun and vote
                  for your favorite dogs from the latest batch of adorable pups. Whether
                  they’re playful, goofy, or just plain cute, you won’t want to miss the
                  chance to support your top picks. Click here to cast your vote and make
                  a pup’s day!
                </h3>
                <Link
                  className="text-white border-2 border-white rounded-md py-2 px-4 hover:bg-white hover:text-black"
                  to="/Search"
                  onClick={handleClick}
                >
                  Vote Now
                </Link>
              </div>
              {/* Right Image */}
              <img
                className="w-full sm:w-8/12 lg:w-80 mt-4 lg:mt-0"
                src="https://i.imgur.com/f2AjHOt.jpeg"
                alt="havanese"
              />
            </div>
          </div>
  
      </div>
      
    );
  }
  
  export default Content;
  
