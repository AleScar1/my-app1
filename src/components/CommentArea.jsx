import React, { useState, useEffect } from 'react';
import { ListGroup, Spinner, Alert, Button, Form, Modal } from 'react-bootstrap';
import AddComment from './AddComment';
import { AUTH_TOKEN } from './token';

const CommentArea = ({ asin, enableActions = false, showSpinner = false, showError = false }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const fetchComments = async () => {
    if (!asin) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (!response.ok) throw new Error('Errore nel caricamento dei commenti');
      const data = await response.json();
      setComments(data);
    } catch (err) {
      if (showError) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async () => {
    if (!commentToDelete) return;
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      if (response.ok) {
        setShowModal(false);
        setCommentToDelete(null);
        fetchComments();
      } else {
        throw new Error('Errore durante la cancellazione del commento');
      }
    } catch (err) {
      if (showError) setError(err.message);
    }
  };

  const updateComment = async (commentId) => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        body: JSON.stringify({ comment: editedText }),
      });
      if (response.ok) {
        setEditingComment(null);
        fetchComments();
      } else {
        throw new Error("Errore durante l'aggiornamento del commento");
      }
    } catch (err) {
      if (showError) setError(err.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [asin]);

  return (
    <div>
      <h3>Recensioni:</h3>
      {showSpinner && loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}
      {showError && error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {comments.map((c) => (
          <ListGroup.Item key={c._id}>
            {editingComment === c._id ? (
              <>
                <Form.Control
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <Button
                  variant="success"
                  size="sm"
                  className="me-2 mt-2"
                  onClick={() => updateComment(c._id)}
                >
                  Salva
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={() => setEditingComment(null)}
                >
                  Annulla
                </Button>
              </>
            ) : (
              <>
                {c.comment} - <strong>{c.rate}⭐</strong>
                {enableActions && (
                  <div className="mt-2">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setCommentToDelete(c._id);
                        setShowModal(true);
                      }}
                    >
                      Elimina
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => {
                        setEditingComment(c._id);
                        setEditedText(c.comment);
                      }}
                    >
                      Modifica
                    </Button>
                  </div>
                )}
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <AddComment book={{ asin }} handleAddComment={fetchComments} />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare questo commento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={deleteComment}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CommentArea;
