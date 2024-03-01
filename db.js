const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
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