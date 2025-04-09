document.addEventListener('DOMContentLoaded', function () {
    const forma = document.querySelector('form'); 
    const meniElement = document.getElementById('meni');

    forma.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value; 
        const password = document.getElementById('password').value;     
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    const data = JSON.parse(ajax.responseText);

                    alert(data.poruka);
                    window.location.href = '/nekretnine.html';
              
                } else {
                    alert('Neuspješna prijava');
                }
            }
        };

        ajax.open("POST", "/login", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({ username, password }));
    });
});