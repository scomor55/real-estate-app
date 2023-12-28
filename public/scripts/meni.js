function SpojiMeni(divReferenca){
    let lista = document.createElement("ul");
    lista.className = "meni";


    let element2 = document.createElement("li");
    var strongElement2 = document.createElement('strong');
    var linkElement2 = document.createElement('a');

    linkElement2.textContent = "Nekretnine";
    linkElement2.setAttribute('href','nekretnine.html');
    linkElement2.setAttribute('target','_top');
    strongElement2.appendChild(linkElement2);
    element2.appendChild(strongElement2);
    lista.appendChild(element2);

    let element3 = document.createElement("li");
    var strongElement3 = document.createElement('strong');
    var linkElement3 = document.createElement('a');

    linkElement3.textContent = "Detalji";
    linkElement3.setAttribute('href','detalji.html');
    linkElement3.setAttribute('target','_top');
    strongElement3.appendChild(linkElement3);
    element3.appendChild(strongElement3);
    lista.appendChild(element3);

    let element4 = document.createElement("li");
    var strongElement4 = document.createElement('strong');
    var linkElement4 = document.createElement('a');
    linkElement4.textContent = "Prijava";
    linkElement4.setAttribute('href','prijava.html');
    linkElement4.setAttribute('target','_top');
        PoziviAjax.getKorisnik(function (err, data) {
        if(err){
            linkElement4.textContent = "Prijava";

        }
        if (data){
            let element1 = document.createElement("li");
            var strongElement1 = document.createElement('strong');
            var linkElement1 = document.createElement('a');

            linkElement1.textContent = "Profil";
            linkElement1.setAttribute('href','profil.html');
            linkElement1.setAttribute('target','_top');
            strongElement1.appendChild(linkElement1);
            element1.appendChild(strongElement1);
            lista.appendChild(element1);

            lista.insertBefore(element1, lista.firstChild);

            linkElement4.textContent = "Odjava";
            linkElement4.addEventListener('click', function() {
                
                PoziviAjax.postLogout(function(err,data){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Korisnik je odjavljen");
                    }
                });

                console.log("Kliknuli ste na Odjava");
            });
        }
    });
    strongElement4.appendChild(linkElement4);
    element4.appendChild(strongElement4);
    lista.appendChild(element4);

divReferenca.appendChild(lista);
} 

const divWrapper = document.getElementById("wrapper");
SpojiMeni(divWrapper);