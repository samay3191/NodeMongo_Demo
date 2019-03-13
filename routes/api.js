var express = require('express');
var router = express.Router();

const userCollection = function (db) {
    return db.get('usercollection');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/helloworld', function(req,res) {
  res.json({ title: 'Hello World' });
});

router.get('/api/userlist', function(req, res) {
  var collection = userCollection(req.db);
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
});

/* POST to Add User Service */
router.post('/api/adduser', function(req, res) {
    var collection = userCollection(req.db);

  // getting form values
  var userName = req.body.username;
  var userEmail = req.body.useremail;

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
