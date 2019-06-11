var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var consts = require("../const/config");

var db = consts.db;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Create
router.post('/', function (req, res) {
    res.send(JSON.parse(JSON.stringify(req.body)));
    console.log(typeof(req.body));
});


//Read tous les résultats
router.get('/', function (req, res, next) {


    db.query('select * from client')

        .then(function (data) {
            console.log("clients = ")
            console.log(data);
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "clienbt non dispo"});
        })

});


//Read ( avec un id)
router.get('/:id', function (req, res, next) {

    db.one('select * from client where client_id = ' + req.params.id)
        .then(function (data) {
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "client non trouvé"});
        })
});


//Update
router.patch('/:id', function (req, res, next) {
    var bod = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    res.send(bod);
    //console.log("update nom, prenom FROM articles values (" + bod.name + ", " + bod.surname + ") WHERE id=" + req.params.id + "")
});

//Delete
router.delete('/:id', function (req, res) {
    const id = req.params.id
    db.result('DELETE FROM client WHERE client_id = '+ id, false)
        .then(result => {
            // rowCount = number of rows affected by the query
            if(result.rowCount > 0){
                console.log(result.rowCount)
                res.send(JSON.stringify({"result": "1"}))
            }else{
                res.send(JSON.stringify({"result" : "0"}))
                console.log(result.rowCount)
                console.log("pas erreur")
            } // print how many records were deleted;
        })
        .catch(error => {
            res.send(JSON.stringify({"result" : "0"}))
            console.log("erreur")
            //console.log('ERROR:', error);
        });
});


module.exports = router;



module.exports = router;
