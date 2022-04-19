//Importation des modules
const express = require('express');
const app = express();
//Définition du port utilisé
const port = process.env.PORT || 5050;
//Importation des modules custom,data,locals, etc..
const router = require('./app/router.js');
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(express.urlencoded({ extended: true }));
const pokedex = require('./app/data/pokedex.json');
app.locals.pokedex = pokedex;

app.use (router);

app.listen(port, () => {
    console.log(`Server app listening on port ${port}`);
});
