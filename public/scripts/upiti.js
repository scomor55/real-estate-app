const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Upit = sequelize.define("upit",{
        nekretninaId:Sequelize.INTEGER,
        korisnikId:Sequelize.INTEGER,
        tekst_upita:Sequelize.STRING
    })
    return Upit;
};