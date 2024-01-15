let nekretnina = JSON.parse(localStorage.getItem('nekretnina'));


document.getElementById('naziv').innerText = nekretnina.naziv;
document.getElementById('kvadratura').innerText = nekretnina.kvadratura;
document.getElementById('cijena').innerText = nekretnina.cijena;
document.getElementById('tipGrijanja').innerText = nekretnina.tip_grijanja;
document.getElementById('godinaIzgradnje').innerText = nekretnina.godina_izgradnje;
document.getElementById('lokacija').innerText = nekretnina.lokacija;
document.getElementById('datumObjave').innerText = nekretnina.datum_objave;
document.getElementById('opis').innerText = nekretnina.opis;