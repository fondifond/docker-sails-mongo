/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search:function(req,res){
        Item
            .find(req.query)
            .exec(function(err, items) {
                if (err || !items) {
                    return res.notFound('User not found');
                }

                return res.send(items);
            });
    },
    get:function(req,res){
        Item
            .findOneById(req.params.id)
            .exec(function(err, item) {
                if (err || !item) {
                    res.status(404);
                    return res.send();
                }

                return res.send(item);
            });
    },
    update:function(req,res){
        var item = _.merge(req.session.item.toJSON(), req.body);
        Item.validate(item, function(err){
            if (err && err.invalidAttributes) {
                res.status(422);
                return res.send(ErrorsWrapper.wrap(err.invalidAttributes));
            } else {
                Item
                    .update({id:req.params.id}, item)
                    .exec(function(err, records){
                        return res.send(records);
                    });
            }
        });
    },
    delete:function(req,res){
        Item.destroy({id:req.params.id}).exec(function(err) {});
        return res.send();
    },
    create:function(req,res){
        var attributes = req.body;
        attributes.user_id = req.session.user_id;
        Item.validate(attributes, function(err) {
            if (err && err.invalidAttributes) {
                res.status(422);
                return res.send(ErrorsWrapper.wrap(err.invalidAttributes));
            } else {
                Item.create(attributes).exec(function(err, records){
                    return res.send(records);
                });
            }
        });
    },
    imageUpload:function(req,res){
        ImageUploader
            .process(req.file('file'), req.session.item.id)
            .then(function(filename){
                Item
                    .update({id:req.params.id}, {image:filename})
                    .exec(function(err, records){
                        return res.send(records);
                    });
            })
            .catch(function(err){
                res.status(422);
                return res.send(err);
            });
    },
    imageDelete:function(req,res){
        Item
            .update({id:req.params.id}, {image:''})
            .exec(function(err, records){
                return res.send();
            });
    }
};

