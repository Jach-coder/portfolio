let currentSlide = 0;

//Function to move to the desired slide
function goToSlide(index) {
  const slider = document.getElementById('cubeSlider');
  const wrapper = document.querySelector('.slider-wrapper');
  const totalSlides = slider.children.length;

  //Adjust slide index for circular navigation
  if (index < 0) {
    currentSlide = totalSlides - 1; 
  } else if (index >= totalSlides) {
    currentSlide = 0; 
  } else {
    currentSlide = index;
  }

  //Update the slider's position based on the new slide index
  const slideWidth = wrapper.offsetWidth;
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

//Function to handle navigation with arrow keys and arrow buttons
function navigateWithArrows(direction) {
  goToSlide(currentSlide + direction);
}

//Arrow button click listeners
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

leftArrow.addEventListener('click', () => navigateWithArrows(-1));
rightArrow.addEventListener('click', () => navigateWithArrows(1));

//Keyboard arrow key listeners
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    navigateWithArrows(-1);
  } else if (e.key === 'ArrowRight') {
    navigateWithArrows(1);
  }
});

//Recalculate on window resize
let resizeFrame;
window.addEventListener('resize', () => {
  if (resizeFrame) {
    cancelAnimationFrame(resizeFrame);
  }
  resizeFrame = requestAnimationFrame(() => {
    goToSlide(currentSlide);
  });
});

// Swipe gestures for mobile
const SWIPE_THRESHOLD = 50; // minimum swipe distance in pixels
let startX = 0;
const wrapper = document.querySelector('.slider-wrapper');

wrapper.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].clientX;
});

wrapper.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const swipeDistance = endX - startX;

  if (swipeDistance > SWIPE_THRESHOLD) {
    goToSlide(currentSlide - 1); // Swipe left
  } else if (swipeDistance < -SWIPE_THRESHOLD) {
    goToSlide(currentSlide + 1); // Swipe right
  }
});
