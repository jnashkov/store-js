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
let d = new Date();
let t = d.getTime();
let counter = t;

// FORM
document.getElementById('form').addEventListener('submit', (e) => {
    let order = document.getElementById('order').value;
    let total = document.getElementById('total').value;
    e.preventDefault();
    createOrder(order,total);
    form.reset();
})

function createOrder(order,total) {
    console.log(counter);
    counter += 1;
    console.log(counter);

    let newOrder = {
        id: counter,
        order: order,
        total: total
    }

    let db = firebase.database().ref('order/' + counter);
    db.set(newOrder);
    document.getElementById('cardSection').innerHTML = '';
    readOrder();
}

function readOrder() {
   let order = firebase.database().ref('order/' + counter);
   order.on('child_added', function(data) {
       let orderValue = data.val();
       document.getElementById('cardSection').innerHTML += `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">Order: ${orderValue.order}</h5>
                <p class="card-text">Total: ${orderValue.total} </p>   
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateOrder(${orderValue.id},'${orderValue.order}','${orderValue.total}')"><ion-icon name="create-outline"></ion-icon> Edit Order</button>
                <button type="submit" class="btn btn-danger" onclick="deleteOrder(${orderValue.id})"><ion-icon name="trash-outline"></ion-icon> Delete Order</button> 
            </div>
        </div>
       `;
   })
}

function reset() {
    document.getElementById('firstSection').innerHTML = `
    <form class="border p-4 mb-4" id="form">
        <div class="form-group">
            <label>Order</label>
            <input type="text" class="form-control" id="order" placeholder="order">
        </div>
        <div class="form-group">
            <label>Total</label>
            <input type="text" class="form-control" id="total" placeholder="total">
        </div>
        <button type="submit" id="button1" class="btn btn-primary"><ion-icon name="add-outline"></ion-icon> Add Order</button>
        <button style="display:none" id="button2" class="btn btn-success">Update Order</button>
        <button style="display:none" id="button3" class="btn btn-danger">Cancel</button>
    </form>
    `;
    document.getElementById('form').addEventListener('submit', (e) => {
        let order = document.getElementById('order').value; 
        let total = document.getElementById('total').value; 
        e.preventDefault();
        createOrder(order,total);
        form.reset();
    })
}

function updateOrder(id,order,total) {
    document.getElementById('firstSection').innerHTML = `
    <form class="border p-4 mb-4" id="form2">
        <div class="form-group">
            <label>Order</label>
            <input type="text" class="form-control" id="order" placeholder="order">
        </div>
        <div class="form-group">
            <label>Total</label>
            <input type="text" class="form-control" id="total" placeholder="total">
        </div>
        <button style="display:none" type="submit" id="button1" class="btn btn-primary"><ion-icon name="add-outline"></ion-icon> Add Order</button>
        <button  id="button2" class="btn btn-success">Update Order</button>
        <button  id="button3" class="btn btn-danger">Cancel</button>
    </form>
    `;
    document.getElementById('form2').addEventListener('submit', (e) => {
        e.preventDefault();
    });
    document.getElementById('button3').addEventListener('click', (e) => {
        reset();
    });
    document.getElementById('button2').addEventListener('click', (e) => {
        updateOrder2(id,document.getElementById('order').value, document.getElementById('total').value);
    });
    document.getElementById('order').value = order;
    document.getElementById('total').value = total;
}

function updateOrder2(id,order,total) {
    let orderUpdated = {
        id: id,
        order: order,
        total: total
    }
    let db = firebase.database().ref('order/' + id);
    db.set(orderUpdated);
    document.getElementById('cardSection').innerHTML = '';
    readOrder();
    reset();
}

function deleteOrder(id) {
    console.log(id);
    let order = firebase.database().ref('order/' + id);
    order.remove();
    reset();
    document.getElementById('cardSection').innerHTML = '';
    readOrder();
}