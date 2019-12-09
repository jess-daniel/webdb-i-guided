const express = require('express');

// database access using knex
const knex = require('../data/db-config.js'); // renamed to knex for today

const router = express.Router();


// return a list of posts 
router.get('/', (req, res) => {
    knex.select('*').from('posts')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "server error", err });
        })
});

router.get('/:id', (req, res) => {
    // select * from posts where id = req.params
    knex.select('*')
        .from('posts')
        // .where('id', '=', req.params.id)
        .where({ id: req.params.id })
        .first() // equal to post[0]
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "server error", err });
        })
});

router.post('/', (req, res) => {
    // validate before calling db function
    const postData = req.body;
    if (postData) {
        knex('posts')
            .insert(postData, 'id') // second argument will show warning in SQLITE3
            .then(ids => {
                // returns an array of one element, the id of the last record
                const id = ids[0];
                
                return knex('posts')
                    .where({ id })
                    // .select('id', 'title', 'contents') <== control what is returned
                    .first()
                    .then(post => {
                        res.status(201).json(post);
                });
            })
            .catch(err => {
                res.status(500).json({ error: "server error", err });
        })
    } else {
        res.sendStatus(400);
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // validate data
    knex('posts')
        .where({ id }) // always filter on update and delete
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json(count);
            } else {
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    knex('posts')
        .where({id}) // always filter on update and delete
        .del()
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ error: "server error", err });
    })
});

module.exports = router;