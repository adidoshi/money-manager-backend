const express = require("express");
const {
  createIncome,
  fetchAllIncome,
  fetchIncomeDetails,
  updateIncome,
  deleteIncome,
} = require("../../controllers/income/incomeController");
const authMiddleware = require("../../middlewares/authMiddleware");

const incomeRoute = express.Router();

incomeRoute.post("/", authMiddleware, createIncome);
incomeRoute.get("/", authMiddleware, fetchAllIncome);
incomeRoute.get("/:id", authMiddleware, fetchIncomeDetails);
incomeRoute.put("/:id", authMiddleware, updateIncome);
incomeRoute.delete("/:id", authMiddleware, deleteIncome);

module.exports = incomeRoute;
