import React from "react";
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return(
        <nav className="font-bold p-4">
            <div>
                <div>
                    <Link to="/">Cats</Link>
                </div>
                <div>
                    <div 
                    onClick={toggleMenu}>
                    <IonIcon
                    name={isMenuOpen ? "close-outline" : "menu-outline"}
                    />
                </div>
            </div>
        </nav>
    )
}