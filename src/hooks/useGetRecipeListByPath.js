import axios from "axios";
import { useEffect, useState } from "react";

function useGetRecipeListByPath(initialPath) {
  const [recipeList, setRecipeList] = useState(null);
  const [path,setPath] = useState(initialPath)

  useEffect(()=>{
    async function getRecipeList(){
      try{
        const {data} = await axios.get(`${path}`)
        console.log(data)
        setRecipeList(data)
      }catch(err){
        console.log(err)
      }   
    }
    getRecipeList()
  },[path])
  
  return [recipeList,setPath]
}

export default useGetRecipeListByPath;