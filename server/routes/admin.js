const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../model/adminmodel");
const User = require("../model/usermodel");

router.post("/", async (req, res) => {
  const admin = await Admin.findOne({
    email: req.body.email,
  });

  if (!admin) {
    return res.json({ status: "error", error: "Invalid Login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    admin.password
  );
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: admin.name,
        email: admin.email,
      },
      "secretKey"
    );
    return res.json({ status: "ok", admin: token });
  } else {
    res.json({ status: "error", admin: false });
  }
});

router.get("/dashboard", async (re, res) => {
  const userData = await User.find();

  return res.json({ userData: userData });
});

router.delete("/deleteuser", async (req, res) => {
  let { id } = req.body;

  const deletedUser = await User.findOneAndDelete({ _id: id });
  if (deletedUser) {
    return res.json({ status: "delete" });
  } else {
    return res.json({ status: "error" });
  }
});

router.post("/edituser", async (req, res) => {
  const { id, name, email } = req.body;
  console.log(id);
  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: name,
        email: email,
      },
    }
  );

  if (updateUser) {
    return res.json({ status: "ok" });
  }
  return res.json({ status: "error" });
});

module.exports = router;
