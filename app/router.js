//Importation des modules
const express = require('express');
const router = express.Router();
//Importation des modules custom,data,locals, etc..
const pokedex = require('./data/pokedex.json');



router.get('/', (request, response) => {
    response.render('index.ejs');
});

router.get('/:numero', (request, response,next) => {
    const pokemonNumero = Number(request.params.numero);
    const pokemonFound = pokedex.find(pokemon => pokemon.numero === pokemonNumero);
    if (pokemonFound) {
        response.render('pokemon.ejs', {
            pokemonFound : pokemonFound
        });
    } else {
        next();
    }
});

router.get('/type/', (request, response) => {
    let arrayConcat = [];

    for (const pokemon of pokedex) {
        const value = pokemon.type;
        arrayConcat = arrayConcat.concat(value);
    }
    arrayConcat.sort();

    const arrayUniqueType = arrayConcat.reduce((a,b) => {
        if (a.indexOf(b) < 0) a.push(b);
        return a; }, []);

    response.render('type.ejs', {
        arrayUniqueType : arrayUniqueType
    });
});

router.get('/type/:type', (request, response,next) => {
    const pokemontype = request.params.type;
    const typeFound = pokedex.filter(pokemon => pokemon.type.includes(pokemontype));
    if (typeFound) {
        response.render('typeResult.ejs', {
            typeFound : typeFound
        });
    } else {
        next();
    }
});






module.exports = router;