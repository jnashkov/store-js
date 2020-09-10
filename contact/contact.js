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

let form = document.getElementById('contactForm');
let name = document.getElementById('contact-name');
let email = document.getElementById('contact-email');
let message = document.getElementById('contact-message');

function sendMessage(name, email, message) {
    if(!firebase.apps.length) {
        firebase.initializeApp(config)
    }
    let messageRef = firebase.database().ref('messages').push().set({
        name: name.value,
        email: email.value,
        message: message.value 
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!form) {
        swal({
            title: 'Oops...',
            text: "Please enter a valid inputs",
            type: 'error',
        })
    } else {
        swal({
            title:'Success',
            html:'Your message has been sent',
            type: 'success'
        });
        form.reset();
    }
})