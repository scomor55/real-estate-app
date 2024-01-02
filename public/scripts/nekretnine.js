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
      //  console.log(filtriraneNekretnine.length);
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

        let pretrageParagraf = document.createElement("p");
        pretrageParagraf.className = "pretrage-"+nekretnina.id;
       /* pretrageParagraf.textContent = "Pretrage: "+ nekretnina.pretrage;*/
        podaciDiv.appendChild(pretrageParagraf);

        let klikoviParagraf = document.createElement("p");
        klikoviParagraf.className = "klikovi-"+nekretnina.id;
       /* klikoviParagraf.textContent = "Klikovi: "+ nekretnina.klikovi;*/
        podaciDiv.appendChild(klikoviParagraf);

        let cijenaParagraf = document.createElement("p");
        cijenaParagraf.classList.add("cijena");
        cijenaParagraf.textContent = "Cijena: " + nekretnina.cijena + " KM";
        podaciDiv.appendChild(cijenaParagraf);

        
        let detaljiButton = document.createElement("button");
        detaljiButton.className = nekretnina.id;
        detaljiButton.textContent = "Detalji";
        podaciDiv.appendChild(detaljiButton);

        nekretninaDiv.appendChild(podaciDiv);
        nekretninaDiv.setAttribute('data-nekretnina-id',nekretnina.id);
        gridContainer.appendChild(nekretninaDiv);

    }
        divReferenca.appendChild(nekretninaHeading);
        divReferenca.appendChild(gridContainer);

        const divNekretnine = document.getElementById('divNekretnine');
        azurirajPretrage(divNekretnine);
        azurirajKlikove(divNekretnine);


        setInterval(async () => {
            const divNekretnine = document.getElementById('divNekretnine');
            azurirajPretrage(divNekretnine);
            azurirajKlikove(divNekretnine);
        }, 500);
    
}

async function azurirajPretrage(divNekretnine){
    try {
        const dataPretrage = await MarketingAjax.osvjeziPretrage(divNekretnine);
        const pretrage = dataPretrage.nizNekretnina;
    //    console.log("Data-pretrage",dataPretrage);
        console.log("Pretrage",pretrage);

        for(let element of pretrage){
            const id = element.id;
            const pretrage = element.pretrage;

            const pretrageParagraf = divNekretnine.querySelector('.pretrage-' + id);
            console.log(pretrageParagraf); 
            if (pretrageParagraf) {
                pretrageParagraf.textContent = 'Pretrage: ' + pretrage;
            }
        }
    } catch (errPretrage) {
        console.error(errPretrage);
    }
}

async function azurirajKlikove(divNekretnine){
    try {
        const dataKlikovi = await MarketingAjax.osvjeziKlikove(divNekretnine);
        const klikovi = dataKlikovi.nizNekretnina;
     //   console.log("Data-klikovi",dataKlikovi);  
     //   console.log("Klikovi",klikovi);
     for(let element of klikovi){
        const id = element.id;
        const klikovi = element.klikovi;

        const klikoviParagraf = divNekretnine.querySelector('.klikovi-' + id);
        if (klikoviParagraf) {
            klikoviParagraf.textContent = 'Klikovi: ' + klikovi;
        }
    }
       
    } catch (errKlikovi) {
        console.error(errKlikovi);
    }
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
            filtrirane.init(nekretnine.filtrirajNekretnine(kriterij));
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
        let listaId = [];
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
                
                let filterStanovi = filtriraneNekretnine.filtrirajNekretnine({ tip_nekretnine: "Stan" });
                let filterKuce = filtriraneNekretnine.filtrirajNekretnine({ tip_nekretnine: "Kuća" });
                let filterPP = filtriraneNekretnine.filtrirajNekretnine({ tip_nekretnine: "Poslovni prostor" });

                console.log("Stanovi",filterStanovi);
                console.log("Kuće",filterKuce);
                console.log("SPoslovni prostor",filterPP);

                let filteri = [];
                for(let element of filterStanovi){
                    filteri.push(element.id);
                }
                for(let element of filterKuce){
                    filteri.push(element.id); 
                }
                for(let element of filterPP){
                    filteri.push(element.id); 
                }

                console.log(filteri);

                MarketingAjax.novoFiltriranje(filteri);
             
                spojiNekretnine(divStan, filtriraneNekretnine, "Stan");
                spojiNekretnine(divKuca, filtriraneNekretnine, "Kuća");
                spojiNekretnine(divPp, filtriraneNekretnine, "Poslovni prostor");
            }
        });
        console.log("Lista ideva",listaId);

    });    

function handleDetaljiClick(nekretninaId){
    MarketingAjax.klikNekretnina(nekretninaId);
}

let posljednjaKliknutaNekretnina = null;


 document.addEventListener('click',function(event){
    if(event.target.tagName === 'BUTTON' && event.target.textContent === 'Detalji'){
        const nekretninaId = parseInt(event.target.classList[0]);

        if (posljednjaKliknutaNekretnina) {
            posljednjaKliknutaNekretnina.style.width = '';
        }

        const nekretninaDiv = event.target.closest('.nekretnina');
        if (nekretninaDiv) {
            const podaciDiv = nekretninaDiv.querySelector('.podaci');

            const detaljiButton = podaciDiv.querySelector('button');

            if (detaljiButton) {
                nekretninaDiv.style.width = '500px';
                posljednjaKliknutaNekretnina = nekretninaDiv;

                podaciDiv.style.padding = '30px';    
            }
        }
        handleDetaljiClick(nekretninaId);
    }
 });  



 

