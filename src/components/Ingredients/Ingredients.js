import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ userIngredinets, setUserIngredients ] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients, 
      { id: Math.random().toString(), ...ingredient }
    ]);
  };

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => 
      prevIngredients.filter((ingredient) => 
        ingredient.id !== ingredientId
      )
    );
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList 
          ingredients={userIngredinets} 
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
