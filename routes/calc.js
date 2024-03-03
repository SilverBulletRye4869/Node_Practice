const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("calc", {
    user: req.user !== undefined ? req.user.username : undefined,
    a: "",
    b: "",
    calc_res: "",
  });
});

router.post("/", (req, res) => {
  const a = req.body.a;
  const b = req.body.b;
  const c = parseInt(a) + parseInt(b);
  res.render("calc", {
    user: req.user !== undefined ? req.user.username : undefined,
    a: a,
    b: b,
    calc_res: c.toString(),
  });
});

module.exports = router;
