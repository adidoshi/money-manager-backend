const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");

// Create
const createExpense = expressAsyncHandler(async (req, res) => {
  const { title, amount, description, user } = req.body;
  try {
    const expense = await Expense.create({
      title,
      amount,
      description,
      user,
    });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// Fetch all expenses
const fetchAllExpenses = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const expense = await Expense.paginate(
      {},
      { limit: 10, page: Number(page), populate: "user" }
    );
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// Fetch single expense
const fetchExpenseDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const expense = await Expense.findById(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// update
const updateExpense = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description } = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      {
        title,
        description,
        amount,
      },
      { new: true }
    );
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// delete income
const deleteExpense = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createExpense,
  fetchAllExpenses,
  fetchExpenseDetails,
  updateExpense,
  deleteExpense,
};
