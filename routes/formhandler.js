var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');

const db = require('../models'); //contain the Contact model, which is accessible via db.Contact

router.post('/add', (req, res) => {
    const { firstName, lastName, phone, email } = req.body; // req.body.firstName, req.body.lastName, req.body.phone

    let u = db.Contact.build({ firstName: firstName, lastName: lastName, phone: phone, email: email });
    return u.save()
        .then((contact) => res.render('added', {message: "The contact was added successfully!"}))
        .catch((err) => {
            if (err instanceof Sequelize.ValidationError)
                console.log(`validation error ${err}`);
            // one possible error is that the phone is missing, check the model files for more details
            else
                console.log(`other error ${err}`);

            res.render('added', {message: "some error occured (we should give precise information here)"})
        })
});
router.get('/add', (req, res) => {
    res.redirect('/'); // redirect to the home page
});

module.exports = router;
