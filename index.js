const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

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


app.post('/login',function(req,res){
    const {username , password} = req.body;
    const putanja = path.join(__dirname,'/data/korisnici.json');

    fs.readFile(putanja,'utf8' , function(err,data){
        if(err){
            console.error('Doslo je do greske pri citanju korisnickih podataka');
            return res.status(500).json({greska: 'Interna greška servera'});
        }
        try{

            const korisnici = JSON.parse(data);
            const korisnik = korisnici.find(user => user.username === username );

            if(korisnik){
                bcrypt.compare(password,korisnik.password,(err,result)=>{
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
            console.error('Došlo je do greške pri parsiranju korisničkih podataka:', error);
            return res.status(500).json({ greska: 'Interna greška servera' });
        }

    });

    
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

 app.get('/korisnik',(req,res)=>{
    if(!req.session.username){
        return res.status(401).json({ greska: 'Neautorizovan pristup'});
    }
    const putanja = path.join(__dirname,'/data/korisnici.json');

    fs.readFile(putanja,'utf8',(err,data)=>{
        if(err){
            return res.status(500).json({greska: 'Interna greska servera'});
        }

        try{
            const korisnici = JSON.parse(data);
            const korisnik = korisnici.find(user => user.username === req.session.username);

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
 });


 app.post('/upit',(req,res)=>{
    if(!req.session.username){
        return res.status(401).json({greska: 'Neautorizovan pristup'});
    }
    const {id,tekst_upita} = req.body;
    if(!id || !tekst_upita){
        return res.status(400).json({greska: 'Nedostaju neophodni podaci'});
    }
    const putanjaKorisnici = path.join(__dirname,'/data/korisnici.json');
    fs.readFile(putanjaKorisnici,'utf8',(errKorisnici,dataKorisnici)=>{
        if(errKorisnici){
            return res.status(500).json({greska: 'Interna greska servera'});
        }
        try{
            const korisnici = JSON.parse(dataKorisnici);
            const trenutniKorisnik = korisnici.find(user => user.username === req.session.username);

            if(!trenutniKorisnik){
                return res.status(500).json({greska: 'Neispravni korisnicki podaci'});
            }

            const putanjaNekretnine = path.join(__dirname,'/data/nekretnine.json');
            fs.readFile(putanjaNekretnine,'utf8',(errNekretnine,dataNekretnine)=>{
                if(errNekretnine){
                    return res.status(500).json({greska: 'Interna greska servera'});
                }
                try{
                    const nekretnine = JSON.parse(dataNekretnine);
                    const trazenaNekretnina = nekretnine.find(nekretnina => nekretnina.id === id);

                    if(!trazenaNekretnina){
                        console.log(id);
                        return res.status(400).json({greska: `Nekretnina sa id-em ${id} ne postoji`});
                    }
                    if(!trazenaNekretnina.upiti){
                        trazenaNekretnina.upiti = [];
                    }

                    trazenaNekretnina.upiti.push({
                        korisnik_id: trenutniKorisnik.id,
                        tekst_upita: tekst_upita,
                    });
                    fs.writeFile(putanjaNekretnine,JSON.stringify(nekretnine,null,2),(errWrite)=>{
                        if(errWrite){
                            return res.status(500).json({greska:'Interna greska servera'});
                        }
                        return res.status(200).json({poruka: 'Upit je uspješno dodan'});
                    });
                }catch(errNekretnine){
                    return res.status(500).json({greska : 'Interna greška servera'});
                }
            });
        }catch(errKorisnici){
            return res.status(500).json({greska : 'Interna greška servera'});
        }
    });
 });

 app.put('/korisnik',(req,res)=>{
    if(!req.session.username){
        return res.status(401).json({greska: 'Neautorizovan pristup'});
    }
    const {ime,prezime,username,password} = req.body;
    const putanjaKorisici = path.join(__dirname,'/data/korisnici.json');

    fs.readFile(putanjaKorisici,'utf8',(errKorisnici,dataKorisnici)=>{
        if(errKorisnici){
            return res.status(500).json({greska : 'Interna greska servera'});
        }
        try{
            const korisnici = JSON.parse(dataKorisnici);
            const trenutniKorisnik = korisnici.find(user => user.username === req.session.username);

            if(!trenutniKorisnik){
                return res.status(500).json({greska : 'Neispravni korisnicki podaci'});
            }
            if(ime){
                trenutniKorisnik.ime = ime;
            }
            if(prezime){
                trenutniKorisnik.prezime = prezime;
            }
            if(username){
                trenutniKorisnik.username = username;
            }
            if(password){
                bcrypt.hash(password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({greska: 'Interna greska servera'});
                    }
                    trenutniKorisnik.password = hash;

                    fs.writeFile(putanjaKorisici,JSON.stringify(korisnici,null,2),(errWrite)=>{
                        if(errWrite){
                            return res.status(500).json({ greska: 'Interna greska servera'});
                        }
                        return res.status(200).json({poruka: 'Podasi su uspješno ažurirani'});
                    });
                });
            }else{
                fs.writeFile(putanjaKorisici,JSON.stringify(korisnici,null,2),(errWrite)=>{
                    if(errWrite){
                        return res.status(500).json({ greska: 'Interna greska servera'});
                    }
                    return res.status(200).json({poruka: 'Podaci su uspješno ažurirani'});
                });
            }
        }catch(err){
            return res.status(500).json({greska: 'Interna greska servera'});
        }
    });
 });


 app.get('/nekretnine',(req,res) => {
    const putanja = path.join(__dirname,'/data/nekretnine.json');
    fs.readFile(putanja,'utf8',(err,data)=>{
       if(err){
            return res.status(500).json({greska : 'Interna greska servera'});
        }
            const nekretnine = JSON.parse(data);
            return res.status(200).json(nekretnine);
    });
 });


 // Marketing
 /*app.post('/marketing/nekretnine', (req, res) => {
    const nizNekretnina = req.body;
    const putanjaNekretnine = path.join(__dirname, '/public/data/nekretnine.json');

    console.log("Niz koji stigne u index ",nizNekretnina);
});*/


app.post('/marketing/nekretnine', (req, res) => {
   console.log("Tijelo zahtjeva",req.body);
    const putanjaNekretnine = path.join(__dirname, '/data/marketing.json');
    fs.readFile(putanjaNekretnine, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ greska: 'Interna greska servera' });
        }
     //   console.log("Bio sam ovdje");
        try {
            let nekretnine = JSON.parse(data);
            for (let i = 0; i < nekretnine.length; i++) {
                let found = false;
                for (let j = 0; j < req.body.filtriraneNekretnine.length; j++) {
                    if (req.body.filtriraneNekretnine[j] === nekretnine[i].id) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    nekretnine[i].pretrage = nekretnine[i].pretrage + 1;
                    console.log("Pronadjen");
                }
            }
            fs.writeFile(putanjaNekretnine, JSON.stringify(nekretnine, null, 2), (errWrite) => {
                if (errWrite) {
                    return res.status(500).json({ greska: 'Interna greska servera' });
                }
                return res.status(200).json({ poruka: 'Podaci o nekretninama su ažurirani' });
            });
        } catch (err) {
            console.error('Greška prilikom izvršavanja zahtjeva:', err);
            return res.status(500).json({ greska: 'Interna greska servera' });
        }
    });
    
});

 app.post('/marketing/nekretnina/:id',async (req,res)=>{
        const nekretninaID = req.params.id;
        const putanjaNekretnine = path.join(__dirname, '/data/marketing.json');
        fs.readFile(putanjaNekretnine, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ greska: 'Interna greska servera' });
            }
        try{
            let nekretnine = JSON.parse(data);
            for (let i = 0; i < nekretnine.length; i++){
                if(nekretnine[i].id == nekretninaID){
                    nekretnine[i].klikovi = nekretnine[i].klikovi + 1;
                    break;
                }
            }
            fs.writeFile(putanjaNekretnine, JSON.stringify(nekretnine, null, 2), (errWrite) => {
                if (errWrite) {
                    return res.status(500).json({ greska: 'Interna greska servera' });
                }
                return res.status(200).json({ poruka: 'Podaci o nekretninama su ažurirani' });
            });
        } catch (err) {
            console.error('Greška prilikom izvršavanja zahtjeva:', err);
            return res.status(500).json({ greska: 'Interna greska servera' });
        }

        });  
 });

 app.post('/marketing/osvjezi',async (req,res)=>{
    const nizNekretnina = req.body.nizNekretnina;
    const putanjaNekretnine = path.join(__dirname, '/data/nekretnine.json');
    const putanjaMarketing = path.join(__dirname,'/data/marketing.json');

    const nekretnine = JSON.parse(fs.readFileSync(putanjaNekretnine,'utf8'));
    const marketingPodaci = JSON.parse(fs.readFileSync(putanjaMarketing,'utf8'));

    const promjene = [];
    
    nizNekretnina.forEach(nekretninaID =>{
        const staraNekretnina = marketingPodaci.find(data => data.id === nekretninaID);
        const novaNekretnina = nekretnine.find(nekretnina => nekretnina.id === nekretninaID);

        if(staraNekretnina && novaNekretnina){
            if(staraNekretnina.klikovi !== novaNekretnina.klikovi ||staraNekretnina.pretrage !== novaNekretnina.pretrage){
                promjene.push({
                    id: nekretninaID,
                    klikovi: staraNekretnina.klikovi,
                    pretrage: staraNekretnina.pretrage
                });
            }
        }
    });
  //  console.log("Stari podaci:",marketingPodaci);
    promjene.forEach(promjena =>{
        const indeks = marketingPodaci.findIndex(data => data.id === promjena.id);
        if(indeks !== -1){
            marketingPodaci[indeks] = promjena;
        }
    });
 //   console.log("Promjene",promjene);
    fs.writeFileSync(putanjaMarketing,JSON.stringify(marketingPodaci),'utf8');
   // console.log("marketing podaci",marketingPodaci);

    return res.status(200).json({nizNekretnina: marketingPodaci});
 });


app.listen(3000)
