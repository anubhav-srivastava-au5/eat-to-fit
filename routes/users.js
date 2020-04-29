const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const router = express.Router();
const auth=require('../middleware/auth')
var dotenv = require('dotenv');
dotenv.config();

const User = require("../models/users")
router.use(cors())

router.post('/register', (req, res, next) => {
  User.findAll({ where: { email: req.body.email } }).then((user) => {
    if (user.length >= 1) {
      return res.status(409).json({ message: "user already exist cant register" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
          });
          newUser.save().then(response => {
            console.log(response);
            res.status(201).json({ message: "User registered Successfully", User: response })
          }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
        }
      })
    }
  }).catch();
})

router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findAll({where:{ email: email }}).then(user => {
    if (user.length < 1) {
      return res.status(401).json({ message: "User Doesn't Exist" });
    }
    bcrypt.compare(password, user[0].password, (err, isMatch) => {
      if (err) {
        return res.status(401).json({ message: "Authentication Failed" });
      }
      if (isMatch) {
        const token = jwt.sign({ email: user[0].email, userId: user[0]._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({ message: "Authentication successful", Token: token, Id: user[0]._id })
      }
      res.status(401).json({ message: "Authentication Failed" });
    })
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
})

// router.delete('/logout', auth, async(req, res, next) => {
//   console.log(req.users)
//   const user=req.user;
//   console.log(user[0].id)
//   console.log(user)
//   console.log(User)
//   try{
//     User.update({
//       token:null
//     },{
//       returning:true,
//       where:{
//         id:user.id,
//       }
//     });
//     res.json({
//       status:200,
//       message:"logged out successully!see you again"
//     })
//   } catch(err){
//     console.log(err);
//     res.status(400).send(`validation error: ${err.message}`);
//   }
// });

module.exports = router;