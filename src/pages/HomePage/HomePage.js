import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";

function HomePage() {
  const [recipeList, setRecipeList] = useState(null);
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const { REACT_APP_API_SERVER_URL } = process.env;

  useEffect(() => {
    getRecipeList();
  }, []);

  useEffect(() => {
    if (protein.length > 0 || calories.length>0) {
      pathBuilder()
    }else{
      getRecipeList();
    }
    
  }, [protein,calories]);

  function setPathVariables(e) {
    let {value,name} = e.target;
    if(value==="" && name==="protein"){
      setProtein("")
    }
    else if(value==="" && name==="calories"){
      setCalories("")
    }else if(name==="protein"){
      let path = `${name}/${value}`;
      setProtein(path)
    }else{
      let path = `${name}/${value}`;
      setCalories(path)
    }
  }

  function pathBuilder() {
    let path = `${protein}/${calories}`
    console.log(path)
    return path
  }

  async function TODO() {
    const { data } = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes`);
  }

  async function getRecipeList() {
    console.log("called")
    const { data } = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes`);
    setRecipeList(data);
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-sm-3">
          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            onChange={setPathVariables} name="protein"
          >
            <option value="">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select
            class="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            onChange={setPathVariables} name="calories"
          >
            <option value="">Any</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </Col>
      </Row>
      <Row className="justify-content-stretch">
        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column px-2"
        >
          {recipeList &&
            recipeList.map((e) => {
              return (
                <>
                  <Card className="mb-3">
                    <Card.Img
                      variant="top"
                      src={`${REACT_APP_API_SERVER_URL}/images/${e.image}`}
                    />
                    <Card.Body>
                      <Card.Title>{e.title}</Card.Title>
                      <Card.Text>{`${e.intro}`}</Card.Text>
                      <Button variant="primary">View Details</Button>
                    </Card.Body>
                  </Card>
                </>
              );
            })}
        </Masonry>
      </Row>
    </Container>
  );
}

export default HomePage;
