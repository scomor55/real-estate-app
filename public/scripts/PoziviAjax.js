const PoziviAjax = (() => {

    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null

    // vraća korisnika koji je trenutno prijavljen na sistem
    function sendRequest(method, url, data, fnCallback) {
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {

            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    fnCallback(null, JSON.parse(ajax.responseText));
                } else if (ajax.status == 404) {
                    fnCallback(ajax.responseText, null);
                }
            }
        };
        ajax.open(method, url, true);

        if (method !== 'GET') {
            ajax.setRequestHeader('Content-Type', 'application/json');
        }

        ajax.send(JSON.stringify(data));
    }

    function impl_getKorisnik(fnCallback) {
        sendRequest('GET', '/korisnik', null, fnCallback);
    }

    function impl_putKorisnik(noviPodaci, fnCallback) {
        sendRequest('PUT', '/korisnik', noviPodaci, fnCallback);
    }

    function impl_postUpit(id, tekst_upita, fnCallback) {
        sendRequest('POST', '/upit', { id, tekst_upita }, fnCallback);
    }

    function impl_getNekretnine(fnCallback) {
        sendRequest('GET', '/nekretnine', null, fnCallback);
    }

    function impl_postLogin(username, password, fnCallback) {
        sendRequest('POST', '/login', { username, password }, fnCallback);
    }

    function impl_postLogout(fnCallback) {
        sendRequest('POST', '/logout', null, fnCallback);
    }

    function impl_getNekretninaById(nekretnina_id, fnCallback) {
        sendRequest('GET', `nekretnina/${nekretnina_id}`, null, fnCallback);
    }

    function impl_getUpitById(nekretnina_id, fnCallback) {
        sendRequest('GET', `nekretnine/upit/${nekretnina_id}`, null, fnCallback);
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine,
        getNekretnina: impl_getNekretninaById,
        getUpiti:impl_getUpitById,
    };
})();