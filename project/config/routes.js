/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  'post /api/login' : 'UserController.login',
  'post /api/register' : 'UserController.register',

  'get /api/me' : 'UserController.me',
  'put /api/user/me' : 'UserController.updateMe',
  'get /api/user/:id' : 'UserController.get',
  'get /api/user' : 'UserController.search',

  'get /api/item' : 'ItemController.search',
  'get /api/item/:id' : 'ItemController.get',
  'put /api/item/:id' : 'ItemController.update',
  'delete /api/item/:id' : 'ItemController.delete',
  'put /api/item' : 'ItemController.create',
  'post /api/item/:id/image' : 'ItemController.imageUpload',
  'delete /api/item/:id/image' : 'ItemController.imageDelete'
};
