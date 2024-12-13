import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// this page is mainly managing the liked cats

function Fav() {
    const [savedCats, setSavedCats] = useState(() => {
        const savedCats = localStorage.getItem("favs");
        return savedCats ? JSON.parse(savedCats) : [];
    });

    useEffect(() =>{
        //this is to fetch the data of the saved cats you saved. it will get the info about the breed
        fetch("https://api.thecatapi.com/v1/breeds")
        .then((response) => response.json())
        .then((cats) => {
            const favCats = cats.filter((allCats) => savedCats.includes(allCats.name));
            setSavedCats(favCats);
        });
    }, []);

    return (
        // this is the page information
        // this is the top title section of the favorite page
        <>
        <h1 className="flex items-senter justify-center text-centerpx-5 text-2xl font-bold lg:text-[2rem] text-orange-600 m-10">
        Interested Adoption List:    
        </h1> 
        {/* this is if there are no liked cats, the web page will say the adoption list is empty */}
        {savedCats.length === 0 ? (
          <p className="text-center text-lg text-orange-500 my-20 mx-20">
              Your list is empty!
          </p>  
        ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:m-4 xl:grid-cols-3 my-10 
            lg:my-10">
                {/* this section is to show the information about the saved cats, it will show the image and name of the cat */}
                {savedCats.map((cat) => (
                    <div 
                    key={cat.name}
                    className="bg-orange-300 p-4 rounded md:p-2 md:w-[15rem] md:h-[20rem]">
                    <article>
                        <img src={cat.reference_image_id
                            ? `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
                            : "https://via.placeholder.com/150"
                        }
                        alt={cat.name}
                        loading="lazy"
                        className="rounded p-2 h-56 w-full object-cover" />
                        <h3 className="text-blue-400 text-center text-md fontbold mt-2">
                            {cat.name}
                        </h3>
                        {/* this is the button section
                        if you click on the button, you can remove the cat from the favorite list, I also added the hover effect as well to make interactive */}
                        <button
                        onClick={() => {
                            const updatedFavs = savedCats.filter((fav) => fav.name !== cat.name);
                            setSavedCats(updatedFavs);
                            localStorage.setItem("favs", JSON.stringify(updatedFavs.map((d) => d.name)));
                        }}
                        className="text-xs text-orange-400 bg-white hover:bg-blue-400 hover:text-white p-1 ml-[20rem] rounded mt-2
                        md:ml-[4rem]"
                        >
                            Remove from list
                        </button>
                    </article>
                    </div>
                ))}
            </div>
        )}
        {/* this is the button that goes back to the adoption list, I also added the link to list.jsx that is attached to the button */}
        <div className="flex justify-center">
            <Link
            to="/Search"
            className="inline-block border-2 border-orange-500 py-2 px-6 rounded mt-8 text-blue-500 hover:bg-orange-400 hover:text-black hover:border-orange-200 transition-all duration-200">
                Back to Adoptables
            </Link>
        </div>
        <div className="mb-40"></div>

        </>
    )
}

export default Fav;