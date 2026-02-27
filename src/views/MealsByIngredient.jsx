import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MealCard from '../components/MealCard';
import MainLayout from '../layouts/MainLayout';

const MealsByIngredient = () => {
    const { ingredient } = useParams();
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/filter.php?i=${ingredient}`);
                const data = await response.json();
                setMeals(data.meals || []);
            } catch (error) {
                console.error('Error fetching meals by ingredient:', error);
            }
        };

        fetchMeals();
    }, [ingredient]);

    return (
        <MainLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Meals with {ingredient}</h1>
                {meals.length === 0 ? (
                    <p className="text-center text-gray-500">No meals found for this ingredient.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {meals.map((meal) => (
                            <MealCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default MealsByIngredient;