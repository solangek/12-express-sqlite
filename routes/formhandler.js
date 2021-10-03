var express = require('express');
var router = express.Router();

const db = require('../models'); //contain the Contact model, which is accessible via db.Contact

router.post('/add', (req, res) => {
    const { firstName, lastName, phone } = req.body; // req.body.firstName, req.body.lastName, req.body.phone
    return db.Contact.create({ firstName, lastName, phone })
        .then((contact) => res.render('added'))
        .catch((err) => {
            console.log('***There was an error creating a contact', JSON.stringify(contact))
            return res.status(400).send(err)
        })
});

module.exports = router;
