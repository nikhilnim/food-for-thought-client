import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import useGetRecipe from "../../hooks/useGetRecipe";

function RecipePage() {
  const params = useParams();
  const recipe = useGetRecipe(params.id);
 
  if (!recipe) {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="3">
            <small>no content found</small>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
        <RecipeDetails recipe={recipe}></RecipeDetails>
    );
  }
}
export default RecipePage;
