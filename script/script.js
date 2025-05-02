document.addEventListener('DOMContentLoaded', () => {
  let currentSlide = 0;

  const slider = document.getElementById('cubeSlider');
  const wrapper = document.querySelector('.slider-wrapper');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');
  const totalSlides = slider.children.length;
  const SWIPE_THRESHOLD = 50;
  let resizeFrame;
  let startX = 0;

  const navButtons = document.querySelectorAll('.navbar li button');

  const updateActiveState = () => {
    navButtons.forEach((button, index) => {
      if (index === currentSlide) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  };

  const goToSlide = (index) => {
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    const slideWidth = wrapper.offsetWidth;
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateActiveState();
  };

  const navigateWithArrows = (direction) => {
    goToSlide(currentSlide + direction);
  };

  leftArrow.addEventListener('click', () => navigateWithArrows(-1));
  rightArrow.addEventListener('click', () => navigateWithArrows(1));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigateWithArrows(-1);
    } else if (e.key === 'ArrowRight') {
      navigateWithArrows(1);
    }
  });

  window.addEventListener('resize', () => {
    if (resizeFrame) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      goToSlide(currentSlide);
    });
  });

  wrapper.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].clientX;
  });

  wrapper.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const swipeDistance = endX - startX;

    if (swipeDistance > SWIPE_THRESHOLD) {
      navigateWithArrows(-1);
    } else if (swipeDistance < -SWIPE_THRESHOLD) {
      navigateWithArrows(1);
    }
  });

  navButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  goToSlide(0);

  // === Modal popup logic ===
  const modal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeBtn = document.querySelector('.close-btn');

  const showModal = (title, description) => {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.remove('hidden');
  };

  const closeModal = () => {
    modal.classList.add('hidden');
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Certification modal trigger
  document.querySelectorAll('.certification-card').forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.querySelector('strong')?.textContent || 'Certification';
      const desc = item.querySelector('em')?.textContent || 'No additional info.';
      showModal(title, desc);
    });
  });

  // Project modal trigger
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent || 'Project';
      const desc = card.getAttribute('data-description') || 'No description available.';
      showModal(title, desc);
    });
  });
});
