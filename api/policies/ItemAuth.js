/**
 * userAuth
 *
 * @module      :: Policy
 *
 */
module.exports = function(req, res, next) {

    Item
        .findOneById(req.params.id)
        .exec(function(err, item) {
            if (err || !item) {
                res.status(404);
                return res.send();
            }

            if (item.user_id != req.session.user_id) {
                res.status(403);
                return res.send();
            }

            req.session.item = item;
            return next();
        });
};
