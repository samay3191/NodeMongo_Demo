var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req,res) {
  res.render('helloworld', { title: 'Hello World' });
});

router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
  // set internal DB variable
  var db = req.db;

  // getting form values
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // setting collection object
  var collection = db.get('usercollection');

  // inserting new user to the db
  collection.insert({
    "username": userName, "userEmail": userEmail
  }, function(err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      res.redirect("userlist");
    }
  });
});

module.exports = router;
