// Inizializza GSAP e gestisce la transizione tra video
const videos = document.querySelectorAll('.slide video');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let isAnimating = false;

// Funzione per iniziare la transizione tra video
function playVideo(index) {
  if (isAnimating || index === currentIndex) return;
  
  isAnimating = true;

  // Il video corrente deve essere messo in pausa e nascosto
  const currentSlide = slides[currentIndex];
  const nextSlide = slides[index];
  
  // Pausa e nascondi il video corrente
  currentSlide.querySelector('video').pause();
  gsap.to(currentSlide, { opacity: 0, zIndex: 1, duration: 0.6 });

  // Mostra e riproduci il video successivo
  const nextVideo = nextSlide.querySelector('video');
  nextVideo.currentTime = 0;
  nextVideo.play();
  
  gsap.to(nextSlide, { opacity: 1, zIndex: 2, duration: 0.6, onComplete: () => {
    isAnimating = false;
    currentIndex = index;
  }});
}

// Gestisci lo scroll per cambiare video
window.addEventListener('scroll', () => {
  const newIndex = (window.scrollY > window.innerHeight / 2) ? 1 : 0;
  playVideo(newIndex);
});
