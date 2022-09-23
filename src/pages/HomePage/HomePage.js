import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import Select from 'react-select'
import { Link } from "react-router-dom";
function HomePage() {
  const [recipeList, setRecipeList] = useState(null);
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const { REACT_APP_API_SERVER_URL } = process.env;
  useEffect(() => {
    getRecipeList();
  }, []);

  useEffect(() => {
    if (protein.length > 0 || calories.length > 0) {
     let path = pathBuilder()
     getSortedRecipeList(path)
    }else{
      getRecipeList();
    }
    
  }, [protein,calories]);

  function pathBuilder() {
    let path = `${protein}/${calories}`
    if(path.charAt(0)==="/"){
      path = path.slice(1)
    }
    console.log(path)
    return path
  }

  

  async function getRecipeList() {
    console.log("called")
    const { data } = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes`);
    setRecipeList(data);
  }

  async function getSortedRecipeList(path){
    const { data } = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes/${path}`);
    console.log(data)
    setRecipeList(data);
  }

  const proteinSelect = [
    { value: '10', label: 'Protein over 10gm' },
    { value: '20', label: 'Protein over 20gm' },
    { value: '30', label: 'Protein over 30gm' }
  ]
  const caloriesSelect = [
    { value: '200', label: 'Calories under 200' },
    { value: '300', label: 'Calories under 300' },
    { value: '400', label: 'Calories under 400' }
  ]


  function handleProteinSelect(option){
    if(option===null){
      setProtein("")
    }else{
      let path = `protein/${option.value}`;
      setProtein(path)
    }
  }

  function handleCaloriesSelect(option){
    if(option===null){
      setCalories("")
    }else{
      let path = `calories/${option.value}`;
      setCalories(path)
    }
  }
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="col-sm-3">
          <Select options={proteinSelect} onChange={handleProteinSelect} defaultValue="" isClearable="true" placeholder="Protein"/> 
          <Select options={caloriesSelect} onChange={handleCaloriesSelect} defaultValue="" isClearable="true" placeholder="Calories"/> 
        </Col>
      </Row>
      
        <Masonry
          breakpointCols={breakpointColumnsObj}
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
                      <Button as={Link} to={`${e.id}`} variant="primary">View Details</Button>
                    </Card.Body>
                  </Card>
                </>
              );
            })}
        </Masonry>

    </Container>
  );
}

export default HomePage;
