import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

function List() {
    const [cats, setCats] = useState([]);
    const [text, setText] = useState("");
    const [searched, setSearched] = useState(false);
    const [favs, setFavs] = useState(() => {
        const savedFavs = localStorage.getItem("favs");
        return savedFavs ? JSON.parse(savedFavs) : [];
    });

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

        setSearched(false);
        fetchCatData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearched(true);
    };

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

    return (
        <section className="p-8 max-w-7xl mx-auto">
            <div className="text-center">
                <h1 className="flex items-center justify-center text-center px-5 text-3xl font-bold lg:text-5xl text-orange-300">
                    Search Our Available Breeds:
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl mx-auto mt-7"
                    autoComplete="off"
                >
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
                    <div className="bg-sky-300 md:h-72 w-full flex items-center justify-center">
                        <span>Adopted!</span>
                    </div>
                )}
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

                <Link to={`/${cat.name}`} className="text-blue-400">
                    More Info
                </Link>
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
