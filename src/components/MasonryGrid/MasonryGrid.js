import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Masonry from "react-masonry-css";
import './MasonryGrid.scss'
const { REACT_APP_API_SERVER_URL } = process.env;
function MasonryGrid({recipeList}) {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {recipeList.map((e) => {
        return (
          <Card key={`${e.id}`}>
            <Card.Img
              variant="top"
              src={`${REACT_APP_API_SERVER_URL}/images/${e.image}`}
            />
            <Card.Body>
              <Card.Title>{e.title}</Card.Title>
              <Card.Text>{`${e.intro}`}</Card.Text>
              <Button as={Link} to={`${e.id}`} variant="primary">
                View Details
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </Masonry>
  );
}

export default MasonryGrid;
