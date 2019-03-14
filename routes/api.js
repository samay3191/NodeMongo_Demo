var express = require('express');
var router = express.Router();

const userCollection = function (db) {
    return db.get('usercollection');
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/helloworld', function (req, res) {
    res.json({
        title: 'Hello World'
    });
});

router.get('/userlist', function (req, res) {
    var collection = userCollection(req.db);
    collection.find({}, {}, function (e, docs) {
        res.json(docs);
    });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
    var collection = userCollection(req.db);

    // getting form values
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // inserting new user to the db
    collection.insert({
        "username": userName,
        "email": userEmail
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.json(doc);
        }
    });
});

router.post('/updateuser', function (req, res) {
    var collection = userCollection(req.db);

    // getting form values
    var updatedObject = req.body;

    // updating existing user to the db
    collection.update({}, updatedObject, function (err, doc) {
        if (err) {
            res.send("There was a problem updating the information to the database.");
        } else {
            res.json(doc);
        }
    });
    // collection.save(updatedObject);
});

router.post('/deleteuser', function (req, res) {
    var collection = userCollection(req.db);
    collection.remove(req.body, function(err, doc) {
        if (err) {
            res.send("There was a problem deleting the information from the database.");
        } else {
            res.json(doc);
        }
    });
});

module.exports = router;