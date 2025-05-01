const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const passport = require("passport");


router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    console.error("Login Error:", error); // Added error logging
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message, // Send error details in development
    });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    // Successful authentication, generate JWT
    const token = req.user.generateAuthToken();
    res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);

const validate = (data) => {
  const schema = joi.object({
    // Changed Joi to joi
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
