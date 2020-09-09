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

// FILTER
// function filterGames() {
//     let cards = document.getElementsByClassName('card');

//     for(item of cards){
//         if (c == 'all')  {
//             item.classList.remove('hide');
//             item.classList.add('show');
//         }
//         else if(item.getAttribute('category') == c)
//         {
//             item.classList.remove('hide');
//             item.classList.add('show');
//         }
//         else {
//             item.classList.remove('show');
//             item.classList.add('hide');
//         }
//     }
// }


// GLOBAL
let products = [];
let cartItems = [];
let cart_n = document.getElementById('cart_n');

let pcDiv = document.getElementById('pcDIV');
let mobDiv = document.getElementById('mobileDIV');
let switchDiv = document.getElementById('switchDIV');
let vrDiv = document.getElementById('vrDIV');

// MODELS
let PC = [
    {title: 'Age of Empires 2 Definitive Edition', description: 'Real time strategy', picture: '../img/pc-games/aoe.jpeg', price: 20},
    {title: 'Destiny 2 Shadowkeep', description: 'First person shooter', picture: '../img/pc-games/destiny.jpeg', price: 30},
    {title: 'Football Manager 2020', description: 'Sport simulation', picture: '../img/pc-games/fm2020.jpeg', price: 60},
    {title: 'Witcher 3', description: 'Role play game', picture: '../img/pc-games/witcher3.jpeg', price: 40}
];

let MOBILE = [
    {title: 'Angry Birds', description: 'Puzzle', picture: '../img/mobile-games/angry_birds.jpeg', price: 3},
    {title: 'Clash Royale', description: 'Real time strategy', picture: '../img/mobile-games/clash_royale.jpeg', price: 7},
    {title: 'Minecraft Pocket Edition', description: 'Role play game', picture: '../img/mobile-games/minecraft.jpeg', price: 15},
    {title: 'Dota Underlords', description: 'Auto chess', picture: '../img/mobile-games/underlords.jpeg', price: 5}
];

let SWITCH = [
    {title: 'Animal Crossing', description: 'Simulation', picture: '../img/switch-games/animal.jpeg', price: 40},
    {title: 'Mario Kart', description: 'Racing', picture: '../img/switch-games/mariokart.jpeg', price: 50},
    {title: 'Super Smash Bros', description: 'Fighting', picture: '../img/switch-games/smash.jpeg', price: 55},
    {title: 'Legend of Zelda 2', description: 'Role play game', picture: '../img/switch-games/zelda.jpeg', price: 60}
];

let VR = [
    {title: 'Half-Life Alyx', description: 'Role play game', picture: '../img/vr-games/hl-alyx.jpeg', price: 60},
    {title: 'Boneworks', description: 'Shooter', picture: '../img/vr-games/boneworks.jpeg', price: 15},
    {title: 'Blade Sorcery', description: 'Fighting', picture: '../img/vr-games/blade-sorcery.jpeg', price: 30},
    {title: 'Superhot', description: 'Survival', picture: '../img/vr-games/superhot.jpeg', price: 20}
];


// DISPLAY CATEGORIES
function displayPC(con) {
    let btn = `btnPc${con}`;
    // let URL = `../img/pc-games/${con}.jpeg`;
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
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-half"></ion-icon>
                <h4 class="card-title">${PC[con-1].title}</h4>
                <p class="card-text>${PC[con-1].description}</p>
                <p class="card-text">Price: ${PC[con-1].price}.00 &euro;</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="cartBuy('${PC[con-1].title}','${PC[con-1].price}','${PC.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a style="color:inherit;" href="../cart/cart.html">Buy</a></button>
                        <button id="${btn}" type="button" onclick="cartAdd('${PC[con-1].title}','${PC[con-1].price}','${PC.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                    </div>
                    <small class="text-muted">Instant delivery </small>
                </div>
            </div>
        </div>
    
    `
}

function displayMob(con) {
    let btn = `btnMobile${con}`;
    return `
    
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top" src="'${MOBILE.picture}'" alt="Card image cap">
            <div class="card-body">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-half"></ion-icon>
                <h4 class="card-title">${MOBILE[con-1].title}</h4>
                <p class="card-text>${MOBILE[con-1].description}</p>
                <p class="card-text">Price: ${MOBILE[con-1].price}.00 &euro;</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="cartBuy('${MOBILE[con-1].title}','${MOBILE[con-1].price}','${MOBILE.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a style="color:inherit;" href="../cart/cart.html">Buy</a></button>
                        <button id="${btn}" type="button" onclick="cartAdd('${MOBILE[con-1].title}','${MOBILE[con-1].price}','${MOBILE.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                    </div>
                    <small class="text-muted">Instant delivery </small>
                </div>
            </div>
        </div>
    
    `
}

function displaySwitch(con) {
    let btn = `btnSwitch${con}`;
    return `
    
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top" src="'${SWITCH.picture}'" alt="Card image cap">
            <div class="card-body">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-half"></ion-icon>
                <h4 class="card-title">${SWITCH[con-1].title}</h4>
                <p class="card-text>${SWITCH[con-1].description}</p>
                <p class="card-text">Price: ${SWITCH[con-1].price}.00 &euro;</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="cartBuy('${SWITCH[con-1].title}','${SWITCH[con-1].price}','${SWITCH.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a style="color:inherit;" href="../cart/cart.html">Buy</a></button>
                        <button id="${btn}" type="button" onclick="cartAdd('${SWITCH[con-1].title}','${SWITCH[con-1].price}','${SWITCH.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                    </div>
                    <small class="text-muted">Instant delivery </small>
                </div>
            </div>
        </div>
    
    `
}

function displayVR(con) {
    let btn = `btnVR${con}`;
    return `
    
        <div class="card mb-4 shadow-sm">
            <img class="card-img-top" src="'${VR.picture}'" alt="Card image cap">
            <div class="card-body">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-half"></ion-icon>
                <h4 class="card-title">${VR[con-1].title}</h4>
                <p class="card-text>${VR[con-1].description}</p>
                <p class="card-text">Price: ${VR[con-1].price}.00 &euro;</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="cartBuy('${VR[con-1].title}','${VR[con-1].price}','${VR.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a style="color:inherit;" href="../cart/cart.html">Buy</a></button>
                        <button id="${btn}" type="button" onclick="cartAdd('${VR[con-1].title}','${VR[con-1].price}','${VR.picture}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to cart</button>
                    </div>
                    <small class="text-muted">Instant delivery </small>
                </div>
            </div>
        </div>
    
    `
}

// ANIMATION
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

// RENDER
function render() {
    for(let i = 1; i <= 4; i++) {
        pcDiv.innerHTML +=`${displayPC(i)}`;
        mobDiv.innerHTML +=`${displayMob(i)}`;
        switchDiv.innerHTML +=`${displaySwitch(i)}`;
        vrDiv.innerHTML +=`${displayVR(i)}`;        
    }
    if(localStorage.getItem('cartAdd') == null) {

    } else {
        products = JSON.parse(localStorage.getItem('cartAdd'));
        cart_n.innerHTML = `[${products.length}]`
    }
}