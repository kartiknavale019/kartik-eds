async function loadSwiper() {
  if (!window.Swiper) {
    await Promise.all([
      loadCSS('/blocks/carousel/swiper-bundle.min.css'),
      loadScript('/blocks/carousel/swiper-bundle.min.js'),
    ]);
  }
}

function loadCSS(href) {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    document.head.append(link);
  });
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = resolve;
    document.body.append(script);
  });
}

// 🔥 Get structured data (based on your setup)
function getData(block) {
  try {
    return JSON.parse(block.textContent);
  } catch {
    return {};
  }
}

function createSlide({ image, title }) {
  const slide = document.createElement('div');
  slide.className = 'swiper-slide';

  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = title || '';
    slide.appendChild(img);
  }

  if (title) {
    const heading = document.createElement('h3');
    heading.textContent = title;
    slide.appendChild(heading);
  }

  return slide;
}

export default async function decorate(block) {
    return;
  block.classList.add('carousel');

  await loadSwiper();

  const data = getData(block);

  const swiperEl = document.createElement('div');
  swiperEl.className = 'swiper';

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  (data.slides || []).forEach((slide) => {
    wrapper.appendChild(createSlide(slide));
  });

  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination';

  swiperEl.append(wrapper, pagination);

  block.innerHTML = '';
  block.appendChild(swiperEl);

  new Swiper(swiperEl, {
    loop: true,
    slidesPerView: 1,

    autoplay: data.autoplay
      ? {
          delay: 3000,
          disableOnInteraction: false,
        }
      : false,

    pagination: {
      el: pagination,
      clickable: true,
    },
  });
}