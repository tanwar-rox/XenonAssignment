const express=require('express');
const users= require('../model/user')
const router=express.Router();


router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
   
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const user = await users.findOne({ email, password });
  
      if (user) {
        res.status(200).json({ message: 'Authentication successful' });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
  
   
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports=router;