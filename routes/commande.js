var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var consts = require("../const/config");

var db = consts.db;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());


//Read tous les résultats
router.get('/', function (req, res, next) {

    res.setHeader('Content-Type', 'application/json');

    db.query('select * from commande')
        .then(function (data) {
            console.log("commandes = ")
            console.log(data);
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "commandes non dispo"});
        })

});


//Read ( avec un id)
router.get('/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    db.one('select * from commande where commande_id = ' + req.params.id)
        .then(function (data) {
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "commande non trouvé"});
        })
});


//Delete
router.delete('/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id
    db.result('DELETE FROM commande WHERE commande_id = $1', [id], false)
        .then(result => {
            // rowCount = number of rows affected by the query
            if (result.rowCount > 0) {
                console.log(result.rowCount)
                res.send(JSON.stringify({"result": "1"}))
            } else {
                res.send(JSON.stringify({"result": "0"}))
                console.log(result.rowCount)
                console.log("pas erreur")
            } // print how many records were deleted;
        })
        .catch(error => {
            res.send(JSON.stringify({"result": "0"}))
            console.log("erreur")
            //console.log('ERROR:', error);
        });
});

//Create
router.post('/', function (req, res) {
    res.send(JSON.parse(JSON.stringify(req.body)));
    console.log(typeof (req.body));
});

//Update
router.patch('/:id', function (req, res, next) {
    var bod = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    res.send(bod);
    //console.log("update nom, prenom FROM articles values (" + bod.name + ", " + bod.surname + ") WHERE id=" + req.params.id + "")
});

module.exports = router;
