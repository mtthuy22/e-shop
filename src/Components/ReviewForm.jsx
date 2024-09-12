import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";

const ReviewForm = ({onFormSubmit, cancelReview}) => {
  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  let renderedStars = [...Array(totalStars)].map((star, index) => {
    const currentRating = index + 1;
    return (
      <label key={index}>
        <input
          type="radio"
          name="rating"
          value={currentRating}
          className="star_input"
          onChange={() => setUserRating(currentRating)}
        />
        <span
          className="star"
          style={{
            color:
              currentRating <= (hover || userRating) ? "#ffc107" : "#e4e5e9",
          }}
          onMouseEnter={() => setHover(currentRating)}
          onMouseLeave={() => setHover(null)}
        >
          &#9733;
        </span>
      </label>
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toISOString();

    const submittedReview = {
      rating: userRating,
      comment: userReview,
      reviewerName: reviewerName,
      date: date,
    };
    onFormSubmit(submittedReview);

    setUserRating(null);
    setUserReview("");
    setReviewerName("");
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <div>{renderedStars}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={userReview}
          onChange={(e) => setUserReview(e.target.value)}
        />
      </Form.Group>
      <div className="text-end">
        <Button
          variant="secondary"
          type="button"
          className="me-2"
          onClick={cancelReview}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default ReviewForm;
