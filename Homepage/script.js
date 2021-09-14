////Image change////
const interval2 = 10000;
const imgsrc = document.querySelector('.landing-image-img');

let imgC;
const imgChange = () => {
  imgC = setInterval(() => {
    nextImg();
  }, interval2);
};

const images = ["img1","img2","img3","img4","img5","img6","img7","img8" ,"img9","img10"  ];

let i;
const imgS1 = () => {
  i=0;
  imgsrc.setAttribute('class',`landing-image-${images[0]}`)
  imgsrc.setAttribute('src',`images/${images[0]}.png`); 
};

const nextImg = () => {
  if(i>0){imgsrc.removeAttribute('class',`landing-image-${images[i-1]}`)};
    if (i < images.length) {
      imgsrc.setAttribute('class',`landing-image-${images[i]}`)
      imgsrc.setAttribute('src',`images/${images[i]}.png`); 
      i++;
    }else{
      imgS1();
    } 
}
imgS1();
imgChange();




/////Events-slider/////
const cardContainer = document.querySelector('.events-container');
const cardSlider = document.querySelector('.events-slider');
const interval = 2500;

const navB1 =document.querySelector('.events-navigationB--1');
const navB2 =document.querySelector('.events-navigationB--2');
const navB3 =document.querySelector('.events-navigationB--3');
const navB4 =document.querySelector('.events-navigationB--4');

let cards = document.querySelectorAll('.card');
let index = 0;
let cardId;

// const startClone1 = cards[0].cloneNode(true);
// const startClone2 = cards[1].cloneNode(true);
// const startClone3 = cards[2].cloneNode(true);

// startClone1.id = 'start-clone-1';
// startClone2.id = 'start-clone-2';
// startClone3.id = 'start-clone-3';


// cardSlider.append(startClone1);
// cardSlider.append(startClone2);
// cardSlider.append(startClone3);


//Slider
let cardWidth = cards[index].clientWidth + 10;

window.addEventListener('resize',  () => { 
  "use strict";
  cardWidth = cards[index].clientWidth + 10; 
});

cardSlider.style.transform = `translateX(${-(cardWidth) * (index)}px)`;

console.log(cards);

const startSlide = () => {
  cardId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getCards = () => document.querySelectorAll('.card');

cardSlider.addEventListener('transitionend', () => {
  cards = getCards();
  if (cards[index].id === 'start-clone-1') {
    cardSlider.style.transition = 'none';
    index = 0;
    navB1.style.width = '20px';
    cardSlider.style.transform = `translateX(${-cardWidth * (index)}px)`;
  }
});

navB1.style.width = '20px';

const moveToNextSlide = () => {
    cards = getCards();
    if (index >= cards.length - 1) return;

        //button widener
        if(index<2){
          navB1.style.width = '20px';
        }else{
          navB1.style.width = '7px';
        }
        if(index>=2 && index<5){
          navB2.style.width = '20px';
        }else{
          navB2.style.width = '7px';
        }
        if(index>=5 && index<8){
          navB3.style.width = '20px';
        }else{
          navB3.style.width = '7px';
        }
        if(index>=8 && index<9){
          navB4.style.width = '20px';
        }else{
          navB4.style.width = '7px';
        }

    index++;
    cardSlider.style.transition = '.7s ease-out';
    cardSlider.style.transform = `translateX(${-cardWidth * index}px)`;
  };

cardContainer.addEventListener('mouseenter', () => {
    clearInterval(cardId);
  });

cardContainer.addEventListener('mouseleave', startSlide);

startSlide();

//Slider-button

navB1.addEventListener('focusin', () => {
clearInterval(cardId);
navB1.style.width = '20px';
navB2.style.width = '7px';
navB3.style.width = '7px';
navB4.style.width = '7px';
cardSlider.style.transition = '.7s ease-out';
cardSlider.style.transform = `translateX(${-cardWidth * (0)}px)`;
index = 0;
startSlide();
 })
navB2.addEventListener('focusin', () => {
  clearInterval(cardId);
  navB1.style.width = '7px';
  navB2.style.width = '20px';
  navB3.style.width = '7px';
  navB4.style.width = '7px';
  cardSlider.style.transition = '.7s ease-out';
  cardSlider.style.transform = `translateX(${-cardWidth * (3)}px)`;
  index = 3;
  startSlide();
})
navB3.addEventListener('focusin', () => {
  clearInterval(cardId);
  navB1.style.width = '7px';
  navB2.style.width = '7px';
  navB3.style.width = '20px';
  navB4.style.width = '7px';
  cardSlider.style.transition = '.7s ease-out';
  cardSlider.style.transform = `translateX(${-cardWidth * (6)}px)`;
  index = 6;
  startSlide();
})
navB4.addEventListener('focusin', () => {
  clearInterval(cardId);
  navB1.style.width = '7px';
  navB2.style.width = '7px';
  navB3.style.width = '7px';
  navB4.style.width = '20px';
  cardSlider.style.transition = '.7s ease-out';
  cardSlider.style.transform = `translateX(${-cardWidth * (9)}px)`;
  index = 9;
  startSlide();
})


