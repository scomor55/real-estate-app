const PoziviAjax = (() => {

    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null

    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open('GET','/korisnik',true);
        ajax.send();
    }

    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open('PUT','/korisnik',true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send(JSON.stringify(noviPodaci));
    }

    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open('POST','/upit',true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send(JSON.stringify({nekretnina_id,tekst_upita}));
    }

    function impl_getNekretnine(fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open('GET','/nekretnine',true);
        ajax.send();
    }

    function impl_postLogin(username, password, fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                console.log("Redirekcija se izvršava");
                window.location.href = '../html/nekretnine.html';
                console.log("Redirekcija se izvršila");
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open('POST','/login',true);
        ajax.setRequestHeader('Content-Type','application/json');
        ajax.send(JSON.stringify({username,password}));
    }

    function impl_postLogout(fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open('POST','/logout',true);
        ajax.send();
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine
    };
})();