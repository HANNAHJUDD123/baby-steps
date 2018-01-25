// var db = require("../models");
// // =============================================================
// module.exports = function (app) {

  // post route to signup a user
  // app.post('/api/signup', function(req, res){
  //   console.log('success');
  //   res.json({message: 'YES IT WORKED'});
  // });
  // app.post('/api/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/home?success',
  //   failureRedirect: '/home?fail'
  // }
  // ));

  // // route to log a user out
  // app.get('/api/logout', function (req, res) {
  //   req.session.destroy(function (err) {
  //     res.redirect('/');
  //   });
  // });


  // app.get("/api/childs", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
  //   db.Child.findAll({
  //     include: [db.Event]
  //   }).then(function(dbChild) {
  //     res.json(dbChild);
  //   });
  // });
  // app.get("/api/childs/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
  //   db.Child.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Event]
  //   }).then(function(dbChild) {
  //     res.json(dbChild);
  //   });
  // });

  // app.post("/api/childs", function(req, res) {
  //   db.Child.create(req.body).then(function(dbChild) {
  //     res.json(dbChild);
    
  //   });
  // });

  //   app.delete("/api/childs/:id ", function(req, res) {
  //     db.Child.destroy({
  //       where: {
  //         id: req.params.id
  //       }
  //     }).then(function(dbChild) {
  //       res.json(dbChild);
  //     });
  //   });

  // };

  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated())
  //     return next();
  //   res.redirect('/signin');
  // }

