let nekretnina = JSON.parse(localStorage.getItem('nekretnina'));


document.getElementById('naziv').innerText = nekretnina.naziv;
document.getElementById('kvadratura').innerText = nekretnina.kvadratura;
document.getElementById('cijena').innerText = nekretnina.cijena;
document.getElementById('tipGrijanja').innerText = nekretnina.tip_grijanja;
document.getElementById('godinaIzgradnje').innerText = nekretnina.godina_izgradnje;
document.getElementById('lokacija').innerText = nekretnina.lokacija;
document.getElementById('datumObjave').innerText = nekretnina.datum_objave;
document.getElementById('opis').innerText = nekretnina.opis;

const upitiDiv = document.getElementById('upiti');

PoziviAjax.getKorisnik(function(err,data){
    if(err){
      
    }else{
        console.log("Korisnik je prijavljen");
        const divContainer = document.createElement('div');
        const inputUpit = document.createElement('input');
        const posaljiUpit = document.createElement('button');

        inputUpit.type = 'text';
        inputUpit.id = 'inputUpit';
        inputUpit.placeholder = 'Unesite svoj upit...';

        posaljiUpit.id = 'posaljiUpit';
        posaljiUpit.textContent = 'Pošalji';

        divContainer.appendChild(inputUpit);
        divContainer.appendChild(posaljiUpit);

        upitiDiv.appendChild(divContainer);
        posaljiUpit.addEventListener('click', () => {
            const tekstUpita = inputUpit.value;
            if (tekstUpita.trim() !== '') {
                PosaljiUpit(nekretnina.id, tekstUpita);
            } else {
                alert('Unesite tekst upita prije slanja.');
            }
        });
    }
});



PoziviAjax.getUpiti(nekretnina.id,function(err,data){
    if (err) {
        console.error(err);
    } else {

        data.forEach(upit => {
            const upitDivElem = document.createElement('div');
            upitDivElem.classList.add('upit');

            const usernameElem = document.createElement('p');
            const usernameStrongElem = document.createElement('strong');
            
            usernameStrongElem.textContent = upit.korisnik.username;
            usernameElem.appendChild(usernameStrongElem);

            const porukaElem = document.createElement('p');
            porukaElem.textContent = upit.tekst_upita;

            upitDivElem.appendChild(usernameElem);
            upitDivElem.appendChild(porukaElem);

            upitiDiv.appendChild(upitDivElem);
        });
    }
});


function PosaljiUpit(nekretnina_id, tekst_upita) {
    PoziviAjax.postUpit(nekretnina_id, tekst_upita, function (err, data) {
        if (err) {
            console.error(err);
            alert('Došlo je do greške prilikom slanja upita.');
        } else {
            console.log('Upit uspješno poslan:', data);
        }
    });
} 