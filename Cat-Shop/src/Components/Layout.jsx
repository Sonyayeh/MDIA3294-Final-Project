import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {

    return(
        <section>
            <Header />
            <main>
            <Footer />
            </main>
        </section>
    );
}

export default Layout;