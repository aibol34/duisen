// 🎵 Музыка
const audio = document.getElementById('bg-audio');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');

playBtn.addEventListener('click', () => {
  audio.play();
  playBtn.hidden = true;
  stopBtn.hidden = false;
});

stopBtn.addEventListener('click', () => {
  audio.pause();
  playBtn.hidden = false;
  stopBtn.hidden = true;
});

audio.addEventListener('ended', () => {
  playBtn.hidden = false;
  stopBtn.hidden = true;
});

// ⏳ Таймер до 5 июля 2025
const d = document.getElementById('days');
const h = document.getElementById('hours');
const m = document.getElementById('minutes');
const s = document.getElementById('seconds');

function updateCountdown() {
  const target = new Date("2025-09-20T19:00:00+05:00");
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    d.textContent = h.textContent = m.textContent = s.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  d.textContent = String(days).padStart(2, '0');
  h.textContent = String(hours).padStart(2, '0');
  m.textContent = String(minutes).padStart(2, '0');
  s.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ✨ Анимации появления при скролле
const animatedItems = document.querySelectorAll('section, .hero-content, .divider-wrapper, .names');

const animateOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;

  animatedItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerBottom) {
      item.classList.add('show');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Авто-слайдер по 1 изображению каждые 2 секунды
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider img');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

// Показ нужного слайда
function showSlide(index) {
  slider.style.transform = `translateX(-${index * 300}px)`;
}

// Автопрокрутка
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

let autoSlide = setInterval(nextSlide, 2000);

// Свайп: начало
slider.addEventListener('touchstart', (e) => {
  clearInterval(autoSlide);
  startX = e.touches[0].clientX;
  isDragging = true;
});

// Свайп: движение
slider.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const diff = startX - currentX;

  // свайп влево
  if (diff > 50) {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
    isDragging = false;
  }
  // свайп вправо
  else if (diff < -50) {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
    isDragging = false;
  }
});

// Свайп: конец
slider.addEventListener('touchend', () => {
  isDragging = false;
  autoSlide = setInterval(nextSlide, 2000);
});
