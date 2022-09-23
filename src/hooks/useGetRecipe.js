import axios from "axios";
import { useEffect, useState } from "react";

function useGetRecipe(recipeId) {

  const { REACT_APP_API_SERVER_URL } = process.env;

  const [recipe,setRecipe] = useState(recipeId)

  useEffect(()=>{
    async function getRecipe(){
      try{
        const {data} = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes/${recipeId}`)
        setRecipe(data)
      }catch(err){
        console.log(err)
        setRecipe(null)
      }
    }
    getRecipe()
  },[recipeId,REACT_APP_API_SERVER_URL])

  return recipe;
}

export default useGetRecipe;