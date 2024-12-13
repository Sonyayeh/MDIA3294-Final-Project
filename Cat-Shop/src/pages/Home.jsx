import React from "react";
import Banner from "../Components/Banner";
import Content from "../Components/Content";

function Home () {
    return(
        <div>
            <Banner />
            <Content />
        </div>
    );
}

export default Home;

// I am basically importing th ebanner and the content from components, it is placed accordingly to how I want the elements be placed