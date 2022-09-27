import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Figure from "react-bootstrap/Figure";
import { Row } from "react-bootstrap";

const { REACT_APP_API_SERVER_URL } = process.env;

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userRecipeList, setUserRecipeList] = useState(null);

  function handleLogOut() {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    async function getProfile() {
      try {
        const { data } = await axios.get(
          `${REACT_APP_API_SERVER_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);
        setUser(data);
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    }
    getProfile();
  }, [navigate, setUser]);

  useEffect(() => {
    if (user && user.favRecipes.length) {
      let promises = user.favRecipes.map((recipe) => {
        return axios.get(
          `${REACT_APP_API_SERVER_URL}/recipes/${recipe.recipeId}`
        );
      });

      async function getFavRecipes() {
        try {
          const data = await Promise.all(promises);
          const recipeList = data.map((e) => {
            return e.data;
          });
          setUserRecipeList(recipeList);
        } catch (err) {
          console.log(err);
        }
      }
      getFavRecipes();
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
          <h1 className="fs-2">Welcome {user.name}!</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="mb-3 fs-4">Your Favourite Recipes</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          {userRecipeList && (
            <Accordion defaultActiveKey="0">
              {userRecipeList.reverse().map((recipe, idx) => {
                return (
                  <Accordion.Item eventKey={`${idx}`} key={idx}>
                    <Accordion.Header>
                      <Figure className="mb-0">
                        <Figure.Image
                          width={100}
                          height={100}
                          alt="171x180"
                          src={`${REACT_APP_API_SERVER_URL}/images/${recipe.image}`}
                        />
                        <Figure.Caption className="fs-bold fs-6">{recipe.title}</Figure.Caption>
                      </Figure>
                    </Accordion.Header>
                    <Accordion.Body style={{ whiteSpace: "pre-wrap" }}>
                      <p className="fs-5 fw-bold">Ingredients</p>
                      <p>{recipe.ingredient}</p>
                      <span className="badge bg-primary rounded-pill me-2">
                        Cal {recipe.nutrition.calories}
                      </span>
                      <span className="badge bg-danger rounded-pill me-2">
                        Fat {recipe.nutrition.calories}
                      </span>
                      <span className="badge bg-success rounded-pill">
                        Protein {recipe.nutrition.protein}
                      </span>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
