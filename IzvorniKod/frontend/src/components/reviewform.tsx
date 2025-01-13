import React, { useState } from 'react';
import '../components/reviewform.css';

interface ReviewFormProps {
    eventId: string;
    routeId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ eventId, routeId }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        console.log("routeId: " + routeId, "review: " + review, "rating: " + rating);
        e.preventDefault();
        try {
            const response = await fetch(`/api/route/review/${routeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review, rating }),
            });
            if (response.ok) {
                alert('Review submitted successfully!');
                setReview('');
                setRating(5);
            } else {
                alert('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className='container-review'>
        <form onSubmit={handleReviewSubmit}>
            <h3>Submit a Review</h3>
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here"
                required

            />
            <div>
                <label>Rating: </label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <option key={star} value={star}>
                            {star} {star === 1 ? 'Star' : 'Stars'}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit Review</button>
        </form>
        </div>
    );
};

export default ReviewForm;