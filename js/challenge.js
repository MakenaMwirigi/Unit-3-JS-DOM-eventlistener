// Get references to DOM elements
const counter = document.getElementById("counter");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const heartBtn = document.getElementById("heart");
const pauseBtn = document.getElementById("pause");
const commentForm = document.getElementById("comment-form");
const commentInput = document.getElementById("comment-input");
const commentList = document.getElementById("list");
const likesUl = document.querySelector(".likes");

// Counter value
let count = parseInt(counter.innerText);

// Likes tracker
const likes = {};

// Start the timer
let intervalId = startCounter();

function startCounter() {
  return setInterval(() => {
    counter.innerText = ++count;
  }, 1000);
}

// Plus button functionality
plusBtn.addEventListener("click", () => {
  counter.innerText = ++count;
});

// Minus button functionality
minusBtn.addEventListener("click", () => {
  counter.innerText = --count;
});

// Like button functionality
heartBtn.addEventListener("click", () => {
  const number = counter.innerText;
  likes[number] = (likes[number] || 0) + 1;

  const existingLi = document.getElementById(`like-${number}`);
  if (existingLi) {
    existingLi.innerText = `${number} has been liked ${likes[number]} time${likes[number] > 1 ? 's' : ''}`;
  } else {
    const li = document.createElement("li");
    li.id = `like-${number}`;
    li.innerText = `${number} has been liked 1 time`;
    likesUl.appendChild(li);
  }
});

// Pause/Resume functionality
pauseBtn.addEventListener("click", () => {
  if (pauseBtn.innerText === "pause") {
    clearInterval(intervalId);
    pauseBtn.innerText = "resume";
    toggleButtons(true);
  } else {
    intervalId = startCounter();
    pauseBtn.innerText = "pause";
    toggleButtons(false);
  }
});

function toggleButtons(disabled) {
  plusBtn.disabled = disabled;
  minusBtn.disabled = disabled;
  heartBtn.disabled = disabled;
  document.getElementById("submit").disabled = disabled;
}

// Comment form functionality
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const p = document.createElement("p");
  p.innerText = commentInput.value;
  commentList.appendChild(p);
  commentInput.value = "";
});
