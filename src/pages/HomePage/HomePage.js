import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import Select from "react-select";
import useGetRecipeListByPath from "../../hooks/useGetRecipeListByPath";
import Spinner from 'react-bootstrap/Spinner';
import MasonryGrid from "../../components/MasonryGrid/MasonryGrid";



function HomePage() {
  const { REACT_APP_API_SERVER_URL } = process.env;
  const [recipeList, setPath] = useGetRecipeListByPath(`${REACT_APP_API_SERVER_URL}/recipes`);
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  

  useEffect(() => {
    function pathBuilder() {
      let path = `${protein}/${calories}`;
      if (path.charAt(0) === "/") {
        path = path.slice(1);
      }
      console.log(path);
      return path;
    }
    if (protein.length > 0 || calories.length > 0) {
      let path = pathBuilder();
      setPath(`${REACT_APP_API_SERVER_URL}/recipes/${path}`);
    } else {
      setPath(`${REACT_APP_API_SERVER_URL}/recipes`);
    }
  }, [protein, calories,REACT_APP_API_SERVER_URL,setPath]);

 

  const proteinSelect = [
    { value: "10", label: "Protein over 10gm" },
    { value: "20", label: "Protein over 20gm" },
    { value: "30", label: "Protein over 30gm" },
  ];
  const caloriesSelect = [
    { value: "200", label: "Calories under 200" },
    { value: "300", label: "Calories under 300" },
    { value: "400", label: "Calories under 400" },
  ];

  function handleProteinSelect(option) {
    if (option === null) {
      setProtein("");
    } else {
      let path = `protein/${option.value}`;
      setProtein(path);
    }
  }

  function handleCaloriesSelect(option) {
    if (option === null) {
      setCalories("");
    } else {
      let path = `calories/${option.value}`;
      setCalories(path);
    }
  }
 
  if (!recipeList) {
    return (
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    );
  } else {
    return (
      <Container>
        <Row>
          <Col>
            
          </Col>
        </Row>
        <Row className="justify-content-center my-5">
          <Col sm={3}>
            <Select
              options={proteinSelect}
              onChange={handleProteinSelect}
              defaultValue=""
              isClearable="true"
              placeholder="Protein"
            />
          </Col>
          <Col sm={3}>
            <Select
                options={caloriesSelect}
                onChange={handleCaloriesSelect}
                defaultValue=""
                isClearable="true"
                placeholder="Calories"
              />
          </Col>
        </Row>
        <MasonryGrid recipeList={recipeList}></MasonryGrid>
       
      </Container>
    );
  }
}

export default HomePage;
