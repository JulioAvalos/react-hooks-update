import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ userIngredinets, setUserIngredients ] = useState([]);
  
  useEffect(()=> {
    console.log('RENDERING INGREDIENTS', userIngredinets);
  },[userIngredinets]);

  //useCallback() caches this function so it survives render cycles, 
  //so this function is not recreated/doesnt change
  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://toma-pedido-cae71.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        { id: responseData.name, ...ingredient }
      ]);
    });
  };

  const removeIngredientHandler = ingredientId => {
    fetch(`https://toma-pedido-cae71.firebaseio.com/ingredients/${ingredientId}.json`, 
      {
        method: 'DELETE'
      }
    ).then(response => {
      setUserIngredients(prevIngredients => 
        prevIngredients.filter((ingredient) => 
          ingredient.id !== ingredientId
        )
      );
    });
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList 
          ingredients={userIngredinets} 
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
