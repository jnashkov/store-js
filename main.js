var firebaseConfig = {
    apiKey: "AIzaSyDmV_9f080ynTUKJ6cDKqEN-9DmNdOvBbA",
    authDomain: "store-project-bf7a6.firebaseapp.com",
    databaseURL: "https://store-project-bf7a6.firebaseio.com",
    projectId: "store-project-bf7a6",
    storageBucket: "store-project-bf7a6.appspot.com",
    messagingSenderId: "168931851063",
    appId: "1:168931851063:web:b5e7ae6aeb487d921a38b2",
    measurementId: "G-GN7E05ZLX7"
};
firebase.initializeApp(firebaseConfig);

// HEADER
let circle = document.getElementById('circle');
let upBtn = document.getElementById('upBtn');
let downBtn = document.getElementById('downBtn');

let rotateValue = circle.style.transform;
let rotateSum;

upBtn.onclick = function() {
    rotateSum = rotateValue + 'rotate(-90deg)';
    circle.style.transform = rotateSum;
    rotateValue = rotateSum;
}

downBtn.onclick = function() {
    rotateSum = rotateValue + 'rotate(90deg)';
    circle.style.transform = rotateSum;
    rotateValue = rotateSum;
}

// COUNTDOWN
function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
        clearInterval(timeinterval);
        }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}

const deadline = new Date(Date.parse(new Date("Dec 31, 2020 23:59:59")));
initializeClock('timer', deadline);

// CAROUSEL
var currentSlide = 1;


function showSlide(slideIndex) {
  const slides = document.getElementsByClassName('slide');
  if (slideIndex > slides.length) { currentSlide = 1 }
  if (slideIndex < 1) { currentSlide = slides.length }
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none'
  }
  slides[currentSlide - 1].style.display = 'flex'
}


function nextSlide() {
  showSlide(currentSlide += 1);
}

function previousSlide() {
  showSlide(currentSlide -= 1);
}

window.onload = function () {
  showSlide(currentSlide);
  
  document.getElementById('prev').addEventListener('click', function () {
    previousSlide();
  })
  document.getElementById('next').addEventListener('click', function () {
    nextSlide();
  })
}

// RENDER SLIDES
// GLOBAL VARIABLES

let products = [];
let cartItems = [];
let cart_n = document.getElementById('cart_n');
let slide = document.getElementById('slide');

// MODEL
let DEAL = [
  {title: 'Half-Life Alyx', description: 'Role play game', picture: '../img/vr-games/hl-alyx.jpeg', price: 60},
  {title: 'Football Manager 2020', description: 'Sport simulation', picture: '../img/pc-games/fm2020.jpeg', price: 60},
  {title: 'Super Smash Bros', description: 'Fighting', picture: '../img/switch-games/smash.jpeg', price: 55}
];

function displaySlides(con) {
  let btn = `btnDeal${con}`;
  let image = new Image();
  let canvas = document.createElement("canvas"),
      canvasContext = canvas.getContext("2d");

  image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      canvasContext.drawImage(image, 0, 0, image.width, image.height);
      
      let dataURL = canvas.toDataURL();
      document.write(dataURL);
  };

  image.src = con.picture;
  return `
    <div class="card mb-4 shadow-sm">
      <img class="card-img-top" src="'${image}'">
      <div class="card-body">
          <h4 class="card-title">${DEAL[con-1].title}</h4>
          <p class="card-text>${DEAL[con-1].description}</p>
          <p class="card-text">Price: ${DEAL[con-1].price}.00 &euro;</p>
          <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                  <button type="button" onclick="cartBuy('${DEAL[con-1].title}','${DEAL[con-1].price}','${DEAL.picture}','${con}','${btn}')" class="btn" ><a style="color:inherit;" href="../cart/cart.html"></a></button>
                  <button id="${btn}" type="button" onclick="cartAdd('${DEAL[con-1].title}','${DEAL[con-1].price}','${DEAL.picture}','${con}','${btn}')" class="btn"></button>
              </div>
          </div>
      </div>
    </div>
  `;
}

// CART ANIMATION
function animation() {
  const toast=swal.mixin({
    toast:true,
    position:'top-end',
    showConfirmButton:false,
    timer:1000,
  });
  toast({
      type:'success',
      title: 'Added to shopping cart'
  });
}

// CART FUNCTIONS
function cartAdd(title, price, picture, con, btncart) {
  let item = {
      title: title,
      price: price,
      picture: picture
  }

  cartItems.push(item);
  let storage = JSON.parse(localStorage.getItem('cartAdd'));
  if(storage == null) {
      products.push(item);
      localStorage.setItem('cartAdd', JSON.stringify(products));
  } else {
      products = JSON.parse(localStorage.getItem('cartAdd'));
      products.push(item);
      localStorage.setItem('cartAdd', JSON.stringify(products));
  }

  products = JSON.parse(localStorage.getItem('cartAdd'));
  cart_n.innerHTML = `[${products.length}]`;
  document.getElementById(btncart).style.display = 'none';
  animation();
}

function cartBuy(title, price, picture, con, btncart) {
  let item = {
      title: title,
      price: price,
      picture: picture
  }

  cartItems.push(item);
  let storage = JSON.parse(localStorage.getItem('cartAdd'));
  if(storage == null) {
      products.push(item);
      localStorage.setItem('cartAdd', JSON.stringify(products));
  } else {
      products = JSON.parse(localStorage.getItem('cartAdd'));
      products.push(item);
      localStorage.setItem('cartAdd', JSON.stringify(products));
  }

  products = JSON.parse(localStorage.getItem('cartAdd'));
  cart_n.innerHTML = `[${products.length}]`;
  document.getElementById(btncart).style.display = 'none';
}

function renderDeal() {
  for(let i = 0; i < 4; i++) {
    slide.innerHTML = `${displaySlides(i)}`;
  }
  if(localStorage.getItem('cartAdd') == null) {

  } else {
    products = JSON.parse(localStorage.getItem('cartAdd'));
    cart_n.innerHTML = `[${products.length}]`
  }
}


// SUBSCRIBE TO NEWSLETTER
let form = document.getElementById('newsForm');
let email = document.getElementById('email');

function sendEmail(input) {
  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }
  let mailsRef = firebase.database().ref('emails').push().set({
    mail: input.value
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(sendEmail(email) == null) {
    swal({
      title: 'Oops...',
      text: "Please enter a valid email address, such as john@example.com.",
      type: 'error',
    })
  } else {
    swal({
      title:'Subscribed',
      html:'Email has been sent',
      type: 'success'
    });
  }
})