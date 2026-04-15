const images = [
  // UÑAS
  "unas-acrilicas-diseno-rosa-brenes.jpg",
  "unas-acrilicas-elegantes-brenes.jpg",
  "unas-nail-art-brillo-brenes.jpg",
  "unas-acrilicas-color-nude-brenes.jpg",
  "unas-semi-permanente-brillo-brenes.jpg",
  "unas-acrilicas-rojas-brenes.jpg",
  "unas-diseno-frances-brenes.jpg",
  "unas-nail-art-degradado-brenes.jpg",
  "unas-acrilicas-negras-brenes.jpg",
  "unas-brillo-glitter-brenes.jpg",
  "unas-diseno-verano-brenes.jpg",
  "unas-acrilicas-largas-brenes.jpg",
  "unas-elegantes-blancas-brenes.jpg",
  "unas-nail-art-dibujo-brenes.jpg",
  "unas-acrilicas-modernas-brenes.jpg",

  // LOCAL
  "salon-unas-brenes-interior.jpg",
  "centro-estetica-brenes.jpg",
  "mesa-trabajo-unas-brenes.jpg",
  "cabina-unas-brenes.jpg",
];

const carousel = document.getElementById("carousel-inner");

function getItemsPerSlide() {
  return window.innerWidth < 768 ? 2 : 4;
}

function buildCarousel() {
  carousel.innerHTML = "";

  const itemsPerSlide = getItemsPerSlide();

  for (let i = 0; i < images.length; i += itemsPerSlide) {

    const div = document.createElement("div");
    div.className = "carousel-item" + (i === 0 ? " active" : "");

    const row = document.createElement("div");
    row.className = "row";

    images.slice(i, i + itemsPerSlide).forEach(img => {

      const col = document.createElement("div");
      col.className = "col-6 col-md-3 mb-3";

      const image = document.createElement("img");
      image.src = "images/" + img;
      image.className = "carousel-img";
      image.alt = img.replace(/-/g, " ").replace(".jpg", "");

      col.appendChild(image);
      row.appendChild(col);
    });

    div.appendChild(row);
    carousel.appendChild(div);
  }
}

buildCarousel();
window.addEventListener("resize", buildCarousel);

let currentIndex = 0;

const modal = new bootstrap.Modal(document.getElementById('imageModal'));
const modalImg = document.getElementById('modalImage');

// CLICK EN IMAGEN
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("carousel-img")) {
    const src = e.target.src;

    currentIndex = images.findIndex(img => src.includes(img));

    modalImg.src = src;
    modal.show();
  }
});

// SIGUIENTE
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = "images/" + images[currentIndex];
}

// ANTERIOR
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImg.src = "images/" + images[currentIndex];
}

// TECLADO (PC)
document.addEventListener("keydown", function(e) {
  if (!document.getElementById('imageModal').classList.contains("show")) return;

  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});

let startX = 0;

modalImg.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

modalImg.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) nextImage();
  if (endX - startX > 50) prevImage();
});

const cards = document.querySelectorAll(".service-card");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.9;

  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;

    if (top < trigger) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

function openCalendarModal() {
  document.getElementById("calendarModal").style.display = "flex";
}

function closeCalendarModal() {
  document.getElementById("calendarModal").style.display = "none";
}

const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const hoy = dias[new Date().getDay()];

document.querySelectorAll(".footer-hours li strong").forEach(el => {
    if (el.textContent === hoy) {
        el.parentElement.classList.add("today");
    }
});
