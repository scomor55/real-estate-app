function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje

    let filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

    //let gridContainer = divReferenca.querySelector(".grid-container");
    // iscrtavanje elemenata u divReferenca element

    let gridContainer = document.createElement("div");
    gridContainer.className = "grid-container";

    for(let nekretnina of filtriraneNekretnine){
        let nekretninaDiv = document.createElement("div");
        
        nekretninaDiv.className="nekretnina";

        let slika = document.createElement("img");
        slika.src = nekretnina.slika;
        slika.alt = nekretnina.naziv;
        nekretninaDiv.appendChild(slika);

        let podaciDiv = document.createElement("div");
        podaciDiv.className = "podaci";

        let nazivParagraf = document.createElement("p");
        nazivParagraf.textContent = "Naziv: "+ nekretnina.naziv;
        podaciDiv.appendChild(nazivParagraf);

        let kvadraturaParagraf = document.createElement("p");
        kvadraturaParagraf.textContent = "Kvadratura: " + nekretnina.kvadratura + " m²";
        podaciDiv.appendChild(kvadraturaParagraf);

        let cijenaParagraf = document.createElement("p");
        cijenaParagraf.classList.add("cijena");
        cijenaParagraf.textContent = "Cijena: " + nekretnina.cijena + " KM";
        podaciDiv.appendChild(cijenaParagraf);

        let detaljiButton = document.createElement("button");
        detaljiButton.textContent = "Detalji";
        podaciDiv.appendChild(detaljiButton);

        nekretninaDiv.appendChild(podaciDiv);

        gridContainer.appendChild(nekretninaDiv);
       // divReferenca.appendChild(nekretninaDiv); 

    }

        divReferenca.appendChild(gridContainer);

}

document.addEventListener("DOMContentLoaded", function() {

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

const listaNekretnina = [{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    slika: "../slike/stan.jpg",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 2,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/poslovni.png",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 3,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    slika: "../slike/stan.jpg",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},{
    id: 4,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    slika: "../slike/stan.jpg",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},{
    id: 5,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    slika: "../slike/stan.jpg",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},{
    id: 6,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    slika: "../slike/stan.jpg",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 7,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/poslovni.png",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 8,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/poslovni.png",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 9,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/poslovni.png",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 10,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/poslovni.png",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},{
    id: 11,
    tip_nekretnine: "Kuća",
    naziv: "Kuća sa dvorištem",
    kvadratura: 20,
    cijena: 220000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/kuca.jpg",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},{
    id: 12,
    tip_nekretnine: "Kuća",
    naziv: "Kuća sa dvorištem",
    kvadratura: 20,
    cijena: 220000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/kuca.jpg",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},{
    id: 13,
    tip_nekretnine: "Kuća",
    naziv: "Kuća sa dvorištem",
    kvadratura: 20,
    cijena: 220000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/kuca.jpg",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},{
    id: 14,
    tip_nekretnine: "Kuća",
    naziv: "Kuća sa dvorištem",
    kvadratura: 20,
    cijena: 220000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/kuca.jpg",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},{
    id: 15,
    tip_nekretnine: "Kuća",
    naziv: "Kuća sa dvorištem",
    kvadratura: 20,
    cijena: 220000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "../slike/kuca.jpg",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
}
]

const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
},
{
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
}]

//instanciranje modula
let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);

//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

});