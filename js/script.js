const images = [
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
  if (!carousel) return;

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

if (carousel) {
  buildCarousel();
  window.addEventListener("resize", buildCarousel);
}

// MODAL
let currentIndex = 0;

const modalElement = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');

let modal = null;
if (modalElement && modalImg) {
  modal = new bootstrap.Modal(modalElement);

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("carousel-img")) {
      const src = e.target.src;
      currentIndex = images.findIndex(img => src.includes(img));
      modalImg.src = src;
      modal.show();
    }
  });

  document.addEventListener("keydown", function(e) {
    if (!modalElement.classList.contains("show")) return;
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
}

function nextImage() {
  if (!modalImg) return;
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = "images/" + images[currentIndex];
}

function prevImage() {
  if (!modalImg) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImg.src = "images/" + images[currentIndex];
}

// HORARIO
const dias = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
const hoy = dias[new Date().getDay()];

const diasFooter = document.querySelectorAll(".footer-hours li strong");

if (diasFooter.length) {
  diasFooter.forEach(el => {
    if (el.textContent.trim() === hoy) {
      el.parentElement.classList.add("today");
    }
  });
}


let initialHeight = window.innerHeight;

window.addEventListener("resize", () => {
  if (window.innerHeight < initialHeight - 100) {
    document.body.classList.add("keyboard-open");
  } else {
    document.body.classList.remove("keyboard-open");
  }
});

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTDS4PeimU8J66G_pFg9vnQqgFxWSr-KXoAh8i_tg9FM460VbyDGYCVHOs-FmQZzKBiVDE9WAfZ8JYw/pub?gid=0&single=true&output=csv";

async function cargarServicios() {
  const res = await fetch(url + "&t=" + Date.now());
  const text = await res.text();

  const rows = text.split("\n");
  rows.shift(); // quitar cabecera

  const fragManicura = document.createDocumentFragment();
  const fragPedicura = document.createDocumentFragment();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;

    const cols = row.split(","); // MUCHO más rápido que regex

    if (cols.length < 3) continue;

    const nombre = cols[0]?.replace(/"/g, "");
    const descripcion = cols[1]?.replace(/"/g, "");
    const tipo = cols[2]?.toLowerCase();
    const precio = +cols[3] || 0;
    const descuento = +(cols[4]?.replace("%", "")) || 0;

    if (!nombre || !tipo) continue;

    let precioFinal = +cols[5];
    if (!precioFinal) {
      precioFinal = precio - (precio * descuento / 100);
    }

    const div = document.createElement("div");
    div.className = "service-card";

    div.innerHTML = `
      ${descuento > 0 ? `<div class="badge-descuento">-${descuento}%</div>` : ""}
      <div>
        <h3>${nombre}</h3>
        <p>${descripcion}</p>
      </div>
      <div class="service-price">
        ${descuento > 0 ? `<span class="old-price">${precio}€</span>` : ""}
        ${precioFinal}€
      </div>
    `;

    if (tipo.includes("manicura")) {
      fragManicura.appendChild(div);
    } else {
      fragPedicura.appendChild(div);
    }
  }

  const manicuraEl = document.getElementById("manicura-list");
  const pedicuraEl = document.getElementById("pedicura-list");

  manicuraEl.innerHTML = "";
  pedicuraEl.innerHTML = "";

  manicuraEl.appendChild(fragManicura);
  pedicuraEl.appendChild(fragPedicura);
}

document.addEventListener("DOMContentLoaded", cargarServicios);