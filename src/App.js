import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from "./components/HomepageComponent"
import NewRecipe from './components/NewRecipeComponent';
import FindRecipe from './components/FindRecipeComponent';
import RecipePage from './components/RecipePageComponent';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="new" element={<NewRecipe />} />
            <Route path="find" element={<FindRecipe />} />
            <Route path="recipes/:recipeId" element={<RecipePage />} />   
        </Routes>
    </div>
  );
}

export default App;
