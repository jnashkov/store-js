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

function checkUserSIEmail() {
    let userSIEmail = document.getElementById('userSIEmail');
    let userSIEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag;
    if(userSIEmail.value.match(userSIEmailFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if(flag) {
        document.getElementById('userSIEmailError').style.display = 'block';
    } else {
        document.getElementById('userSIEmailError').style.display = 'none';
    }
}

function checkUserSIPassword() {
    let userSIPassword = document.getElementById('userSIPassword');
    let userSIPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    let flag;
    if(userSIPassword.value.match(userSIPasswordFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if(flag) {
        document.getElementById('userSIPasswordError').style.display = 'block';
    } else {
        document.getElementById('userSIPasswordError').style.display = 'none';
    }
}

function signIn() {
    let userSIEmail = document.getElementById('userSIEmail').value;
    let userSIPassword = document.getElementById('userSIPassword').value;
    let userSIEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let userSIPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    let checkUserEmailValid = userSIEmail.match(userSIEmailFormat);
    let checkUserPasswordValid = userSIPassword.match(userSIPasswordFormat);

    if(checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if(checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {
            swal({
                type: 'successfull',
                title: 'Succesfully signed in', 
            }).then((value) => {
                setTimeout(function(){
                    window.location.replace('../profile/profile.html');
                }, 1000)
            });
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            });
        });
    }
}