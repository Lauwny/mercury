var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var consts = require("../const/config");

var db = consts.db;


router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Create
router.post('/', function (req, res) {


    var date_creation = req.body.date_creation;
    var ligne1 = req.body.ligne1;
    var ligne2 = req.body.ligne2;
    var ligne3 = req.body.ligne3;
    var ligne4 = req.body.ligne4;
    var ligne5 = req.body.ligne5;
    var ligne6 = req.body.ligne6;
    var ligne7 = req.body.ligne7;
    var values = [date_creation, ligne1, ligne2, ligne3, ligne4, ligne5, ligne6, ligne7];

    db.query('INSERT INTO adresse(date_creation, ligne1, ligne2, ligne3, ligne4, ligne5, ligne6, ligne7) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ', values)
        .then(function (data) {
            console.log("adresses = ")
            console.log(data);
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            console.log(error)
            res.send({"erreur": "adresses non insérée"});
        })


    //res.send(JSON.parse(JSON.stringify(req.body)));
    console.log(values);
});


//Read tous les résultats
router.get('/', function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');


    db.query('select * from adresse')
        .then(function (data) {
            console.log("adresses = ")
            console.log(data);
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "adresses non dispo"});
        })

});


//Read ( avec un id)
router.get('/:id', function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    db.one('select * from adresse where adresse_id = ' + req.params.id)
        .then(function (data) {
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "adresse non trouvé"});
        })
});


//Update
router.put('/:id', function (req, res, next) {
    var bod = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    res.send(bod);
    //console.log("update nom, prenom FROM articles values (" + bod.name + ", " + bod.surname + ") WHERE id=" + req.params.id + "")
});

//Delete
router.delete('/:id', function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    const id = req.params.id
    db.result('DELETE FROM client WHERE adresse_id = ' + [id], false)
        .then(result => {

            db.result('DELETE FROM adresse WHERE adresse_id = ' + [id], false)
                .then(result => {
                    res.send(JSON.stringify({"result": "1"}))
                })
                .catch(error => {
                    res.send(JSON.stringify({"result": "0"}))
                    console.log('ERROR:', error);
                });
        })
        .catch(error => {
            res.send(JSON.stringify({"result": "0"}))
            console.log('ERROR:', error);
        });
});


module.exports = router;


module.exports = router;
