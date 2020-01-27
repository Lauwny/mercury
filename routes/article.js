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
    db.query('select * from VueArticle')
        .then(function (data) {
            console.log("articles = ")
            console.log(data);
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "produits non dispo"});
        })

});


//Read tous les articles d'une catégorie donnée
router.get('/secteur/:sec', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var secteur = req.params.sec.toUpperCase();
    db.query('select * from VueArticle WHERE secteur = $1', [secteur])
        .then(function (data) {
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            console.log(error);
            res.send({"erreur": "produits non dispo"});
        })

});


//Read ( avec un id)
router.get('/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    db.one('select * from VueArticle where article_id = $1', [req.params.id])
        .then(function (data) {
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            res.send({"erreur": "produit non trouvé"});
        })
});

//Read ( avec un min/max )
router.get('/range/:min/:max', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var min = req.params.min;
    var max = req.params.max;

    db.query('select * from VueArticle where article_id BETWEEN $1 AND $2 ORDER BY article_id ASC', [min, max])
        .then(function (data) {
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            console.log(error);
            res.send({"erreur": "Impossible d'afficher"});
        })
});


//Read ( avec un min/max )
router.get('/search/:product', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var produit = req.params.product;
    console.log(produit)

    db.query('select * from VueArticle where articlelibelle LIKE % $1 %')
        .then(function (data) {
            res.send(JSON.stringify(data));
        })
        .catch(function (error) {
            console.log(error);
            res.send({"erreur": "Impossible d'afficher le produit"});
        })
});

//Delete
router.delete('/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id
    db.result('DELETE FROM article WHERE article_id = $1', [id])
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


//Update
router.patch('/:id', function (req, res, next) {
    var bod = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    res.send(bod);
    //console.log("update nom, prenom FROM articles values (" + bod.name + ", " + bod.surname + ") WHERE id=" + req.params.id + "")
});

//Create
router.post('/', function (req, res) {
    res.send(JSON.parse(JSON.stringify(req.body)));
    console.log(typeof (req.body));
});



module.exports = router;
