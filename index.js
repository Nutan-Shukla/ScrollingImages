const API_KEY = '44294854-eff23a7c2dce8b317e6e98d5b';

const BASE_URL = 'https://pixabay.com/api/';
let currentPage = 1;
let imagesPerRow = 3;

const imageContainer = document.getElementById('imageContainer');
const imagesPerRowSelect = document.getElementById('imagesPerRow');

async function fetchImages(page) {
  const response = await fetch(`${BASE_URL}?key=${API_KEY}&page=${page}&per_page=20`);
  const data = await response.json();
  return data.hits;
}

function displayImages(images) {
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.style.width = `${100 / imagesPerRow - 2}%`;
    img.style.height = '200px';
    imageContainer.appendChild(img);
  });
}

async function loadImages() {
  const images = await fetchImages(currentPage);
  displayImages(images);
  currentPage++;
}

function handleScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadImages();
  }
}

function handleImagesPerRowChange(event) {
  imagesPerRow = event.target.value;
  imageContainer.innerHTML = '';
  currentPage = 1;
  loadImages();
}

function handleKeyDown(event) {
  if (event.key === 'ArrowDown') {
    window.scrollBy(0, window.innerHeight);
  } else if (event.key === 'ArrowUp') {
    window.scrollBy(0, -window.innerHeight);
  }
}

imagesPerRowSelect.addEventListener('change', handleImagesPerRowChange);
window.addEventListener('scroll', handleScroll);
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('DOMContentLoaded', loadImages);