require('dotenv/config') //panggil env
const mongoose = require('mongoose')
const fs = require('fs')
const Customer = require('../models/customerModel')

// const app = require("./app");

// const PORT = process.env.PORT; //panggil env yang tidak igin terlihat

const DB = process.env.DATABASE

mongoose
.connect(DB, {
  useNewUrlParser: true,
  }).then(con => {
    console.log('conncetion to database succes')
    //console.log(con.connections)
  })

  const customers = JSON.parse(fs.readFileSync("./data/customers.json", "utf-8"));

const importData = async () =>{
    try{
        await Customer.create(customers)
        console.log('data succes import')
    }catch (err){
        console.log(err)
    }
    process.exit()
}


const clearData = async () =>{
    try{
        await Customer.deleteMany()
        console.log('data sukses diclear')
    }catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] == "--import"){
    importData()
}else if(process.argv[2] == "--delete"){
    clearData()
}