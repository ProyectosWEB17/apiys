let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

// Crear dots para cada imagen
images.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => showImage(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dots span');

function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    images[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// Eventos de los botones
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Carrusel automático
let autoSlide = setInterval(nextImage, 3000);

// Pausar el carrusel al pasar el mouse
document.querySelector('.carousel').addEventListener('mouseover', () => clearInterval(autoSlide));
document.querySelector('.carousel').addEventListener('mouseleave', () => autoSlide = setInterval(nextImage, 3000));

// Inicializar el carrusel
showImage(0);

// Animación al hacer scroll
const sections = document.querySelectorAll('.slide-in-left, .slide-in-right');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});

// Modal de Producto
const productModal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeProductBtn = document.querySelector('.product-close-btn');

// Mostrar modal al hacer clic en un producto
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        modalImage.src = card.getAttribute('data-image');
        modalTitle.textContent = card.getAttribute('data-title');
        modalDescription.textContent = card.getAttribute('data-description');
        productModal.classList.remove('hidden');
    });
});

// Cerrar modal al hacer clic en el botón de cerrar o fuera del modal
closeProductBtn.addEventListener('click', () => productModal.classList.add('hidden'));
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.add('hidden');
    }
});

// Modal de Últimos Trabajos
const trabajosBtn = document.getElementById('trabajos-btn');
const trabajosModal = document.getElementById('trabajos-modal');
const closeTrabajosBtn = trabajosModal.querySelector('.trabajos-close-btn');

// Mostrar modal al hacer clic en "Últimos Trabajos"
trabajosBtn.addEventListener('click', (e) => {
    e.preventDefault();
    trabajosModal.classList.remove('hidden');
});

// Cerrar modal al hacer clic en el botón de cerrar o fuera del modal
closeTrabajosBtn.addEventListener('click', () => trabajosModal.classList.add('hidden'));
trabajosModal.addEventListener('click', (e) => {
    if (e.target === trabajosModal) {
        trabajosModal.classList.add('hidden');
    }
});
