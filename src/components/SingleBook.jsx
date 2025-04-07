import React, { useContext } from "react";  
import { Card, Button } from "react-bootstrap";
import { ThemeContext } from "../App";
import { Link } from "react-router-dom";
import '../App.css';


const SingleBook = ({ book, selected, onBookSelect }) => {
  const { theme } = useContext(ThemeContext);

  return (
      <Card
        className={`mt-4 mb-4 book-card ${selected ? "border border-danger selected-book" : "" }`}
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

