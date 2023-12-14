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
        if(!kriterij || Object.keys(kriterij).length === 0) {
            return listaNekretnina;
        }

        let imaAtribut = false;

    for (let key in kriterij) {
        if (key === "id" || key === "tip_nekretnine" || key === "naziv" || key === "kvadratura" || key === "cijena" ||
            key === "tip_grijanja" || key === "lokacija" ||key === "godina_izgradnje" || key === "datum_objave" || key === "opis" ||key === "upiti"
    ) {
        imaAtribut = true;
        break;
    }
        }

        if (!imaAtribut) {
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
            if(nekretnina.kvadratura > kriterij.max_kvadratura ){
                continue;
            }
            if(nekretnina.cijena < kriterij.min_cijena){
                continue;
            }
            if(nekretnina.cijena > kriterij.max_cijena ){
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