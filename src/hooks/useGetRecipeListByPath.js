import axios from "axios";
import { useEffect, useState } from "react";

function useGetRecipeListByPath(initialPath) {
  const [recipeList, setRecipeList] = useState(null);
  const [path,setPath] = useState(initialPath)
  const [isErr,setIsErr] = useState(false)
  useEffect(()=>{
    async function getRecipeList(){
      try{
        const {data} = await axios.get(`${path}`)  
        setRecipeList(data)
        setIsErr(false)
      }catch(err){
        console.log(err)
        setIsErr(true)
      }   
    }
    getRecipeList()
  },[path])
  
  return [recipeList,setPath,isErr]
}

export default useGetRecipeListByPath;