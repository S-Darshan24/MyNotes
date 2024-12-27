const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middalware/fetchuser')

const JWT_SECRET = "hiidarshan";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
     body('name').isLength({ min: 3 }),
     body('email').isEmail(),
     body('password').isLength({ min: 5 })
], async (req, res) => {
     let success = false
     //if ther are error , return bad requrest and the error
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({success, errors: errors.array() });
     }
     //check whether the user wuth this wmail exist already
     try {
          let user = await User.findOne({ email: req.body.email });
          if (user) {
               return res.status(400).json({ error: 'Email already exists' });
          }
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(req.body.password, salt);

          //create a new user 
          user = await User.create({
               name: req.body.name,
               password: secPass,
               email: req.body.email,
          })
          const data = {
               user: {
                    id: user.id
               }
          }
          const jwtdata = jwt.sign(data, JWT_SECRET);

          console.log(jwtdata)
          success = true
          res.json({success, jwtdata })

     } catch (error) {
          console.error(error.message);
          res.status(500).send({ message: ' internal Server error' });
     }
});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
     body('email', 'enter a valid email').isEmail(),
     body('password', 'password can not be blank').exists()
], async (req, res) => {
     let success = false
     //if ther are error , return bad requrest and the error
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;
     try {
          let user = await User.findOne({ email });
          if (!user) {
               success = false
               return res.status(400).json({ error: 'Please try to login with correct credentials'});
          }
          const passwordCompare = await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
               success = false
               return res.status(400).json({success, error:"Please try to login with correct credentials"});
          }
          const data = {
               user: {
                    id: user.id
               }
          }
          const jwtdata = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({ success, jwtdata })


     } catch (error) {
          console.error(error.message);
          res.status(500).send({ message: ' internal Server error' });
     }
});

/// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

     try {
          userId = req.user.id;
          const user = await User.findById(userId).select("-password")
          res.send(user)
     } catch (error) {
          console.error(error.message);
          res.status(500).send('internal Server error');

     }
})
module.exports = router;
