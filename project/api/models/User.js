/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    attributes: {
      name:{
          type:'string',
          required:true
      },
      phone:{
          type:'string'
      },
      email:{
          type:'email',
          unique:true,
          required:true
      },
      password:{
          type:'string',
          required:true
      },
      token:{
          type:'string'
      },
      createdAt: {
        type: 'integer',
        defaultsTo: function() {
          var date = new Date();
          return parseInt(date.getTime()/1000);
        }
      },
      updatedAt: {
        type: 'integer',
        defaultsTo: function() {
          var date = new Date();
          return parseInt(date.getTime()/1000);
        }
      },
      toJSON:function(){
          var obj = this.toObject();
          delete obj.password;
          delete obj.token;
          return obj;
      }
  },
  beforeSave:function(values,next) {
    var date = new Date();
    values.updateDate = parseInt(date.getTime()/1000);
    next();
  },
  isEmailRegistered:function(email){

  }
};

