import React, { useContext } from "react";  
import { Card, Button } from "react-bootstrap";
import { ThemeContext } from "../App";
import { Link } from "react-router-dom";

const SingleBook = ({ book, selected, onBookSelect }) => {
  const { theme } = useContext(ThemeContext);

  return (
      <Card
        className={`mb-3 ${selected ? "border border-danger" : ""}`}
        onClick={() => onBookSelect(book.asin)}
        style={{ cursor: "pointer" }}
        bg={theme === "dark" ? "dark" : "light"}
        text={theme === "dark" ? "light" : "dark"}
        data-testid="single-book"
      >
      <Card.Img variant="top" src={book.img} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>Price: {book.price}</Card.Text>
        <Link to={`/book/${book.asin}`}>
          <Button variant="outline-info">Dettagli</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;

