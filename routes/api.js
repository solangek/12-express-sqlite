/*

Route	Method	Functionality
/api/contacts	GET	Retrive all contacts
/api/contacts	POST	Create contact
/api/contacts/:id	PUT	Update the details of a contact
/api/contacts/:id	DELETE	Delete a contact

 */

var express = require('express');
var router = express.Router();

const db = require('../models');
router.get('/contacts', (req, res) => {
    return db.Contact.findAll()
        .then((contacts) => res.send(contacts))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            err.error = 1; // some error code for client side
            return res.status(400).send(err) // send the error to the client
        });
});

router.get('/contacts/:lastName', (req, res) => {
    return db.Contact.findAll({where: {lastName: req.params.lastName}})
        .then((contacts) => res.send(contacts))
        .catch((err) => {
            console.log('There was an error querying contacts', JSON.stringify(err))
            return res.status(400).send(err)
        });
});

router.post('/contacts', (req, res) => {
    const { firstName, lastName, phone } = req.body
    return db.Contact.create({ firstName, lastName, phone })
        .then((contact) => res.status(201).send(contact))
        .catch((err) => {
            console.log('*** error creating a contact', JSON.stringify(contact))
            return res.status(400).send(err)
        })
});

router.delete('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    return db.Contact.findByPk(id)
        .then((contact) => contact.destroy({ force: true }))
        .then(() => res.status(204).send())
        .catch((err) => {
            console.log('***Error deleting contact', JSON.stringify(err))
            res.status(400).send(err)
        })
});

router.put('/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Contact.findByPk(id)
        .then((contact) => {
            const { firstName, lastName, phone } = req.body
            return contact.update({ firstName, lastName, phone })
                .then(() => res.send(contact))
                .catch((err) => {
                    console.log('***Error updating contact', JSON.stringify(err))
                    res.status(400).send(err)
                })
        })
});

module.exports = router;
