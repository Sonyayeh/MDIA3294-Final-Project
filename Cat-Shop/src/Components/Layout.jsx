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