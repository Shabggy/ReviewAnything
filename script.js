const reviewForm = document.getElementById('submit-form');
const reviewList = document.getElementById('review-list');
const resetForm = document.getElementById('reset-form');
const passwordInput = document.getElementById('password');

// Function to handle potential errors during local storage access
function getReviewsFromStorage() {
  try {
    // Attempt to parse JSON data from local storage
    const reviewsJson = localStorage.getItem('reviews');
    return JSON.parse(reviewsJson) || [];
  } catch (error) {
    console.error("Error loading reviews from local storage:", error);
    return []; // Return empty array if parsing fails
  }
}

// Load existing reviews from localStorage
let storedReviews = getReviewsFromStorage();

// Function to display a review with its replies
function displayReview(review) {
  const newReview = document.createElement('li');
  newReview.innerHTML = `<h3>${review.title} - ${review.rating} stars</h3><p>By ${review.name ? review.name : "Anonymous"}: ${review.reviewText}</p>`;

  // Reply section for the review
  const replySection = document.createElement('div');
  replySection.classList.add('reply-section');

  // Display existing replies for this review
  review.replies.forEach(reply => {
    const replyElement = document.createElement('p');
    replyElement.textContent = `- ${reply.name ? reply.name : "Anonymous"}: ${reply.replyText}`;
    replySection.appendChild(replyElement);
  });

  // Reply form for this review
  const replyForm = document.createElement('form');
  replyForm.classList.add('reply-form');
  replyForm.innerHTML = `
    <label for="reply-text">Leave a Reply:</label>
    <textarea id="reply-text" name="reply-text" placeholder="Write your reply..."></textarea>
    <button type="submit">Submit Reply</button>
  `;

  replyForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const replyText = document.getElementById('reply-text').value;

    // Add the new reply to the review object
    review.replies.push({
      name: "", // Assuming anonymous replies for now
      replyText: replyText
    });

    // Update localStorage with the latest reviews and replies
    try {
      localStorage.setItem('reviews', JSON.stringify(storedReviews));
    } catch (error) {
      console.error("Error saving reviews to local storage:", error);
    }

    // Update the reply section with the new reply
    const replyElement = document.createElement('p');
    replyElement.textContent = `- Anonymous: ${replyText}`;
    replySection.appendChild(replyElement);

    // Clear the reply form
    replyForm.reset();
  });

  replySection.appendChild(replyForm);
  newReview.appendChild(replySection);
  reviewList.appendChild(newReview);
}

// Loop through stored reviews and add them to the list with replies
storedReviews.forEach(review => {
  displayReview(review);
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
    replies: [] // Array to store replies for this review
  };

  // Add the new review to the stored reviews array
  storedReviews.push(newReview);

  // Update localStorage with the latest reviews
  try {
    localStorage.setItem('reviews', JSON.stringify(storedReviews));
  } catch (error) {
    console.error("Error saving reviews to local storage:", error);
  }

  // Create a new list item for the review
  displayReview(newReview);

  // Clear the form after submission
  reviewForm.reset();
});

resetForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const password = passwordInput.value;

  if (password === "helpinoob") {
    // Reset local storage
    try {
      localStorage.removeItem('reviews');
      storedReviews = []; // Clear storedReviews array as well
    } catch (error) {
      console.error("Error removing reviews from local storage:", error);
    }

    // Clear the review list
    reviewList.innerHTML = "";
  } else {
    alert("Incorrect Password!");
  }

  passwordInput.value = ""; // Clear the password field after submission
});
