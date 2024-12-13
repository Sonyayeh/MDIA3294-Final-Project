import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

// this is the cat list section
function List() {
    const [cats, setCats] = useState([]);
    const [text, setText] = useState("");
    const [searched, setSearched] = useState(false);
    // this one is when you saved a cat, it will be saved to the local storage in console
    const [favs, setFavs] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

    // this is to fetch the data of the cat breeds from the cat API
    useEffect(() => {
        const fetchCatData = async () => {
            try {
                const res = await fetch("https://api.thecatapi.com/v1/breeds");
                const data = await res.json();
                setCats(data);
            } catch (error) {
                console.error(error);
            }
        };
        // if the search result doesn't show up any available cat breeds, the page will return as empty
        setSearched(false);
        fetchCatData();
    }, []);
    // This function stops the form from refreshing the page and sets `searched` to `true` to start a search.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearched(true);
    };

    // this is to add or remove any favorited cats, and will update the local storage whenever a cat is added or removed
    const toggleFav = (catID) => {
        let updatedFavs;
        if (favs.includes(catID)) {
            updatedFavs = favs.filter((favId) => favId !== catID);
        } else {
            updatedFavs = [...favs, catID];
        }
        localStorage.setItem("favs", JSON.stringify(updatedFavs));
        setFavs(updatedFavs);
    };

    // this is the page section
    return (
        <section className="p-8 max-w-7xl mx-auto">
            <div className="text-center">
                {/* this is the text section of the page */}
                <h1 className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl text-orange-300">
                    Search Our Available Breeds:
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto mt-7"
                    autoComplete="off"
                >
                    {/* this is the search bar, different colors will show up when the texts are typed */}
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="British Shorthair"
                        className="py-2 px-6 text-sky-400 rounded shadow w-full italic bg-orange-200 placeholder-orange-400"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </form>
            </div>
            {/* to make this part simplier, this is the cat card section
            I have it in an orange background, with different image and information depending on what cat you are choosing. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 ">
                {cats
                    .filter((cat) =>
                        cat.name.toLowerCase().includes(text.toLowerCase())
                    )
                    .map((cat) => (
                        <article key={cat.id} className="border rounded p-4 bg-orange-200 relative">
                {cat.reference_image_id ? (
                    <img
                        src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
                        alt={cat.name}
                        loading="lazy"
                        className="rounded md:h-72 w-full object-cover"
                    />
                ) : (
                    // there are cats where there are no images, I purposely set it to as if the cat was already adopted
                    <div className="bg-sky-300 md:h-72 w-full flex items-center justify-center">
                        <span>Adopted!</span>
                    </div>
                )}
                {/* this is the cat info, I included the name, origin, affection leve, child friendliness and intelligence */}
                <h3 className="text-orange-400 text-xl font-bold mt-4">{cat.name}</h3>
                <p className="text-emerald-600">
                    <span>Name:</span> {cat.name}
                </p>
                <p className="text-emerald-600">
                    <span>Origin:</span> {cat.origin}
                </p>
                <p className="text-emerald-600">
                    <span>Affection level:</span> {cat.affection_level}
                </p>
                <p className="text-emerald-600">
                    <span>Child Friendliness:</span> {cat.child_friendly}
                </p>
                <p className="text-emerald-600">
                    <span>Intelligence:</span> {cat.intelligence}
                </p>
                {/* this button will take you to the more info page about each cat */}
                <Link to={`/${cat.name}`} className="text-blue-400">
                    More Info
                </Link>
                {/* this is the heart button, and can be toggled with filled and unfilled */}
                <button
                    onClick={() => toggleFav(cat.name)}
                    className="absolute bottom-4 right-4 text-orange-400 text-2xl flex p-2 rounded"
                >
                    {favs.includes(cat.name) ? (
                        <IonIcon name="heart" />
                    ) : (
                        <IonIcon name="heart-outline" />
                    )}
                </button>
            </article>

                    ))}
            </div>
        </section>
    );
}

export default List;
