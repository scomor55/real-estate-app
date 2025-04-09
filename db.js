const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","root",{host:"mysql-db",dialect:"mysql",port:"3306",logging:false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.nekretnina =  require(__dirname+'/public/scripts/nekretnina.js')(sequelize,Sequelize.DataTypes)
db.korisnik =  require(__dirname+'/public/scripts/korisnik.js')(sequelize,Sequelize.DataTypes)
db.upit =  require(__dirname+'/public/scripts/upit.js')(sequelize,Sequelize.DataTypes)


db.nekretnina.hasMany(db.upit, {as: 'upiti'});
db.upit.belongsTo(db.nekretnina);

db.korisnik.hasMany(db.upit, { as: 'upiti' });
db.upit.belongsTo(db.korisnik);


module.exports = db;