function getData(block) {
  try {
    return JSON.parse(block.textContent);
  } catch {
    return {};
  }
}

function createSlide({ image, title }) {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';

  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = title || '';
    slide.appendChild(img);
  }

  if (title) {
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    slide.appendChild(titleEl);
  }

  return slide;
}

export default function decorate(block) {
    return;
  block.classList.add('carousel');

//   const data = getData(block);
//   const slides = data.slides || [];
const slideElements = [...block.children];
const slides = slideElements.map((slideEl) => {
  const img = slideEl.querySelector('img');
  const title = slideEl.textContent.trim();

  return {
    image: img?.src,
    title,
  };
});

console.log('Slides:', slides.length); // debug

  

  if (!slides.length) return;

  let current = 0;

  // Track
  const track = document.createElement('div');
  track.className = 'carousel-track';

  slides.forEach((slide) => {
    track.appendChild(createSlide(slide));
  });

  // Buttons
  const prev = document.createElement('button');
  prev.className = 'carousel-prev';
  prev.innerHTML = '‹';

  const next = document.createElement('button');
  next.className = 'carousel-next';
  next.innerHTML = '›';

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  function goNext() {
    current = (current + 1) % slides.length;
    update();
  }

  function goPrev() {
    current = (current - 1 + slides.length) % slides.length;
    update();
  }

  next.addEventListener('click', goNext);
  prev.addEventListener('click', goPrev);

  // Autoplay
  let interval;
  if (data.autoplay) {
    interval = setInterval(goNext, 3000);
  }

  // Pause on hover (senior touch)
  block.addEventListener('mouseenter', () => {
    if (interval) clearInterval(interval);
  });

  block.addEventListener('mouseleave', () => {
    if (data.autoplay) interval = setInterval(goNext, 3000);
  });

  // Render
  block.innerHTML = '';
  block.append(prev, track, next);

  update();
}