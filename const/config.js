


const initOptions = {
    // initialization options;
};

const pgp = require('pg-promise')(initOptions);

bdSSH = "ssh lfrerej@mercury.iut-orsay.fr -p 6022";

serverId = "mercury";

serverPassword = "mercury2019";

dbName = "mercury";

serverUrl = "mercury.iut-orsay.fr";

dbPort = "5432";

cn = 'postgres://' + serverId + ':' + serverPassword + '@'+serverUrl+":" + dbPort + '/' + dbName;

const db = pgp(cn);

module.exports = {
    pgp, db
};

//'postgres://lfrerej:bdd2019@mercury.iut-orsay.fr:6022/mercury;
