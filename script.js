const reviewForm = document.getElementById('submit-form');
const reviewList = document.getElementById('review-list');

// Load existing reviews from localStorage (if available)
let storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Loop through stored reviews and add them to the list
storedReviews.forEach(review => {
  const newReview = document.createElement('li');
  newReview.innerHTML = `<h3>${review.title} - ${review.rating} stars</h3><p>By ${review.name ? review.name : "Anonymous"}: ${review.reviewText}</p>`;
  reviewList.appendChild(newReview);
});

reviewForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const rating = document.getElementById('rating').value;
  const reviewText = document.getElementById('review').value;

  // Create a new review object
  const newReview = {
      title: title,
      rating: rating,
      reviewText: reviewText,
      name: name,
  };

  // Add the new review to the stored reviews array
  storedReviews.push(newReview);

  // Update localStorage with the latest reviews
  localStorage.setItem('reviews', JSON.stringify(storedReviews));

  // Create a new list item for the review
  const listItem = document.createElement('li');
  listItem.innerHTML = `<h3>${title} - ${rating} stars</h3><p>By ${name ? name : "Anonymous"}: ${reviewText}</p>`;

  // Add the new review to the list
  reviewList.appendChild(listItem);

  // Clear the form after submission
  reviewForm.reset();
});
