const express = require("express");
const {
  createExpense,
  fetchExpenseDetails,
  fetchAllExpenses,
  updateExpense,
  deleteExpense,
} = require("../../controllers/expenses/expenseController");
const authMiddleware = require("../../middlewares/authMiddleware");

const expenseRoute = express.Router();

expenseRoute.post("/", authMiddleware, createExpense);
expenseRoute.get("/", authMiddleware, fetchAllExpenses);
expenseRoute.get("/:id", authMiddleware, fetchExpenseDetails);
expenseRoute.put("/:id", authMiddleware, updateExpense);
expenseRoute.delete("/:id", authMiddleware, deleteExpense);

module.exports = expenseRoute;
