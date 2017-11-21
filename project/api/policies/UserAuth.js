/**
 * userAuth
 *
 * @module      :: Policy
 *
 */
module.exports = function(req, res, next) {
  var authToken = req.headers.authorization;
  if (!authToken) {
      res.status(401);
      return res.send({error:'Not auth'});
  }

    User
        .findOne({id:authToken})
        .exec(function(err, user) {
            if (err || !user) {
                res.status(401);
                return res.send();
            }

            req.session.user_id = user.id;
            req.session.user = user;
            return next();
        });
};
