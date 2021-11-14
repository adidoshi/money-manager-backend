const expressAsyncHandler = require("express-async-handler");
const Income = require("../../model/Income");

// Create
const createIncome = expressAsyncHandler(async (req, res) => {
  const { title, amount, description, user } = req.body;
  try {
    const income = await Income.create({
      title,
      amount,
      description,
      user,
    });
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// Fetch all income
const fetchAllIncome = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const income = await Income.paginate(
      {},
      { limit: 10, page: Number(page), populate: "user" }
    );
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// Fetch single income
const fetchIncomeDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const income = await Income.findById(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// update
const updateIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description } = req.body;
  try {
    const income = await Income.findByIdAndUpdate(
      id,
      {
        title,
        description,
        amount,
      },
      { new: true }
    );
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// delete income
const deleteIncome = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const income = await Income.findByIdAndDelete(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createIncome,
  fetchAllIncome,
  fetchIncomeDetails,
  updateIncome,
  deleteIncome,
};
