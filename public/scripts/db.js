const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.nekretnina = sequelize.import(__dirname+'/nekretnina.js');
db.korisnik = sequelize.import(__dirname+'/korisnik.js');
db.upit = sequelize.import(__dirname+'/upit.js');



module.exports = db;