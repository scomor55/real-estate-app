const MarketingAjax = (() => {

    const BASE_URL = "/marketing";

    function sendRequest(url, method, data) {
        return new Promise((resolve, reject) => {
            const ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function () {
                if(ajax.readyState == 4){
                    if (ajax.status == 200) {
                        resolve(JSON.parse(ajax.responseText));
                    } else if (ajax.status == 404){
                        reject(ajax.responseText);
                    }
                }
            };
    
            ajax.open(method, url, true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify(data));
        });
    }


    function osvjeziPretrage(divNekretnina) {
        const url = 'marketing/osvjezi';
        
        const nekretnineDivs = divNekretnina.querySelectorAll('.nekretnina');
        const nizIdova = Array.from(nekretnineDivs).map(nekretninaDiv => parseInt(nekretninaDiv.getAttribute('data-nekretnina-id')));
    
        return sendRequest(url, "POST", { nizNekretnina: nizIdova });
    }

    function osvjeziKlikove(divNekretnina) {
        return osvjeziPretrage(divNekretnina);
    }

    function novoFiltriranje(filtriraneNekretnine) {
        const url = `${BASE_URL}/nekretnine`;
        return sendRequest(url, "POST", { filtriraneNekretnine });
    }

    function klikNekretnina(nekretninaId) {
        const url = `marketing/nekretnina/${nekretninaId}`;
        return sendRequest(url, "POST", { nekretninaId });
    }

    return {
        osvjeziPretrage,
        osvjeziKlikove,
        novoFiltriranje,
        klikNekretnina
    };
})();