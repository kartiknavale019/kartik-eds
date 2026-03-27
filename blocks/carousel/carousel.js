import Swiper from './swiper.min.js';

export default function decorate(block) {
    block.parentElement.classList.add('swiper');
    block.classList.add('swiper-wrapper');
    
    Array.from(block.children).forEach((column) => {
        column.classList.add('swiper-slide');
        console.log(column);
    });

    let newSwiper = block.parentElement;

    // 1. Uncommented your buttons and placed them BEFORE Swiper initializes
    let leftBunton = document.createElement('button');
    leftBunton.classList.add('swiper-button-prev');
    leftBunton.innerHTML = '<img src="/icons/search.svg" alt="Previous"/>';
    block.parentElement.appendChild(leftBunton);
    
    let rightButton = document.createElement('button');
    rightButton.classList.add('swiper-button-next');
    rightButton.innerHTML = '<img src="/icons/search.svg" alt="Next"/>';
    block.parentElement.appendChild(rightButton);   

    // 2. Added 'new' to properly initialize the Swiper instance
    new Swiper(newSwiper, {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
}