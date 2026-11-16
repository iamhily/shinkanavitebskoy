const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const photos = [
  { src: 'assets/entrance.jpg', alt: 'Вход в мастерскую «Шинка на Витебской»' },
  { src: 'assets/wheel.jpg', alt: 'Колесо автомобиля' },
  { src: 'assets/inside-thumb.jpg', alt: 'Оборудование внутри мастерской' }
];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  lightboxImage.src = photos[currentPhoto].src;
  lightboxImage.alt = photos[currentPhoto].alt;
  lightbox.querySelector('.lightbox-counter').textContent = `${currentPhoto + 1} / ${photos.length}`;
}
function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => {
  showPhoto(Number(button.dataset.photo));
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}));
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
  if (e.key === 'ArrowRight') showPhoto(currentPhoto + 1);
});

