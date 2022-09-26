import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import useGetRecipe from "../../hooks/useGetRecipe";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
function RecipePage() {
  const params = useParams();
  const recipe = useGetRecipe(params.id);
  const [user, setUser] = useContext(UserContext);
  console.log(user);

  function handleClick() {
    setUser({
      firstName: "Bob",
      lastName: "Bobberson",
      suffix: 1,
      email: "jamesjameson@example.com",
    });
  }

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
      <>
       {user && <Button onClick={handleClick}>Bookmark</Button>}
        <RecipeDetails recipe={recipe}></RecipeDetails>
      </>
    );
  }
}
export default RecipePage;
