/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//

/*
Configuration de Mongoose
*/
const mongoose = require('mongoose');
const mongoServeur = 'mongodb://localhost:27018/todo';
//

/**
 * Configuration du body-parser
 */

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended:false}));
//

/*
Définition des routes
*/
    //Accueil de l'API
    router.get( '/', (req, res) => {
        // Renvoyer le fichier index dans la réponse
        res.json( {content : 'Hello API'} );
    });

    // Afficher la liste des tasks
    router.get('/tasks', (req, res) => {

        // Connexion à la BDD MongoDB
        mongoose.connect(mongoServeur,(err, db) => {
            
            // Tester la connexion à la BDD
            if ( err ){ res.json({ error: err}) }
            else{

                // Connexion ouverte : récuperer la collection de données
                db.collection('tasks').find().toArray((err, collection) => {

                    // Tester la connexion à la collection
                    if ( err ) { res.json({error: err})}
                    else{

                        // Collection récupérée
                        res.json(collection);
                    };
                })
            };

            //Fermer la connexion
            db.close();
        });

    });

    // Créer une route API pour ajouter une task
    router.post('/add-task', (req, res)=> {
        console.log(req.body)

        // Connexion à la BDD MongoDB
        mongoose.connect( mongoServeur, ( err, db ) => {

            // Tester la connexion à la BDD
            if( err ) { res.render('add-task', { msg: err }) }
            else {

                // Connexion ouverte : ajouter les données dans la BDD
                db.collection('tasks').insert( { 
                    title: req.body.title, 
                    content: req.body.content,
                    type: req.body.type 

                }, (err, newObject) => {
                    // Vérifier l'ajout
                    if( err ) { res.render('add-task', { msg: err }) }
                    else{
                        res.render('add-task', { msg: newObject })
                    };
                });
            };

            // Fermer la connexion
            db.close();
        });

    });
//


//

/*
Exporter le module de route
*/

module.exports = router;

//