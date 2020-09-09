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

// GLOBAL
let products = JSON.parse(localStorage.getItem('cartAdd'));
let cartItems = [];
let cart_n = document.getElementById('cart_n');
let table = document.getElementById('table');
let total = 0;

function displayTable(i) {
    return `
        <tr>
            <th scope="row">${i+1}</th>
            <td><img style="width:90px;" src="${products[i].picture}"></td>
            <td>${products[i].title}</td>
            <td>1</td>
            <td>${products[i].price}</td>
        </tr>
    `;
}

function buy() {
    let d = new Date();
    let t = d.getTime();
    
    let counter = t;
    counter += 1;

    let db = firebase.database().ref('order/' + counter);
    let itemdb = {
        id: counter,
        order: counter-895,
        total: total
    }
    db.set(itemdb);

    swal({
        position:'center',
        type:'success',
        title:'Purchase made successfully!',
        text:`Your purchase order is: ${itemdb.order}`,
        showConfirmButton:true,
        timer:50000
    });
    
    clean();
}

function clean() {
    localStorage.clear();
    for(let i = 0; i < products.length; i++) {
        table.innerHTML += displayTable(i);
        total = total + parseInt(products[i].price)
    }
    total = 0;
    table.innerHTML = `
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    `;
    cart_n.innerHTML = '';
    document.getElementById('btnBuy').style.display = 'none';
    document.getElementById('btnClean').style.display = 'none';
}

function renderCart() {
    for(let i = 0; i < products.length; i++) {
        table.innerHTML += displayTable(i);
        total = total + parseInt(products[i].price);
    }
    table.innerHTML += `
        <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Total: $${total}.00</th>
        </tr>
        <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">
                <button id="btnClean" onclick="clean()" class="btn text-white btn-warning">Clean Shopping Cart</button>
            </th>
            <th scope="col"><button id="btnBuy" onclick="buy()" class="btn btn-success">Buy</button></th>
        </tr>
    `;
    products = JSON.parse(localStorage.getItem('cartAdd'));
    cart_n.innerHTML = `[${products.length}]`;
}