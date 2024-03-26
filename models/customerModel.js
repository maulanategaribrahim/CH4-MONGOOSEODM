const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
    name :  {
      type: String,
      required: [true, 'Name cannot be empty']
    },
    age: Number,
    email: {
      type: String,
      unique: true, 
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    active:{
      type: Boolean,
      default: true,
    },
    photo: {
      type: String,
      default: 'user-default.jpg',
    },
    password: {
      type: String,
      select: false,
    },
    createdAt:{
      type: Date,
      default: Date.now()
    },

  })

  const Customer = mongoose.model('Customer', customerSchema)

  
  module.exports = Customer



  
  //   const customerTest = new Customer({
  //     name: 'yundilaii',
  //     email: 'yundiilkauuu@gmail.com',
  //     phoneNumber: '8977777777',
  //   })
  
  //   customerTest.save().then(doc => {
  //     console.log(doc)
  //   }).catch(err => {
  //     console.log('ERROR : ' + err)
  //   })