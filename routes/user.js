const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const verifiedEmail = await User.findOne({ email: email });
    if (verifiedEmail !== null) {
      return res.status(409).json({ message: " this account already exist" });
    }
    if (!password) {
      return res.status(409).json({ message: "please enter password" });
    }

    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);
    const token = uid2(64);

    const newUser = new User({
      email: email,
      username: username,
      salt: salt,
      hash: hash,
      token: token,
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      token: token,
      account: newUser.account,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const passwordInput = req.body.password;

    const loginUser = await User.findOne({ email: req.body.email });
    if (loginUser === null) {
      return res.status(401).json({ messsage: "pas de compte trouvé" });
    }
    const salt2 = loginUser.salt;
    // console.log(salt2);

    const newhash = SHA256(salt2 + passwordInput).toString(encBase64);
    // console.log(newhash);
    if (newhash !== loginUser.hash) {
      return res.status(401).json({ messsage: "erreur mot de passe" });
    }
    console.log(loginUser.hash);
    res.status(201).json({
      id: loginUser._id,
      token: loginUser.token,
      account: loginUser.account,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
