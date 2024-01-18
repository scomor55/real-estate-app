const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.nekretnina =  require(__dirname+'/nekretnina.js')(sequelize,Sequelize.DataTypes)
db.korisnik =  require(__dirname+'/korisnik.js')(sequelize,Sequelize.DataTypes)
db.upit =  require(__dirname+'/upit.js')(sequelize,Sequelize.DataTypes)


db.nekretnina.hasMany(db.upit, {as: 'upiti'});
db.upit.belongsTo(db.nekretnina);

db.korisnik.hasMany(db.upit, { as: 'upiti' });
db.upit.belongsTo(db.korisnik);


module.exports = db;