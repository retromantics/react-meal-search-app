import React from "react";
import { useState, useEffect } from "react";
import MealCard from "../components/MealCard";
import MainLayout from "../layouts/MainLayout";
import SearchForm from "../components/SearchForm";
import LoadingIndicator from "../components/LoadingIndicator";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Home() {
    const [search, setSearch] = useState("");
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState("");
    const [heading, setHeading] = useState("Random Meals");
    const [loading, setLoading] = useState(false);

    const handleSearch = (query) => {
        console.log("Search query :", query);

        if (!query) {
            setHeading("Random Meals");
            fetchRandomMeals();
            return;
        }
        setMeals([]);
        setError("");
        setLoading(true);

        //Fetch data from API
        try {
            const url = `${API_BASE_URL}/search.php?s=${query}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setHeading(`Search results for "${query}"`);
                    setMeals(data.meals || []); // Set meals to an empty array if data.meals is null
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching data ", error);
                    setError("Failed to fetch meals");
                    setLoading(false);
                });
        } catch (error) {
            console.log("Error fetching meals:", error);
            setError("Failed to fetch meals");
            setLoading(false);
        }
    };

    // Fetch 6 random meals when the app loads
    const fetchRandomMeals = async () => {
        setError("");
        setLoading(true);
        try {
            //throw new Error('Simulated error fetching random meals') // Simulate an error for testing
            const url = `${API_BASE_URL}/random.php`;
            const promises = Array.from({ length: 6 }, () =>
                fetch(url).then((response) => response.json()),
            );
            const results = await Promise.all(promises);
            const randomMeals = results.map((result) => result.meals[0]);
            setMeals(randomMeals);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching random meals:", error)
            setError("Error fetching random meals")
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchRandomMeals();
    }, []);

    return (
        <MainLayout>
            <div className="p-4">
                <div className="flex justify-center my-4">
                    <SearchForm
                        search={search}
                        setSearch={setSearch}
                        handleSearch={handleSearch}
                    />
                </div>

                <h2 className="text-2xl font-bold mb-4">{heading}</h2>
                {error && <p className="text-center  text-red-500 py-8">{error}</p>}
                {loading && <LoadingIndicator />}
                {!loading && meals.length === 0 && !error && (
                    <p className="text-center py-8 text-gray-400">No meals found</p>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {meals.map((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default Home;
