function spojiNekretnine(divReferenca, instancaModula, kriterij) {
    // pozivanje metode za filtriranje
    let filtriraneNekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: kriterij });
    //let filtriraneNekretnine = instancaModula.filtrirajNekretnine(tip_nekretnine);
    //let gridContainer = divReferenca.querySelector(".grid-container");
    // iscrtavanje elemenata u divReferenca element

    let nekretninaHeading = document.createElement("h2");

    if (kriterij === "Stan") {
        nekretninaHeading.textContent = "Stanovi";
    } else if (kriterij === "Kuća") {
        nekretninaHeading.textContent = "Kuće";
    } else if (kriterij === "Poslovni prostor") {
        nekretninaHeading.textContent = "Poslovni prostori";
    } else {
        nekretninaHeading.textContent = "Nekretnine";
    }

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
        divReferenca.appendChild(nekretninaHeading);
        divReferenca.appendChild(gridContainer);

}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");



   PoziviAjax.getNekretnine(function(error, data) {
        if (error) {
            console.error('Greška prilikom dobavljanja nekretnina sa servera:', error);
        } else {
            listaNekretnina = data;
            let nekretnine = SpisakNekretnina();
            nekretnine.init(listaNekretnina);

            let kriterij = {

            };
            let filtrirane = SpisakNekretnina();
       //     filtrirane = nekretnine.filtrirajNekretnine(kriterij);
            filtrirane.init(nekretnine.filtrirajNekretnine(kriterij));
       //     console.log("Filtrirane ",filtrirane);
       //     console.log("Nefiltrirane",nekretnine);
            spojiNekretnine(divStan, nekretnine, "Stan");
            spojiNekretnine(divKuca, nekretnine, "Kuća");
            spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
        }
    });



const filtrirajBtn = document.getElementById("filtrirajBtn");

    document.getElementById("filtrirajBtn").addEventListener("click", function () {
        let minCijena = parseFloat(document.getElementById("minCijena").value) || 0;
        let maxCijena = parseFloat(document.getElementById("maxCijena").value) || Infinity;
        let minKvadratura = parseFloat(document.getElementById("minKvadratura").value) || 0;
        let maxKvadratura = parseFloat(document.getElementById("maxKvadratura").value) || Infinity;
    
        let kriterij = {
            min_cijena: minCijena,
            max_cijena: maxCijena,
            min_kvadratura: minKvadratura,
            max_kvadratura: maxKvadratura
        };
    
        PoziviAjax.getNekretnine(function (error, data) {
            if (error) {
                console.error('Greška prilikom dobavljanja nekretnina sa servera:', error);
            } else {
                listaNekretnina = data;
                let nekretnine = SpisakNekretnina();
                nekretnine.init(listaNekretnina);
    
                // Očisti stari sadržaj prije dodavanja novog
                divStan.innerHTML = '';
                divKuca.innerHTML = '';
                divPp.innerHTML = '';
    
                // Filtriraj nekretnine
                let filtriraneNekretnine = SpisakNekretnina();
                filtriraneNekretnine.init(nekretnine.filtrirajNekretnine(kriterij));

                spojiNekretnine(divStan, filtriraneNekretnine, "Stan");
                spojiNekretnine(divKuca, filtriraneNekretnine, "Kuća");
                spojiNekretnine(divPp, filtriraneNekretnine, "Poslovni prostor");
            }
        });
    });    

