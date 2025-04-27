let currentSlide = 0;

function goToSlide(index) {
  const slider = document.getElementById('cubeSlider');
  const wrapper = document.querySelector('.slider-wrapper');
  const totalSlides = slider.children.length;

  // Circular logic for slide navigation
  if (index < 0) {
    currentSlide = totalSlides - 1; 
  } else if (index >= totalSlides) {
    currentSlide = 0; 
  } else {
    currentSlide = index;
  }

  const slideWidth = wrapper.offsetWidth;
  slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Arrow button click listeners
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

leftArrow.addEventListener('click', () => goToSlide(currentSlide - 1));
rightArrow.addEventListener('click', () => goToSlide(currentSlide + 1));

// Keyboard arrow key listeners
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    goToSlide(currentSlide - 1);
  } else if (e.key === 'ArrowRight') {
    goToSlide(currentSlide + 1);
  }
});


//Recalculate on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    goToSlide(currentSlide);
  }, 150);
});

//Swipe gestures for mobile
let startX = 0;
const wrapper = document.querySelector('.slider-wrapper');

wrapper.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].clientX;
});

wrapper.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) goToSlide(currentSlide + 1);
  else if (startX < endX - 50) goToSlide(currentSlide - 1);
});
