import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Figure from "react-bootstrap/Figure";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const { REACT_APP_API_SERVER_URL } = process.env;

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userRecipeList, setUserRecipeList] = useState(null);
  const navigate = useNavigate();

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
          const data = await Promise.allSettled(promises);
          const recipeList = data.filter((e) => {
              if(e.status==='fulfilled'){
                return true;
              }else{
                return false;
              }
          }).map((e) => {
            return e.value.data;
          });
          setUserRecipeList(recipeList);
        } catch (err) {
          console.error(err);
        }
      }
      getFavRecipes();
    }
  }, [user]);

  return isLoading ? (
    <div className="container">
      <div className="row">
        <Spinner animation="border" />
      </div>
    </div>
  ) : (
    <div className="container mb-3">
      <div className="row mb-3">
        <div className="col">
          <h1 className="fs-2">Welcome {user.name}!</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 className="mb-3 fs-4">Your Favourite Recipes</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          {userRecipeList && (
            <Accordion defaultActiveKey={userRecipeList.length - 1}>
              {userRecipeList
                .map((recipe, idx) => {
                  return (
                    <Accordion.Item eventKey={idx} key={idx}>
                      <Accordion.Header>{recipe.title}</Accordion.Header>
                      <Accordion.Body style={{ whiteSpace: "pre-wrap" }}>
                        <Figure.Image
                          width={200}
                          height={200}
                          alt="171x180"
                          src={`${REACT_APP_API_SERVER_URL}/images/${recipe.image}`}
                        />
                        <p className="fs-5 fw-bold">Ingredients</p>
                        <span className="text-danger">
                          Servings {recipe.serving}
                        </span>
                        <p>{recipe.ingredient}</p>
                        <div className="mb-3">
                          <span className="badge bg-primary rounded-pill me-2">
                            Cal {recipe.nutrition.calories}
                          </span>
                          <span className="badge bg-danger rounded-pill me-2">
                            Fat {recipe.nutrition.fat}
                          </span>
                          <span className="badge bg-success rounded-pill me-2">
                            Protein {recipe.nutrition.protein}
                          </span>
                        </div>
                        <div>
                          <Button
                            variant="info"
                            as={Link}
                            to={`/${recipe.id}`}
                            size="sm"
                            className="text-white"
                          >
                            See full details
                          </Button>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })
                .reverse()}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
