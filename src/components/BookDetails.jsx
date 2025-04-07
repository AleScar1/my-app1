import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CommentArea from './CommentArea';
import fantasy from '../books/fantasy.json';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const BookDetails = () => {
  const params = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const foundBook = fantasy.find((b) => b.asin === params.asin);
    if (foundBook) {
      setBook(foundBook);
    } else {
      setError('Libro non trovato.');
    }
    setLoading(false);
  }, [params.asin]);

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Card>
              <Card.Img variant="top" src={book.img} />
              <Card.Body>
                <Card.Title style={{ color: 'black' }}>{book.title}</Card.Title>
              </Card.Body>
            </Card>
            <CommentArea
              asin={params.asin}
              enableActions={true}
              showSpinner={true}
              showError={true}
            />
          </>
        )}
      </Col>
    </Row>
  );
};

export default BookDetails;
