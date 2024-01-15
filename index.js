const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./public/scripts/db.js')

const app = express();
app.use(express.static("public"));
app.use(express.static("public/html"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ strict: false }));


app.use(session({
    secret: 'tajna', 
    resave: true,
    saveUninitialized: true,
  }));


app.post('/login',async function(req,res){
    const {username , password} = req.body;

    try{
        const korisnik = await db.korisnik.findOne({ where: { username: username } });
        if(korisnik){
            bcrypt.compare(password, korisnik.password, (err, result) => {
                if(result){
                    req.session.username = username;
                    return res.status(200).json({poruka: "Uspješna prijava"});
                }else {
                    return res.status(401).json({greska : 'Neuspješna prijava'});
                }
            });
        }else{
            return res.status(401).json({greska: 'Neuspješna prijava'});
        }

    }catch(err){
        return res.status(500).json({greska: 'Interna greška servera'});
    }
    
 } );


 app.post('/logout',(req,res)=>{
    if(!req.session.username || !req.session){
        return res.status(401).json({greska: 'Neautorizovan pristup'});
    }

    req.session.destroy((err)=>{
        if(err){
        console.error('Došlo je do greške prilikom odjave korisnika:', err);
        return res.status(500).json({greska: 'Interna greska servera'});
        }
        return res.status(200).json({poruka: 'Uspjesno ste se odjavili'});
    });
 });

 app.get('/korisnik',async (req,res)=>{
    if(!req.session.username){
        return res.status(401).json({ greska: 'Neautorizovan pristup'});
    }
        try{
            const korisnik =await db.korisnik.findOne({ where: { username: req.session.username } });

            if(korisnik){
                const {id , ime , prezime , username , password , slika} = korisnik;
                return res.status(200).json({id,ime,prezime,username,password,slika});
            }else {
                return res.status(500).json({greska: 'Neispravni korisnicki podaci'});
            }
        }catch(err){
            return res.status(500).json({greska: 'Interna greška servera'});
        }

 });


 app.post('/upit',async (req,res)=>{
    if(!req.session.username){
        return res.status(401).json({greska: 'Neautorizovan pristup'});
    }
    const {id,tekst_upita} = req.body;
    if(!id || !tekst_upita){
        return res.status(400).json({greska: 'Nedostaju neophodni podaci'});
    }
        
        try{
            const trenutniKorisnik = await db.korisnik.findOne({ where: { username: req.session.username } });


            if(!trenutniKorisnik){
                return res.status(500).json({greska: 'Neispravni korisnicki podaci'});
            }

            const trazenaNekretnina = await db.nekretnina.findOne({ where: { id: id } });

            if (!trazenaNekretnina) {
                return res.status(400).json({ greska: `Nekretnina sa id-em ${id} ne postoji` });
            }

            const noviUpit = {
                nekretninaId:id,
                korisnikId: trenutniKorisnik.id,
                tekst_upita: tekst_upita,
            };
    
            await db.upit.create(noviUpit);
            return res.status(200).json({ poruka: 'Upit je uspješno dodan' });

        }catch(errKorisnici){
            return res.status(500).json({greska : 'Interna greška servera'});
        }
    
 });

 app.put('/korisnik',async (req,res)=>{
    if(!req.session.username){
        return res.status(401).json({greska: 'Neautorizovan pristup'});
    }
    const {ime,prezime,username,password} = req.body;

    try {
        const trenutniKorisnik = await db.korisnik.findOne({
            where: { username: req.session.username }
        });

        if (!trenutniKorisnik) {
            return res.status(500).json({ greska: 'Neispravni korisnički podaci' });
        }

        if (ime) {
            trenutniKorisnik.ime = ime;
        }

        if (prezime) {
            trenutniKorisnik.prezime = prezime;
        }

        if (username) {
            trenutniKorisnik.username = username;
        }

        if (password) {
            const hash = await bcrypt.hash(password, 10);
            trenutniKorisnik.password = hash;
        }

        await trenutniKorisnik.save();

        return res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ greska: 'Interna greška servera' });
    }
 });


 app.get('/nekretnine',async (req,res) => {
    try {
        const nekretnine = await db.nekretnina.findAll();
        return res.status(200).json(nekretnine);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ greska: 'Interna greška servera' });
    }
 });


 // Marketing


app.post('/marketing/nekretnine',async(req, res) => {
 //  console.log("Tijelo zahtjeva",req.body);
    try{
        const nekretnine = await db.nekretnina.findAll({
            where:{
                id:req.body.filtriraneNekretnine
            }
        });
        for (let i = 0; i < nekretnine.length; i++) {
            nekretnine[i].pretrage = nekretnine[i].pretrage + 1;
            await nekretnine[i].save();
        }

        return res.status(200).json({ poruka: 'Podaci o nekretninama su ažurirani'});
    }catch (err) {
        console.error('Greška prilikom izvršavanja zahtjeva:', err);
        return res.status(500).json({ greska: 'Interna greska servera' });
    }

});

 app.post('/marketing/nekretnina/:id',async (req,res)=>{
        const nekretninaID = req.params.id;
        try {
            const nekretnina = await db.nekretnina.findByPk(nekretninaID);
            if (!nekretnina) {
                return res.status(404).json({ greska: 'Nekretnina nije pronađena' });
            }
            nekretnina.klikovi = nekretnina.klikovi + 1;
            await nekretnina.save();
            return res.status(200).json({ poruka: 'Podaci o nekretninama su ažurirani' });
        } catch (err) {
            console.error('Greška prilikom izvršavanja zahtjeva:', err);
            return res.status(500).json({ greska: 'Interna greska servera' });
        }
 });

 app.post('/marketing/osvjezi', async (req, res) => {
    const nizNekretnina = req.body.nizNekretnina;

    try {
        const marketingPodaci = await db.nekretnina.findAll({
            where: {
                id: nizNekretnina.map((nekretnina) => nekretnina.id)
            }
        });
        nizNekretnina.forEach((novaNekretnina) => {
            const trenutnaNekretnina = marketingPodaci.find((data) => data.id === novaNekretnina.id);

            if (trenutnaNekretnina) {
                trenutnaNekretnina.klikovi = novaNekretnina.klikovi;
                trenutnaNekretnina.pretrage = novaNekretnina.pretrage;
                trenutnaNekretnina.save(); 
            }
        });

        return res.status(200).json({ nizNekretnina: marketingPodaci });
    } catch (error) {
        console.error('Greška prilikom osvježavanja podataka:', error);
        return res.status(500).json({ greska: 'Greška prilikom osvježavanja podataka.' });
    }
});

app.listen(3000)
