const fs = require("fs");
const Customer = require("./../models/customerModel")

const getCustomers = async (req, res, next) => {
  try {
    //1. basic filter
    const queryObject = { ...req.query }

    const excludedColumn = ['page', 'sort', 'limit', 'field']
    excludedColumn.forEach(el => delete queryObject[el])

    console.log(req.query, queryObject)

    //2. advance filter

    let queryStr = JSON.stringify(queryObject)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match  => `$${match}`) // = > $gt, $gte, $lte
    queryStr = JSON.parse(queryStr)

    let query =  Customer.find(queryStr)

    //3. sorting
    //sorting ASCENDING = NAME, kalau DESCENDING = (-)PAKE -
    if (req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ')
      console.log(sortBy)
      query = query.sort(sortBy)
    }else{
      query = query.sort('-createdAt')
    }

    //field limiting
    if (req.query.field){
      const field = req.query.field.split(',').join(' ')
      query = query.select (field);
    }else{
      query = query.select('-__v')
    }

    //5 pagination
    //page= 3&liimit=2 ===> data ke 5 dan 6
    const page = req.query.page * 1  || 1;
    const limit = req.query.limit * 1 || 2
    const skip = (page -1 )* limit
    query = query.skip(skip).limit(limit)

  
    if(req.query.page){
      const numCustomers = await Customer.countDocuments()
      if(skip > numCustomers) throw new Error("Page does not exits")
    }

    // esksekusi query
    const customers = await query

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
      message: err.message,
    });
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id)
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
    })
  }
};

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
  try {
    const id = req.params.id;

    await Customer.findByIdAndDelete(id);

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
};

const createCustomer = async (req, res) => {
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