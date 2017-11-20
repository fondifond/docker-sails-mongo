/**
 * Policy Mappings
 * (sails.config.policies)
 */


module.exports.policies = {
    UserController: {
      me: 'userAuth',
      updateMe : 'userAuth',
      get: 'userAuth',
      search: 'userAuth'
    },
    ItemController: {
      '*' : 'userAuth',
      'delete' : ['userAuth','itemAuth'],
      'update' : ['userAuth','itemAuth'],
      'imageUpload' : ['userAuth','itemAuth'],
      'imageDelete' : ['userAuth','itemAuth']
  }
};
