const router = require('express').Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require("../validation/validation");



//Register
router.post('/register', async (req,res)=>{
    // Validating data before creating user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user already exists of not
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exist");

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Finally get user detail / data
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();

        //Except password other details will be diaplayed 
        const { password, ...others} = user._doc;
        res.status(200).json({...others});
    }catch(err){
        res.status(400).json(err);
    }
});


//Log in
router.post('/login', async (req,res)=>{
     // Validating data before logging in user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user already exists of not
    const user = await User.findOne({email: req.body.email});
    if( !user) return res.status(400).send("Email or password is wrong");

    //Password is correct or not
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid password");

    //assign token or create token
    const token = jwt.sign(
        {
            _id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.TOKEN_SEC,
        {expiresIn:"3d"}
    ); 
    const {password, ...others} = user._doc;
    res.header('auth-token', token).send({...others, token});
    // res.header('auth-token', token).send(token);

});


module.exports = router;