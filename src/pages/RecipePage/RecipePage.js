import { Col, Container, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useGetRecipe from "../../hooks/useGetRecipe";

function RecipePage() {
  const params = useParams();
  const recipe = useGetRecipe(params.id);

  if (!recipe) {
    return(
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="3">
            <small>no content found</small>
          </Col>
        </Row>
      </Container>)
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h1>{recipe.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Image></Image>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2></h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2></h2>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default RecipePage;
