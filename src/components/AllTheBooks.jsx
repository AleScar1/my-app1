import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SingleBook from './SingleBook';
import CommentArea from './CommentArea';

const AllTheBooks = ({ books, searchQuery, onBookSelect, selectedBookAsin }) => {
  return (
    <div>
      <Row>
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((book) => (
            <Col key={book.asin} md={4}>
              <SingleBook
                key={book.asin}
                book={book}
                selected={selectedBookAsin === book.asin}
                onBookSelect={onBookSelect}
              />
            </Col>
          ))}
      </Row>


    </div>
  );
};

export default AllTheBooks;
