
const inputDiv = document.getElementById('input');
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

        inputDiv.innerHTML = ''; 
        inputDiv.appendChild(divContainer);
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

function PosaljiUpit(nekretnina_id, tekst_upita){
    PoziviAjax.postUpit(nekretnina_id, tekst_upita, function (err, data) {
        if (err) {
            console.error(err);
            alert('Došlo je do greške prilikom slanja upita.');
        } else {
            console.log('Upit uspješno poslan:', data);
        }
    });
} 