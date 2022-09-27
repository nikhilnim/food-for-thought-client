import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./RecipeDetails.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const token = sessionStorage.getItem("token");
const { REACT_APP_API_SERVER_URL } = process.env;

function RecipeDetails({ recipe }) {
  const [user, setUser] = useContext(UserContext);
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      let temp = user.favRecipes.some((e) => {
        console.log("fav recipe", e);
        return e.recipeId === recipe.id;
      });
      setIsFav(temp);
    }
  }, []);

  async function addToUserFav() {
    const token = sessionStorage.getItem("token");
    const payload = {
      userId: user.id,
      recipeId: recipe.id,
    };
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_SERVER_URL}/users/favrecipe`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsFav(true);
      getProfile();
    } catch (err) {
      console.log(err);
    }
  }

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
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center mb-3">
        <Col md="auto">
          <h1>{recipe.title}</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg="auto">
          <Image
            src={`${REACT_APP_API_SERVER_URL}/images/${recipe.image}`}
            fluid
            thumbnail
          ></Image>
        </Col>
        <Col lg="3">
          <p className="fs-5 fw-bold mb-0">Nutrition</p>
          <small className="">Pre serving</small>
          <ul className="list-group mb-4">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Calories
              <span className="badge bg-primary rounded-pill">
                {recipe.nutrition.calories}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Protein
              <span className="badge bg-success rounded-pill">{`${recipe.nutrition.protein} g`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Carbs
              <span className="badge bg-secondary rounded-pill">{`${recipe.nutrition.carbs} g`}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Fats
              <span className="badge bg-info rounded-pill">{`${recipe.nutrition.fat} g`}</span>
            </li>
          </ul>
          <p className="fs-6 mb-1">Info</p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{`Prep time: ${recipe.prepTime}`}</li>
            <li className="list-group-item">{`Cook time: ${recipe.cookTime}`}</li>
            <li className="list-group-item">{`Servings: ${recipe.cookTime}`}</li>
          </ul>
        </Col>
      </Row>
      <Row className="mb-3">
        {user && (
          <Col>
            {user && isFav ? (
              <Button onClick={addToUserFav} disabled>
                Remove fav
              </Button>
            ) : (
              <Button onClick={addToUserFav}>Add to fav</Button>
            )}
          </Col>
        )}
      </Row>
      {!user && (
        <Row>
          <Col>
            <Button onClick={() => navigate("/login")}>Login to fav</Button>
          </Col>
        </Row>
      )}
      <Row className="mb-3">
        <Col>
          <h2 className="fs-4 border-bottom lh-lg mb-3">Ingredients</h2>
          <p className="white-space-pre">{recipe.ingredient}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="fs-4 border-bottom lh-lg mb-3">Directions</h2>
          <p className="white-space-pre">{recipe.direction}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeDetails;
