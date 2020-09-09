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

function renderTable() {
    let order = firebase.database().ref('order/');
    order.on('child_added', function(data) {
        let orderValue = data.val();
        document.getElementById('table').innerHTML += `
            <tr>
                <td> ${orderValue.id}</td>
                <td> ${orderValue.order}</td>
                <td> ${orderValue.total}</td>
            </tr>
        `;
    })
};