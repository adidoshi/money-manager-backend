const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./routes/users/usersRoute");
const incomeRoute = require("./routes/income/incomeRoute");
const expenseRoute = require("./routes/expenses/expenseRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const transactions = require("./routes/transactions");
const PORT = process.env.PORT || 4000;

// Connect MongoDB
const dbConnect = require("./config/dbConnect");

dbConnect();

const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// const logger = (req, res, next) => {
//   console.log("I am a logger");
//   next();
// };

// app.use(logger);

// routes
app.use("/api/users", userRoute);
app.use("/api/income", incomeRoute);
app.use("/api/expenses", expenseRoute);

app.use("/api/v1/transactions", transactions);

app.get("/", (req, res) => {
  res.json({
    message: `Welcome to money manager api`,
  });
});

// error
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
