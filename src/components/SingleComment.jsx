import { Button, ListGroup } from 'react-bootstrap'

const SingleComment = ({ comment, deleteComment }) => {
  return (
    <ListGroup.Item data-testid="single-comment">
      {comment.comment }
      <Button
        variant="danger"
        className="ms-2"
        onClick={() => deleteComment(comment._id)}
      >
        Elimina
      </Button>
    </ListGroup.Item>
  )
}

export default SingleComment;
