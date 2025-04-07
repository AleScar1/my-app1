import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AUTH_TOKEN } from './token';

const AddComment = ({ book, handleAddComment }) => {
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment,
      rate: rate.toString(),
      elementId: book.asin,
    };

    try {
      const response = await fetch('https://striveschool-api.herokuapp.com/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        setComment('');
        setRate(1);
        if (handleAddComment) {
          handleAddComment();
        }
      } else {
        throw new Error('Errore durante l\'invio del commento');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Aggiungi un commento:</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Scrivi un commento..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione:</Form.Label>
          <Form.Select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Aggiungi
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
