const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../middlewares/generateToken");
const User = require("../../model/User");
const { registerValidation, loginValidation } = require("./validate");

// Register
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstName, lastName, password } = req?.body;

  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Email already exists");

  try {
    // Validate user by Joi
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create user
    const user = await User.create({ firstName, lastName, email, password });
    res.status(201).json({
      user,
    });
  } catch (error) {
    res.status(500).send("Error", error);
  }
});

// Fetch all users
const fetchUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

// Login
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;

  // Validate user by Joi
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //  Find the user in db
  const userFound = await User.findOne({ email });

  // check password match
  if (userFound && (await userFound?.isPasswordMatch(password))) {
    return res.json({
      _id: userFound?._id,
      firstName: userFound.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

module.exports = { registerUser, fetchUsers, loginUser };
