let x = document.getElementById('email');
let y = document.getElementById('password');

document.getElementById('form').addEventListener('submit', (ee) => {
    ee.preventDefault();
    console.log(x.value);
    console.log(y.value);

    if(x.value == 'test@test.com' && y.value == 'test123') {
        swal({
            title:'Welcome',
            html:'Access granted',
            type: 'success'
        });
        setTimeout(() => {
            loadPage();
        }, 3000);
    } else {
        swal({
            title:'ERROR',
            html:'Access denied',
            type: 'error'
        });
    }

    function loadPage() {
        window.location.href = '../admin.html';
    }
});