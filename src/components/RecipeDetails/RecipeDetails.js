import { Container, Row, Col, Image } from "react-bootstrap";
import './RecipeDetails.scss'
const { REACT_APP_API_SERVER_URL } = process.env;
function RecipeDetails({ recipe }) {
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
          <p class="fs-5 fw-bold mb-0">Nutrition</p>
          <small className="">Pre serving</small>
          <ul class="list-group mb-4">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Calories
              <span class="badge bg-primary rounded-pill">
                {recipe.nutrition.calories}
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Protein
              <span class="badge bg-success rounded-pill">{`${recipe.nutrition.protein} g`}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Carbs
              <span class="badge bg-secondary rounded-pill">{`${recipe.nutrition.carbs} g`}</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              Fats
              <span class="badge bg-info rounded-pill">{`${recipe.nutrition.fat} g`}</span>
            </li>
          </ul>
          <p class="fs-6 mb-1">Info</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{`Prep time: ${recipe.prepTime}`}</li>
            <li class="list-group-item">{`Cook time: ${recipe.cookTime}`}</li>
            <li class="list-group-item">{`Servings: ${recipe.cookTime}`}</li>
          </ul>
        </Col>
      </Row>
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
