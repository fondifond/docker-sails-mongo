/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
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
      toJSON:function(){
          var obj = this.toObject();
          delete obj.password;
          delete obj.token;
          return obj;
      }
  },
  isEmailRegistered:function(email){

  },
  getUserByToken:function(token){

  },
  createToken:function(id){

  },
  updateTokenExpTime:function(token){

  }
};

