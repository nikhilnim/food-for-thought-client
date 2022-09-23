import { useEffect } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

function RecipePage() {
  const params = useParams()



  useEffect(()=>{

  },[params])
  return (
    <Container>
      <Row>
        <Col>
          <h1></h1>
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

export default RecipePage;
