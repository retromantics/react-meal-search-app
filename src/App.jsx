import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Ingredients from "./views/Ingredients";
import MealsByIngredient from "./views/MealsByIngredient";
import MealDetail from "./views/MealDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ingredients" element={<Ingredients />} />
      <Route path="/ingredient/:ingredient" element={<MealsByIngredient />} />
      <Route path="/meal-detail/:id" element={<MealDetail />} />
    </Routes>
  );
}

export default App;
