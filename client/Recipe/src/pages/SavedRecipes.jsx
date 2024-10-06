import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        if (userID) {
          const response = await axios.get(
            `http://localhost:3001/recipes/savedRecipes/${userID}`
          );
          setSavedRecipes(response.data.savedRecipes);
          console.log(savedRecipes);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => {
          const { ingredients } = recipe;
          console.log(recipe);
          return (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <p>{recipe.description}</p>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
              {/* <h1>{recipe.ingredients[0]}</h1>
              {ingredients.map((value,key) => (
                
                <p key={key}>Ingredients:{value}</p>
          ))} */}
              <p>Ingredietnts: {ingredients.join(", ")}</p>
              <p>Instructions: {recipe.instructions}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SavedRecipes;
