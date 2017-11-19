/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var mongo = require('mongodb');

module.exports = {
    login:function(req,res){
        User
            .findOneByEmail(req.body.email)
            .exec(function(err, user) {
                if (err || !user) {
                    res.status(422);
                    return res.send({'password':'Wrong email or password'});
                }

                if (user.password != req.body.password) {
                    res.status(422);
                    return res.send({'password':'Wrong email or password'});
                }

                return res.send({'token':user.id});
            });
    },
    register:function(req,res){
        User.validate(req.body, function(err) {
            if (err && err.invalidAttributes) {
                res.status(422);
                return res.send(ErrorsWrapper.wrap(err.invalidAttributes));
            } else {
                User.create(req.body).exec(function(err, records){
                    return res.send(records);
                });
            }
        });
    },
    me:function(req,res){
        User
            .findOneById(req.session.user_id)
            .exec(function(err, user) {
                if (err || !user) {
                    res.status(404);
                    return res.send();
                }

                return res.send(user);
            });
    },
    updateMe:function(req, res){
        User
            .update({id:req.session.user_id}, req.body)
            .exec(function(err, user) {
                if (err || !user) {
                    res.status(404);
                    return res.send();
                }

                return res.send(user);
            });
    },
    get:function(req,res){
        User
            .findOneById(req.params.id)
            .exec(function(err, user) {
                if (err || !user) {
                    res.status(404);
                    return res.send();
                }

                return res.send(user);
            });
    },
    search:function(req,res){
        User
            .find(req.query)
            .exec(function(err, users) {
                if (err || !users) {
                    res.status(404);
                    return res.send();
                }

                return res.send(users);
            });
    }
};

