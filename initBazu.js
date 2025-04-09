const db = require('./db.js')

db.sequelize.sync({force:true}).then(function(){
    inicijalizacija();
});

function inicijalizacija(){
   db.nekretnina.bulkCreate([
    {
        tip_nekretnine: "Stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 58,
        cijena: 232000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus.",
        slika: "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU"
    },
    {
        tip_nekretnine: "Poslovni prostor",
        naziv: "Mali poslovni prostor",
        kvadratura: 20,
        cijena: 70000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.orion132.com/blog/wp-content/uploads/2022/09/shutterstock_1700575657.jpg"
    },
    {
        tip_nekretnine: "Stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 58,
        cijena: 232000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus.",
        slika: "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU"
    },
    {
        tip_nekretnine: "Stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 78,
        cijena: 205000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus.",
        slika: "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU"
    },
    {
        tip_nekretnine: "Stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 101,
        cijena: 404000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus.",
        slika: "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU"
    },
    {
        tip_nekretnine: "Stan",
        naziv: "Useljiv stan Sarajevo",
        kvadratura: 39,
        cijena: 120000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "plin",
        lokacija: "Novo Sarajevo",
        godina_izgradnje: 2019,
        datum_objave: "01.10.2023.",
        opis: "Sociis natoque penatibus.",
        slika: "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU"
    },
    {
        tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 25,
    cijena: 100000,
    klikovi:0,
    pretrage:0,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    slika: "https://www.orion132.com/blog/wp-content/uploads/2022/09/shutterstock_1700575657.jpg"
},
    {
        tip_nekretnine: "Poslovni prostor",
        naziv: "Mali poslovni prostor",
        kvadratura: 74,
        cijena: 170000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.orion132.com/blog/wp-content/uploads/2022/09/shutterstock_1700575657.jpg"
    },
    {
        tip_nekretnine: "Poslovni prostor",
        naziv: "Mali poslovni prostor",
        kvadratura: 25,
        cijena: 560000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.orion132.com/blog/wp-content/uploads/2022/09/shutterstock_1700575657.jpg"
    },
    {
        tip_nekretnine: "Poslovni prostor",
        naziv: "Mali poslovni prostor",
        kvadratura: 100,
        cijena: 300000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.orion132.com/blog/wp-content/uploads/2022/09/shutterstock_1700575657.jpg"
    },
    {
        tip_nekretnine: "Kuća",
        naziv: "Kuća sa dvorištem",
        kvadratura: 300,
        cijena: 450000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.redfin.com/blog/wp-content/uploads/2021/08/220-Maryland-Ave-21122-1.jpg"
    },
    {
        tip_nekretnine: "Kuća",
        naziv: "Kuća sa dvorištem",
        kvadratura: 220,
        cijena: 330000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.redfin.com/blog/wp-content/uploads/2021/08/220-Maryland-Ave-21122-1.jpg"
    },
    {
        tip_nekretnine: "Kuća",
        naziv: "Kuća sa dvorištem",
        kvadratura: 400,
        cijena: 500000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.redfin.com/blog/wp-content/uploads/2021/08/220-Maryland-Ave-21122-1.jpg"
    },
    {
        tip_nekretnine: "Kuća",
        naziv: "Kuća sa dvorištem",
        kvadratura: 170,
        cijena: 220000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.redfin.com/blog/wp-content/uploads/2021/08/220-Maryland-Ave-21122-1.jpg"
    },
    {
        tip_nekretnine: "Kuća",
        naziv: "Kuća sa dvorištem",
        kvadratura: 270,
        cijena: 350000,
        klikovi:0,
        pretrage:0,
        tip_grijanja: "struja",
        lokacija: "Centar",
        godina_izgradnje: 2005,
        datum_objave: "20.08.2023.",
        opis: "Magnis dis parturient montes.",
        slika: "https://www.redfin.com/blog/wp-content/uploads/2021/08/220-Maryland-Ave-21122-1.jpg"
    }
]).then(() => {
    console.log('Podaci uspješno uneseni!');
}).catch((err) => {
    console.log('Greška prilikom unosa podataka: ', err);
});

db.korisnik.bulkCreate([
    {
        ime: "Neko",
        prezime: "Nekić",
        username: "username1",
        password: "$2b$10$H/tGxAklLjgjj1eK2GYZ3.FfsohKim420uEGY3MkjoAe5cSmQU74C",
        slika: "slika" 
    },
    {
        ime: "Svako2",
        prezime: "Svakić2",
        username: "username",
        password: "$2b$10$kEwkJRtnBPdvDpzXWxO0beCxNbfYmwsIpKj2/.GHNlxbznH03nKoa",
        slika: "slika"
    }
]).then(() => {
    console.log('Podaci uspješno uneseni!');
}).catch((err) => {
    console.log('Greška prilikom unosa podataka: ', err);
});

db.upit.bulkCreate([
    {
        korisnikId: 1,
        nekretninaId:1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnikId: 2,
        nekretninaId:1,
        tekst_upita: "Phasellus viverra nulla."
    }
]).then(() => {
    console.log('Podaci uspješno uneseni!');
}).catch((err) => {
    console.log('Greška prilikom unosa podataka: ', err);
});
}
