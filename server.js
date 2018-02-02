/*
Importer les dépendances
*/
    // Composants
    const express = require('express');
    const path = require('path');
const ejs = require('ejs');

/*
Initialiser le serveur
*/
    // Configurer le serveur
    const app = express();
    const port = process.env.PORT || 3000;
    //

    // Configurer le dossier des vues client
    app.set( 'views', __dirname + '/www' );
    app.use( express.static(path.join(__dirname, 'www')) );

/*
Lancer le serveur
*/
app.listen( port, () => console.log( `Le serveur est lancé sur le port ${port}`) )
//