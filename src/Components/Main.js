import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromGroq } from "./AI";

export default function Main() {
  const [ingredientList, setIngredientList] = React.useState([]);

  const [recipe, setRecipe] = React.useState(false);
  //const [recipeAnswer, setRecipeAnswer] = React.useState("");

  // New method to handle submit in forms.
  // preventDefault and reset are already included and need not be hardcoded inside function
  // function receives formdata not event object
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredientList((prevList) => [...prevList, newIngredient]);
  }

  async function getRecipe() {
    console.log("get recipe clicked!");
    const recipeMarkdown = await getRecipeFromGroq(ingredientList)
    setRecipe(recipeMarkdown);
  }

  //Old method to handle submit in forms
  // function handleSubmit(event) {
  //   event.preventDefault()
  //   console.log("form submitted")
  //   const formData = new FormData(event.currentTarget)
  //   const newIngredient = formData.get("ingredient")
  //   setIngredientList(prevList => [...prevList, newIngredient])
  // }

  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="eg. oregano"
          aria-label="Add Ingredient"
          name="ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      <ul>
        {/* {ingredientListItems} */}
        {
          ingredientList.length > 0 && (
            <IngredientsList
              
              ingredientList={ingredientList}
              getRecipe={getRecipe}
            />
          )

        }

        {recipe && <ClaudeRecipe recipe={recipe}/>}
      </ul>
    </main>
  );
}
