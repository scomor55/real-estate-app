let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];


    //implementacija metoda
    let init = function (nekretnine, korisnici) {
         listaNekretnina = nekretnine;
         listaKorisnika = korisnici;
    }

    let filtrirajNekretnine = function (kriterij) {
        if(!kriterij) {
            return listaNekretnina;
        }

        let filtriraneNekretnine = [];

        for(let i= 0; i < listaNekretnina.length; i++){
            let nekretnina = listaNekretnina[i];
            if(nekretnina.tip_nekretnine !== kriterij.tip_nekretnine){
                continue;
            }
            if(nekretnina.kvadratura < kriterij.min_kvadratura){
                continue;
            }
            if(nekretnina.kvadratura > kriterij.max_kvadratura){
                continue;
            }
            if(nekretnina.cijena < kriterij.min_cijena){
                continue;
            }
            if(nekretnina.cijena > kriterij.max_cijena){
                continue;
            }
            filtriraneNekretnine.push(nekretnina);
        }
        return filtriraneNekretnine;
    }

    let ucitajDetaljeNekretnine = function (id) {
        for(let i = 0; i < listaNekretnina.length; i++){
            if(listaNekretnina[i].id === id){
                return listaNekretnina[i];
            }
        }
        return null;
    }


    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};