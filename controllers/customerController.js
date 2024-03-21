const fs = require("fs");
const Customer = require('../models/customerModel')
// read file json nya
const getCustomers = async (req, res, next) => {
  console.log(req.requestTime);
  try {
    const customers = await Customer.find();

    res.status(200).json({
      status: "success",
      totalData: customers.length,
      requestAt: req.requestTime,
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    })
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id); // Menggunakan findById() untuk mencari data berdasarkan ID
    if (!customer) {
      return res.status(404).json({
        status: "fail",
        message: "Data tidak ditemukan"
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
}


const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const costumer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.status(200).json({
      status: "success",
      message: "berhasil update data",
      data: {
        costumer,
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    })
  }
};

const deleteCustomer = async (req, res) => {
  try{
    const id = req.params.id;

    const customer = await Customer.findByIdAndDelete(id)

    res.status(200).json({
      status: "success",
      message: "berhasil delete data",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    })
  }
}

const createCustomer = async (req, res) => {
  // console.log(req.body);

  // //const newCustomer = req.body;

  // //asychsorunuse
  try {
    const newCustomer = await Customer.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    })
  }
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
