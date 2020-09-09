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

function checkUserFullName() {
    let userSurname = document.getElementById('userFullName').value; 
    let flag = false;
    if (userSurname == '') {
        flag = true;
    }
    if(flag) {
        document.getElementById('userFullNameError').style.display = 'block';
    } else {
        document.getElementById('userFullNameError').style.display = 'none';
    }
}

function checkUserSurname() {
    let userSurname = document.getElementById('userSurname').value;
    let flag = false;
    if(userSurname == '') {
        flag = true;
    }
    if(flag) {
        document.getElementById('userSurname').style.display = 'block';
    } else {
        document.getElementById('userSurname').style.display = 'none';
    }
}

function checkUserEmail() {
    let userEmail = document.getElementById('userEmail');
    let userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag;
    if(userEmail.value.match(userEmailFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if(flag) {
        document.getElementById('userEmailError').style.display = 'block';
    } else {
        document.getElementById('userEmailError').style.display = 'none';
    }
}

function checkUserPassword() {
    let userPassword = document.getElementById('userPassword');
    let userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/; 
    let flag;
    if(userPassword.value.match(userPasswordFormat)) {
        flag = false;
    } else {
        flag = true;
    }
    if(flag) {
        document.getElementById('userPasswordError').style.display = 'block';
    } else {
        document.getElementById('userPasswordError').style.display = 'none';
    }
}

function checkUserBio() {
    let userBio = document.getElementById('userBio').value;
    let flag = false;
    if(flag) {
        document.getElementById('userBioError').style.display = 'block';
    } else {
        document.getElementById('userBioError').style.display = 'none';
    }
}

function signUp() {
    let userFullName = document.getElementById('userFullName').value;
    let userSurname = document.getElementById('userSurname').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;
    let userFullNameFormat = /^([A-Za-z.\s_-])/;
    let userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    let checkUserFullNameValid = userFullName.match(userFullNameFormat);
    let checkUserEmailValid = userEmail.match(userEmailFormat);
    let checkUserPasswordValid = userPassword.match(userPasswordFormat);

    if(checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if(checkUserSurname === '') {
        return checkUserSurname();
    } else if(checkUserEmailValid == null) {
        return checkUserEmail();
    } else if(checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            let user = firebase.auth().currentUser;
            let uid;
            if(user != null) {
                uid = user.uid;
            }
            let firebaseRef = firebase.database().ref();
            let userData = {
                userFullName: userFullName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userFb: 'https://www.facebook.com/',
                userTw: 'https://twitter.com/',
                userIn: 'https://instagram.com/',
                userBio: 'User Biography'
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace('../login/login.html');
                }, 1000)
            });
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}