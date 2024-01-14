const db = require('./db.js')

db.sequelize.sync({force:true}).then(function(){
    inicijalizacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicijalizacija(){
    db.nekretnina.sync().then((data)=>{
      console.log("Tabela sync uspjesno kreirana");  
    }).catch((err)=>{
        console.log("Greska pri kreiranju tabele");
    });
}