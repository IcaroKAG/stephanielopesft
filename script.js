// Modal open/close
const openModalBtns = document.querySelectorAll('#open-modal-btn, #open-modal-btn-2');
const modal = document.getElementById('contact-modal');
const closeModalBtn = modal.querySelector('.modal-close-btn');
const modalOverlay = modal.querySelector('.modal-overlay');
const contactForm = document.getElementById('contact-form');

function openModal() {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  contactForm.querySelector('input, textarea').focus();
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  openModalBtns[0].focus();
}

openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && modal.classList.contains('active')) {
    closeModal();
  }
});

// 🟢 ENVIO PARA WHATSAPP
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  const whatsapp = contactForm.whatsapp.value.trim();

  if (!name || !email || !message) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const phoneNumber = '5511991311160'; // ← Substitua pelo número do dono do site

  const texto = `Olá! Meu nome é ${name}.
Email: ${email}
WhatsApp: ${whatsapp || 'Não informado'}

Mensagem:
${message}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');

  contactForm.reset();
  closeModal();
});

// Depoimentos Carrossel
const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const indicators = document.querySelectorAll('.testimonials-indicators button');

let currentIndex = 0;
let autoRotateInterval = null;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
    indicators[i].classList.toggle('active', i === index);
    indicators[i].setAttribute('aria-selected', i === index);
  });
  currentIndex = index;
}

function nextTestimonial() {
  let nextIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(nextIndex);
}

function prevTestimonialFunc() {
  let prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex);
}

nextBtn.addEventListener('click', () => {
  nextTestimonial();
  resetAutoRotate();
});
prevBtn.addEventListener('click', () => {
  prevTestimonialFunc();
  resetAutoRotate();
});
indicators.forEach((indicator, i) => {
  indicator.addEventListener('click', () => {
    showTestimonial(i);
    resetAutoRotate();
  });
});

function autoRotate() {
  autoRotateInterval = setInterval(() => {
    nextTestimonial();
  }, 5000);
}

function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotate();
}

// Pausa rotação ao hover
const testimonialsSection = document.getElementById('testimonials');
testimonialsSection.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
testimonialsSection.addEventListener('mouseleave', () => autoRotate());

// Inicializa
showTestimonial(0);
autoRotate();

let currentImageIndex = 0;
const carouselImages = document.querySelectorAll('.carousel-image');

setInterval(() => {
  carouselImages[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
  carouselImages[currentImageIndex].classList.add('active');
}, 5000); // troca a cada 5 segundos

const hamburger = document.getElementById('hamburgerBtn');
const navMenu = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.addEventListener('click', function (e) {
  const isClickInside = hamburger.contains(e.target) || navMenu.contains(e.target);
  if (!isClickInside && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active'); // ⬅ remove animação
  }
})

// Rolagem lateral dos serviços (ativado só em telas <= 750px)
const scrollContainer = document.getElementById('services-scroll');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

function updateScrollButtonsVisibility() {
  const isMobile = window.innerWidth <= 750;
  scrollLeftBtn.style.display = isMobile ? 'block' : 'none';
  scrollRightBtn.style.display = isMobile ? 'block' : 'none';

  if (isMobile) {
    scrollContainer.scrollLeft = 0; // reset scroll ao entrar no modo mobile
  } else {
    scrollContainer.scrollLeft = 0; // evita rolagem indevida em telas grandes
  }
}

scrollLeftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -250, // distância de scroll
    behavior: 'smooth'
  });
});

scrollRightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 250, // distância de scroll
    behavior: 'smooth'
  });
});

window.addEventListener('resize', updateScrollButtonsVisibility);
window.addEventListener('load', updateScrollButtonsVisibility);

const nav = document.getElementById('navMenu');
const toggle = document.getElementById('hamburgerBtn');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.hidden = expanded;
  });

  // Responsividade: garante que no desktop o menu sempre apareça
  const mq = window.matchMedia('(max-width: 750px)');
  const sync = () => {
    nav.hidden = mq.matches;
    toggle.hidden = !mq.matches;
    toggle.setAttribute('aria-expanded', 'false');
  };
  mq.addEventListener?.('change', sync);
  sync();
}


