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

    }

        divReferenca.appendChild(gridContainer);

}



const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");




const getNekretnineAsync = () => {
    return new Promise((resolve, reject) => {
        PoziviAjax.getNekretnine((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

let listaNekretnina;
getNekretnineAsync()
    .then((data) => {
        listaNekretnina = data;
        console.log("Podaci uspješno dohvaćeni:", listaNekretnina);
    })
    .catch((error) => {
        console.log("Greška pri dohvaćanju podataka:", error);
    });

console.log(listaNekretnina);

//    PoziviAjax.getNekretnine(function(error, nekretnine, status) {
//        if (error) {
//            console.error('Greška prilikom dobavljanja nekretnina sa servera:', error);
//        } else {
//            if (status === 200) {
//                // U redu, podaci su uspješno dohvaćeni
//                listaNekretnina = nekretnine;
//            } else {
//                console.error('Greška prilikom dohvaćanja nekretnina. Statusni kod:', status);
//            }
//        }
//    });

//instanciranje modula
let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina);

//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
