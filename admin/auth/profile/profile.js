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

// get data from server and show it in page
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        let user = firebase.auth().currentUser();
        let uid;
        if(user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapshot) => {
            document.getElementById('userPfFullName').innerHTML = dataSnapshot.val().userFullName;
            document.getElementById('userPfSurname').innerHTML = dataSnapshot.val().userSurname;
            document.getElementById('userPfFb').setAttribute('href', dataSnapshot.val().userFb);
            document.getElementById('userPfTw').setAttribute('href', dataSnapshot.val().userTw);
            document.getElementById('userPfIn').setAttribute('href', dataSnapshot.val().userIn);
            document.getElementById('userPfBio').innerHTML = dataSnapshot.val().userBio;
        })
    } else {
        // no user ir signed in
    }
});

function showEditProfileForm() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('editProfileForm').style.display = 'block';
    let userPfFullName = document.getElementById('userPfFullName').innerHTML;
    let userPfSurname = document.getElementById('userPfSurname').innerHTML;
    let userPfFb = document.getElementById('userPfFb').getAttribute('href');
    let userPfTw = document.getElementById('userPfTw').getAttribute('href');
    let userPfIn = document.getElementById('userPfIn').getAttribute('href');
    let userPfBio = document.getElementById('userPfBio').innerHTML;

    document.getElementById('userFullName').value = userPfFullName;
    document.getElementById('userSurname').value = userPfSurname;
    document.getElementById('userFacebook').value = userPfFb;
    document.getElementById('userTwitter').value = userPfTw;
    document.getElementById('userInstagram').value = userPfIn;
    document.getElementById('userBio').value = userPfBio;
}

function hideEditProfileForm() {
    document.getElementById('profileSection').style.display = 'block';
    document.getElementById('editProfileForm').style.display = 'none';
}

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

function checkUserBio() {
    let userBio = document.getElementById('userBio').value;
    let flag = false;
    if(flag) {
        document.getElementById('userBioError').style.display = 'block';
    } else {
        document.getElementById('userBioError').style.display = 'none';
    }
}

function saveProfile() {
    let userFullName = document.getElementById('userFullName').value;
    let userSurname = document.getElementById('userSurname').value;
    let userFacebook = document.getElementById('userFacebook').value;
    let userTwitter = document.getElementById('userTwitter').value;
    let userInstagram = document.getElementById('userInstagram').value;
    let userBio = document.getElementById('userBio').value;

    let userFullNameFormat = /^([A-Za-z.\s_-])/;
    let checkUserFullNameValid = userFullName.match(userFullNameFormat);

    if(checkUserFullNameValid == null) {
        return checkUserFullName(); 
    } else if(userSurname === '') {
        return checkUserSurname();
    } else {
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null) {
            uid = user.uid
        }
        let firebaseRef = firebase.database().ref();
        let userData = {
            userFullName: userFullName,
            userSurname: userSurname,
            userFb: userFacebook,
            userTw: userTwitter,
            userIn: userInstagram,
            userBio: userBio
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.', 
        }).then((value) => {
            setInterval(function(){
                document.getElementById('profileSection').style.display = 'block';
                document.getElementById('editProfileForm').style.display = 'none';
            })
        })
    }
}


function signOut() {
    firebase.auth().signOut().then(function(){
        // signout successful
        swal({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace('../login/login.html');
            }, 1000)
        });
    }).catch(function(error){
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}