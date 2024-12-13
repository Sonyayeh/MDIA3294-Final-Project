import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";

function Cat() {
    const [cat, setCats] = useState([])
    const {name} =useParams()

    useEffect(() => {
        const fetchCatData = async () => {
            try {
                const res = await fetch(
                    `https://api.thecatapi.com/v1/images/search?breed_ids=${name}`
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
            <section className="max-w-[2rem] bg-orange-500 mx-auto flex items-center justify-center h-screen">
                {cat.map((item) => (
                    <div
                    key={item.id}
                    className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2 md:place-items-center">
                        <article>
                            <img
                            src={`https://cdn2.thecatapi.com/images/${cat.name}.jpg`}
                            alt={item.name}
                            />
                        </article>
                        <article>
                            <h1 className="text-3xl font-bold text-blue-800 mb-8 lg:text-[2rem]">
                                {item.name}
                            </h1>
                            <ul className="text-sm text-orange-300 leading-loose lg:text-base lg:leading-relaxed">
                                <li className="mb-2">
                                    <span className="text-emerald-600">Health:</span> {" "} 
                                    {item.health_issues}
                                </li>
                                <li className="mb-2">
                                    <span className="text-emerald-600">Energy Level:</span> {" "} 
                                    {item.energy_level}
                                </li>
                                <li className="mb-2">
                                    <span className="text-emerald-600">Weight:</span> {" "} 
                                    {item.metric} kg
                                </li>
                                <li className="mb-2">
                                    <span className="text-emerald-600">Adaptability:</span> {" "} 
                                    {item.adaptability}
                                </li>
                                <li className="mb-2">
                                    <span className="text-emerald-600">Shedding:</span> {" "} 
                                    {item.shedding_level}
                                </li>
                            </ul>
                                <Link
                                to="/Search"
                                className="text-white bg-sky-500 rounded-md py-2 px-4 hover:bg-white hover:text-sky-500
                                sm:ml-[18rem] lg:text-[1.5rem] md:ml-[25rem]"
                                >
                                    Return
                                </Link>
                        </article>
                    </div>
                ))}
            </section>
        </>
    )
}
export default Cat