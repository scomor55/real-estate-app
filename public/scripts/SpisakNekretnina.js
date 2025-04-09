let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];


    //implementacija metoda
    let init = function (nekretnine) {
         listaNekretnina = nekretnine;
    }

    let filtrirajNekretnine = function (kriterij) {
        if(!kriterij || Object.keys(kriterij).length === 0) {
            return listaNekretnina;
        }

        let imaAtribut = false;

    for (let key in kriterij) {
        if (key === "id" || key === "tip_nekretnine" || key === "naziv" || key === "kvadratura" || key === "cijena" ||
            key === "tip_grijanja" || key === "lokacija" ||key === "godina_izgradnje" || key === "datum_objave" || key === "opis" ||key === "upiti" || 
            key === "min_kvadratura" || key === "max_kvadratura" || key === "min_cijena" || key === "max_cijena"
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
           // console.log("Bio sammm ovdjeeeee");

            if(kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine){
            //    console.log("Nije zadovoljen tip_nekretnine condition");
                continue;
            }
            if(kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura){
            //    console.log("Nije zadovoljen maxkvadratura condition");
                continue;
            }
            if(kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura ){
            //    console.log("Nije zadovoljen minkvadratura condition");
                continue;
            }
            if(kriterij.min_cijena && nekretnina.cijena < kriterij.min_cijena){
            //    console.log("Nije zadovoljen mincijena condition");
                continue;
            }
            if(kriterij.max_cijena && nekretnina.cijena > kriterij.max_cijena ){
              //  console.log("Nije zadovoljen maxcijena condition");
                continue;
            }
           // console.log("Filtriraaaaan sammm");
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