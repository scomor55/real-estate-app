const MarketingAjax = (() => {

    const BASE_URL = "/marketing";
    function osvjeziPretrage(divNekretnina){
        const url = 'marketing/osvjezi';
        const ajax = new XMLHttpRequest();
    
        return new Promise((resolve, reject) => {
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
        //             console.log("Ono sto dodje u marketing:", ajax.responseText);
                        resolve(JSON.parse(ajax.responseText));
                    } else if (ajax.status == 404) {
                        reject(ajax.responseText);
                    }
                }
            };
    
            const nekretnineDivs = divNekretnina.querySelectorAll('.nekretnina');
            const nizIdova = Array.from(nekretnineDivs).map(nekretninaDiv => {
                return parseInt(nekretninaDiv.getAttribute('data-nekretnina-id'));
            });
    
       //     console.log("Niz koji se salje iz marketinga", nizIdova);
    
            ajax.open("POST", url, true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify({ nizNekretnina: nizIdova }));
        });
    };
    
    function osvjeziKlikove(divNekretnina){
        const url = 'marketing/osvjezi';
        const ajax = new XMLHttpRequest();
    
        return new Promise((resolve, reject) => {
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        resolve(JSON.parse(ajax.responseText));
                    } else if (ajax.status == 404) {
                        reject(ajax.responseText);
                    }
                }
            };
    
            const nekretnineDivs = divNekretnina.querySelectorAll('.nekretnina');
            const nizIdova = Array.from(nekretnineDivs).map(nekretninaDiv => {
                return parseInt(nekretninaDiv.getAttribute('data-nekretnina-id'));
            });
    
        //    console.log("Niz koji se salje iz marketinga", nizIdova);
    
            ajax.open("POST", url, true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify({ nizNekretnina: nizIdova }));
        });
    };

    function novoFiltriranje(filtriraneNekretnine){
        const url = `${BASE_URL}/nekretnine`;

        return new Promise((resolve, reject) => {
            const ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        resolve(JSON.parse(ajax.responseText));
                    } else if (ajax.status == 404) {
                        reject(ajax.responseText);
                    }
                }
            };
            ajax.open("POST", url, true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify({ filtriraneNekretnine }));
        });
    };

    function klikNekretnina(nekretninaId){
        const url = `marketing/nekretnina/${nekretninaId}`;
        return new Promise((resolve, reject) => {
            const ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4) {
                    if (ajax.status == 200) {
                        resolve(JSON.parse(ajax.responseText));
                    } else if (ajax.status == 404) {
                        reject(ajax.responseText);
                    }
                }
            };
            ajax.open("POST", url, true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify({ nekretninaId }));
        });
    };

    return {
        osvjeziPretrage,
        osvjeziKlikove,
        novoFiltriranje,
        klikNekretnina
    };
})();