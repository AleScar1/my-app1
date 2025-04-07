import React from 'react';
import { Container, Alert } from 'react-bootstrap';

export default function Welcome() {
  return (
    <Container className="mt-4">
      <h1>Benvenuto nella nostra libreria digitale</h1>
      <Alert>
        Alla ricerca della tua prossima lettura!
      </Alert>
    </Container>
  );
}
