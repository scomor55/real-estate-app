const MarketingAjax = (() => {

    const BASE_URL = "/marketing";
    const osvjeziPretrage = async(divNekretnina,fnCallback) => {
    
        //    const url = `${BASE_URL}/osvjezi`;
            const url = 'marketing/osvjezi';
            const ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4 && ajax.status == 200){
                    fnCallback(null, JSON.parse(ajax.responseText));
                }
                if(ajax.readyState == 4 && ajax.status == 404) {
                    fnCallback(ajax.responseText, null);
                }
            };

            const nekretnineDivs = divNekretnina.querySelectorAll('.nekretnina');
            const nizIdova = Array.from(nekretnineDivs).map(nekretninaDiv =>{
                return parseInt(nekretninaDiv.getAttribute('data-nekretnina-id'));
            });
    
            console.log("Niz koji se salje iz marketinga",nizIdova); 
            
        ajax.open("POST",url,true);
        ajax.setRequestHeader("Content-Type","application/json");
        console.log("Niz koji se salje",nekretninaId);
        ajax.send(JSON.stringify({ nizNekretnina: nizIdova }));
    };

    const osvjeziKlikove = (divNekretnina,fnCallback) =>{
    //    const url = `${BASE_URL}/klikovi`;
        const url = 'marketing/osvjezi';
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };

        const nekretnineDivs = divNekretnina.querySelectorAll('.nekretnina');
        const nizIdova = Array.from(nekretnineDivs).map(nekretninaDiv =>{
            return parseInt(nekretninaDiv.getAttribute('data-nekretnina-id'));
        });

        console.log("Niz koji se salje iz marketinga",nizIdova);

        ajax.open("POST",url,true);
        ajax.setRequestHeader("Content-Type","application/json");
        ajax.send(JSON.stringify({ nizNekretnina: nizIdova }));
    };

    const novoFiltriranje = (filtriraneNekretnine,fnCallback)=>{
        const url = `marketing/nekretnine`;
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open("POST",url,true);
        ajax.setRequestHeader("Content-Type","application/json");
        console.log("Lista filtriranih nekretnina",filtriraneNekretnine);
        ajax.send(JSON.stringify({filtriraneNekretnine}));
    }

    const klikNekretnina = (nekretninaId, fnCallback)=>{
        const url = `marketing/nekretnina/${nekretninaId}`;
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200){
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            if(ajax.readyState == 4 && ajax.status == 404) {
                fnCallback(ajax.responseText, null);
            }
        };
        ajax.open("POST",url.replace(":id", nekretninaId),true);
        ajax.setRequestHeader("Content-Type","application/json");
        ajax.send(JSON.stringify(nekretninaId));
    }

    return {
        osvjeziPretrage,
        osvjeziKlikove,
        novoFiltriranje,
        klikNekretnina
    };
})();