(function() {
  'use strict';

  const images = [
    'imgs/pic00.png',
    'imgs/pic01.png',
    'imgs/pic02.png',
    'imgs/pic03.png',
    'imgs/pic04.png',
    'imgs/pic05.png',
    'imgs/pic06.png',
    'imgs/pic07.png',
  ];

  let currentNum = 0;
  let timerId = 0;

  function setMainImage(image) {
    document.querySelector('main img').src = image;
  }

  function addCurrentClass() {
    document.querySelectorAll('.thumbnails li')[currentNum].classList.add('current');
  }

  function removeCurrentClass() {
    document.querySelectorAll('.thumbnails li')[currentNum].classList.remove('current');
  }

  setMainImage(images[currentNum]);

  const thumbnails = document.querySelector('.thumbnails');
  images.forEach((image, index) => {
    const li = document.createElement('li');
    if (index === currentNum) {
      li.classList.add('current');
    }

    li.addEventListener('click', () => {
      setMainImage(image);
      removeCurrentClass();
      currentNum = index;
      addCurrentClass();
    });

    const img = document.createElement('img');
    img.src = image;
    li.appendChild(img);
    thumbnails.appendChild(li);
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    removeCurrentClass();
    currentNum++;
    if(currentNum === images.length) {
      currentNum = 0;
    }
    addCurrentClass();
    setMainImage(images[currentNum]);
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    removeCurrentClass();
    currentNum--;
    if(currentNum === -1) {
      currentNum = images.length - 1;
    }
    addCurrentClass();
    setMainImage(images[currentNum]);
  });

  function playSlideShow() {
    timerId = setTimeout(() => {
      next.click();
      playSlideShow();
    }, 100);
  }

  const play = document.getElementById('play');
  const pause = document.getElementById('pause');
  play.addEventListener('click', () => {
    play.classList.add('hidden');
    pause.classList.remove('hidden');
    playSlideShow();
  });
  pause.addEventListener('click', () => {
    pause.classList.add('hidden');
    play.classList.remove('hidden');
    clearTimeout(timerId);
  });

})();
