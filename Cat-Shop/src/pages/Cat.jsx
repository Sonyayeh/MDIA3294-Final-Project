import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

function Cat() {
    const [cat, setCats] = useState([])
    const {name} =useParams()

    useEffect(() => {
        const fetchCatData = async () => {
            try {
                const res = await fetch(
                    `https://api.thecatapi.com/v1/breeds/search?q=${name}`
                )

                const data = await res.json()
                setCats(data)
                console.log(data)
                } catch (error) {
                    console.error(error)
                }
        }

        fetchCatData()
    }, [name])

    return (
        <>
            <section className=" bg-orange-300 mx-auto flex items-center justify-center h-screen">
                {cat.map((cat) => (
                    <div
                    key={cat.id}
                    className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
                        <article>
                            <img
                            src={`
                                https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
                            alt={cat.name}
                            />
                        </article>
                        <article>
                            <h1 className="text-3xl font-bold text-orange-800 mb-8 md:ml-[10rem] lg:text-[2rem]">
                                {cat.name}
                            </h1>
                            <ul className="text-sm text-blue-500 leading-loose lg:text-base lg:leading-relaxed">
                                <li className="mb-2">
                                    <span className="font-bold text-emerald-600">Health:</span> {" "} 
                                    {cat.health_issues}
                                </li>
                                <li className="mb-2">
                                    <span className="font-bold text-emerald-600">Energy Level:</span> {" "} 
                                    {cat.energy_level}
                                </li>
                                <li className="mb-2">
                                    <span className="font-bold text-emerald-600">Description:</span> {" "} 
                                    {cat.description}
                                </li>
                                <li className="mb-2">
                                    <span className="font-bold text-emerald-600">Adaptability:</span> {" "} 
                                    {cat.adaptability}
                                </li>
                                <li className="mb-2">
                                    <span className="font-bold text-emerald-600">Shedding Level:</span> {" "} 
                                    {cat.shedding_level}
                                </li>
                            </ul>
                                <Link
                                to="/Search"
                                className="text-green-200 bg-orange-500 rounded-md py-2 px-4 hover:bg-green-200 hover:text-orange-500
                                sm:ml-[18rem] lg:text-[1.5rem] md:ml-[8rem]"
                                >
                                    Return to adoption list
                                </Link>
                        </article>
                    </div>
                ))}
            </section>
        </>
    )
}
export default Cat