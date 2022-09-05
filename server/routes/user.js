const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
router.post("/user/register", async (req, res) => {
  console.log(req.body);
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

router.post("/user/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid Login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secretKey"
    );
    return res.json({ status: "ok", user: token });
  } else {
    res.json({ status: "error", user: false });
  }
});

module.exports = router;
