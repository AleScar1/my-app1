import React from 'react';

function CommentList({ comments }) {
  return (
    <div>
      <h3>Recensioni:</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <strong>{comment.author}</strong> ({comment.rating}/5): {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentList;

