const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/calc'
}), (req, res) => {
    // ログイン成功後のリダイレクトs先を指定
    console.log(req.user);
    res.redirect('/calc');
});

module.exports = router;