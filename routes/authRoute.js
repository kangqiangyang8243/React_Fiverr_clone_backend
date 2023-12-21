const router = require("express").Router();
const bcrypt = require("bcrypt");
const Users = require("../models/userModels");
const jwt = require("jsonwebtoken");

// register
router.post(`/register`, async (req, res) => {
  try {
    const usernameCheck = await Users.findOne({ username: req.body.username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await Users.findOne({ email: req.body.email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await Users.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user._doc;
    return res.json({ status: true, userWithoutPassword });
  } catch (error) {
    return res.json(error);
  }
});

// login
router.post(`/login`, async (req, res) => {
  try {
    const users = await Users.findOne({ username: req.body.username });
    if (!users) return res.json({ msg: "User Not Found!", status: false });
    const isMatch = await bcrypt.compare(req.body.password, users.password);
    if (!isMatch) {
      return res.json({ msg: "Invalid password", status: false });
    }
    const token = jwt.sign(
      {
        id: users._id,
        isSeller: users.isSeller,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "72h",
      }
    );

    const { password, ...userWithoutPassword } = users._doc;

    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .send({ status: true, userWithoutPassword });
  } catch (error) {
    return res.json(error);
  }
});

// logout
router.post(`/logout`, async (req, res) => {
  return res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .send("User has been logged out");
});

module.exports = router;
