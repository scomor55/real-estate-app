    const username = document.getElementById('username').value; 
    const password = document.getElementById('password').value; 

    PoziviAjax.postLogin(username,password,function(err,data){
        if(err){
            console.log(err);
        }else{
            window.location.href = 'http://localhost:3000/nekretnine.html';
            console.log("Redirekcija se izvršila");
            console.log(data);
        }
    });