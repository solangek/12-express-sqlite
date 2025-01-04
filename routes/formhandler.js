var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');

const { Contact } = require('../models/contact');


/**
 * the goal of this example is to show you how to handle form data
 * using a POST request and how to handle errors
 * This is not an Ajax (SPA) example, it is a traditional form submission
 */
router.post('/add', async (req, res) => {

    try {
        const { firstName, lastName, phone, email } = req.body;
        const newContact = await Contact.create({ firstName, lastName, phone, email });
        res.render('added', {message: "The contact was added successfully!"})
    } catch (err) {
        // in principle the client should perform the validation, but we can't trust the client so we need to validate here as well
        // however since this is not expected to happen, we can just return a non user friendly message.
        // Extensive error handling can be done here as well
        if (err instanceof Sequelize.ValidationError) {
            res.render('added', {message: `Invalid input: ${err}`});
        } else if (err instanceof Sequelize.DatabaseError) {
            res.render('added', {message: `Database error: ${err}`});
        } else {
            res.render('added', {message: `Unexpected error: ${err}`});
        }
    }
});

router.get('/add', (req, res) => {
    res.redirect('/'); // redirect to the home page

    // or...render a html page, but what would be the difference?
    // res.render(...);
    //
    // the difference is that the user would see the URL of the form submission in the browser
    // and if they refresh the page, the form would be submitted again.
    // redirect is a better choice in this case since it prevents the user from accidentally inserting the same data twice
});

module.exports = router;
