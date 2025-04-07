import React from 'react';
import { Container } from 'react-bootstrap';

export default function MyFooterComponent() {
  return (
    <footer className="bg-dark text-white mt-5 py-3">
      <Container className="text-center">
        <p className="mb-0">© {new Date().getFullYear()} MyReactApp. Tutti i diritti riservati.</p>
      </Container>
    </footer>
  );
}
