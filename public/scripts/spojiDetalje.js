let nekretnina = JSON.parse(localStorage.getItem('nekretnina'));


document.getElementById('naziv').innerText = nekretnina.naziv;
document.getElementById('kvadratura').innerText = nekretnina.kvadratura;
document.getElementById('cijena').innerText = nekretnina.cijena;
document.getElementById('tipGrijanja').innerText = nekretnina.tip_grijanja;
document.getElementById('godinaIzgradnje').innerText = nekretnina.godina_izgradnje;
document.getElementById('lokacija').innerText = nekretnina.lokacija;
document.getElementById('datumObjave').innerText = nekretnina.datum_objave;
document.getElementById('opis').innerText = nekretnina.opis;

const upitiDiv = document.getElementById('podaci');

async function azurirajUpite(){
    PoziviAjax.getUpiti(nekretnina.id,function(err,data){
        if (err) {
            console.error(err);
        } else {
            upitiDiv.innerHTML = '';
    
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
}
azurirajUpite();

setInterval(async()=> {
    azurirajUpite();
},500);