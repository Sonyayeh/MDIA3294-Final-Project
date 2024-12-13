import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {

    return(
        <section>
            <Header />
            <main>
            <Outlet />
            </main>
            <Footer />
        </section>
    );
}

export default Layout;

// this page is to add the style of the page. The header is on the top and footer is at the bottom. this is to ensure that the content of header and footer remain the same, so is the position.