/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
//

/**
 * Configuration de Mongoose
 */
    const mongoose = require('mongoose');
    const mongoServeur = 'mongodb://localhost:27018/todo'
//


/**
Définition des routes
*/

    // Afficher la liste des posts dans la page INDEX
    router.get( '/', (req, res) => {
       
        // Connexion à la BDD MongoDB
        mongoose.connect( mongoServeur, ( err, db ) => {

            // Tester la connexion à la BDD
            if( err ) { res.render('index', {error: err}) }
            else {

                // Connexion ouverte : récupérer la collection de données
                db.collection('tasks').find().toArray( (err, collection) => {

                    // Tester la connexion à la collection
                    if( err ) { res.render('index', {error: err}) }
                    else{
                        console.log(collection)
                        // Collection récupérée : Renvoyer le fichier index dans la réponse avec la collection
                        res.render('index', {data: collection});

                    };
                });
            };

            // Fermer la connexion
            db.close();
        });
    });


    // Créefr une route pour ajouter un article
    router.get('/add-task', (req, res)=> {
        res.render('add-task');
    });

//

/*
Exporter le module de route
*/
module.exports = router;
//