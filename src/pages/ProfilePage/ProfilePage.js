import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
const { REACT_APP_API_SERVER_URL } = process.env;

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userRecipeList, setUserRecipeList] = useState(null)
  // function getFavRecipes(){
  //   let promises = user.favRecipes.map((recipe)=>{
  //     return axios.get(`${REACT_APP_API_SERVER_URL}/recipes/${recipe.id}`)
  //   })
  //   console.log(promises)
  // }

  async function getProfile(token) {
    try {
      const { data } = await axios.get(
        `${REACT_APP_API_SERVER_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setIsLoading(false);
      setUser(data);
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  }

  function handleLogOut() {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    getProfile(token);
    // Here grab the token from sessionStorage and then make an axios request to profileUrl endpoint.
    // Remember to include the token in Authorization header
  }, []);

  useEffect(() => {
    if (user && !user.favRecipes.length) {
        let promises = user.favRecipes.map((recipe) => {
          return axios.get(`${REACT_APP_API_SERVER_URL}/recipes/${recipe.recipeId}`);
        });

      
      async function getFavRecipes() {
        try{
          const data = await Promise.all(promises)
          const recipeList = data.map((e)=>{
            return e.data
          })
          console.log(recipeList)
          setUserRecipeList(recipeList)
        }catch(err){
          console.log(err)
        }
      }
      getFavRecipes()
    }
   
  }, [user]);

  return isLoading ? (
    <div className="container">
      <div className="row">
        <h1>Loading...</h1>
      </div>
    </div>
  ) : (
    <div className="container">
      <div className="row mb-3">
        <div className="col-sm-3">
          <h1 className="fs-4">Welcome {user.name}!</h1>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          {userRecipeList && <Accordion defaultActiveKey="0">
            {userRecipeList.map((recipe) => {
              return (
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{`${recipe.title}`}</Accordion.Header>
                  <Accordion.Body>{`${recipe.ingredient}`}</Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
