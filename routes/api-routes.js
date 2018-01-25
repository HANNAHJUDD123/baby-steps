// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var Child = require("../models/child.js");


module.exports = function(app, passport) {
// POST route for saving a new post

  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/home?success',
    failureRedirect: '/home?fail'
  }
  ));

  // route to log a user out
  app.get('/api/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  });

  app.get('/api/username', function(req, res) {
    console.log(req.user);
    if (req.user) {
      res.json({user: req.user});
    } else {
      res.json({message: 'No user logged in'});
    }
  });
  // 
  app.get("/api/events", function(req, res) {

    var query = {};
    if (req.query.child_id) {
      query.ChildId = req.query.child_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Event.findAll({
      where:query, 
      include: [db.Child]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  app.get("/api/events/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Child]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  app.post('/api/events', function (req, res) {
    console.log(req.body);
    console.log(req.body.title);
    console.log(req.files.sampleFile);
    let sampleFile = req.files.sampleFile;
    var img_name=sampleFile.name;
    // var childId = req.body.childId;
     // var userId = req.user.id;
    var img_loc_on_server = 'public/images/upload_images/'+img_name;
      // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(img_loc_on_server, function(err) {
            if (err)
                return console.log(err);
            console.log('File uploaded!');
        });
// var sql = "INSERT INTO `children`(`image`) VALUES ('" + img_loc_on_server + "')";


    // console.log("users_image", req.body);
    var event = {
      title: req.body.title,
      description: req.body.description,
      story: req.body.story,
      date: req.body.date,
      imageurl: 'images/upload_images/'+img_name,
      ChildId: req.body.childId
      // ChildId: uId
    }
    db.Event.create(event).then(function (dbEvent) {
      res.json(dbEvent);
    });
  });

  // DELETE route for deleting event

  app.delete('/api/events/:id', function (req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbEvent) {
      res.json(dbEvent);
    });


  });

  // PUT route for updating event/////

  app.put('/api/events', function (req, res) {
    let sampleFile = req.files.sampleFile;
  var img_name=sampleFile.name;
  var img_loc_on_server = 'public/images/upload_images/'+img_name;
    // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(img_loc_on_server, function(err) {
          if (err)
              return console.log(err);
          console.log('File uploaded!');
      });


    db.Event.update({
     title: req.body.title,
       description: req.body.description,
       story: req.body.story,
       date: req.body.date,
       imageurl: 'images/upload_images/'+ img_name
     },{
      where:{
        id: req.body.id
      }

      
  }).then(function (dbEvent) {
    res.json(dbEvent);
  });

});


//*************** api routes for children**********************************

app.get("/api/childs", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Child.findAll({
      where: {
        userId: req.user.id
      },
      include: [db.Event]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });
app.get("/api/childs/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Child.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Event]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

app.post("/api/childs", function(req, res) {
  console.log(req.body);
  console.log(req.body.firstname);
  // console.log(req.files.sampleFile);
  var sampleFile = req.files.sampleFile;
  var img_name=sampleFile.name;
  var userId = req.user.id;
  var img_loc_on_server = 'public/images/upload_images/'+img_name;
    // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(img_loc_on_server, function(err) {
          if (err)
              return console.log(err);
          console.log('File uploaded!');
      });
// var sql = "INSERT INTO `children`(`image`) VALUES ('" + img_loc_on_server + "')";

//                 var query = db.query(sql, function(err, result) {
//                     res.json(result);
//                 });

    db.Child.create({
      image:'images/upload_images/'+img_name,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      weight:req.body.weight,
      height:req.body.height,
      hospitalborn:req.body.hospitalborn,
      gender:req.body.gender,
      birthdate:req.body.birthdate,
      userId: userId
    }).then(function(dbChild) {
      res.json(dbChild);
    });
    
   // });
 });

  

  app.delete("/api/childs/:id ", function(req, res) {
    db.Child.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  // PUT/UPDATE //////////////////

  app.put("/api/childs", function(req, res) {
    let sampleFile = req.files.sampleFile;
  var img_name=sampleFile.name;
  var img_loc_on_server = 'public/images/upload_images/'+img_name;
    // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(img_loc_on_server, function(err) {
          if (err)
              return console.log(err);
          console.log('File uploaded!');
      });



    db.Child.update({
      image:img_loc_on_server,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      weight:req.body.weight,
      height:req.body.height,
      hospitalborn:req.body.hospitalborn,
      gender:req.body.gender,
      birthdate:req.body.birthdate
    }, {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbChild) {
      res.json(dbTodo);
    });

  });


   // middleware for logging in
  function isLoggedIn(req, res, next){
    if (req.isAuthenticated())
      return next();
    res.redirect('/signin');
  }

};