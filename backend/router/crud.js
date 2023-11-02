const User = require("../model/user")
const express = require("express");
const router = express.Router();

/////// to create the user in database
router.post("/createuser", async (req, res) => {
    try {
        const userData = req.body;
       const {email,password}=userData;

           const existuser= await User.findOne({email:email},{password:password});
           if(existuser){
            return res.status(200).json("User already Exist")
           }
         
      
        const newUser = new User(userData);

        await newUser.save();

        res.status(201).json("Registeration Successful");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Could not create user' });
    }
});

///// to read the data from the mongodb
router.get('/readuser', async (req, res) => {

    try {
        const user = await User.aggregate([{ $sample: { size: 1 } }]);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Could not retrieve user' });
    }
});

/////// to  update the data in mongodb
router.put('/updateusers', async (req, res) => {

    const { email, name, password } = req.body;


    try {
        // const user = await User.find({email});
        const user = await User.updateOne({ email }, { $set: { name, password } });

        if (!user) {

            return res.status(404).json({ message: 'User not found' });
        } else {


            // Respond with the updated user data
            res.status(200).json({message:'User Updated'});
        }

    } catch (error) {
        res.status(500).json({ error: 'Could not update user' });
    }
});

/////////// to delete the document in the mongodb
router.delete('/deleteusers', async (req, res) => {
    const email = req.query.email; // Extract email from the query parameter

    try {
        const user = await User.deleteOne({ email });
        if (!user.deletedCount) {
            return res.status(201).json({message:"User not found"})

        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete user' });
    }
});


module.exports = router;
