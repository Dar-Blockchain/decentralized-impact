const User = require("../models/User")
const bcrypt = require('bcryptjs');
//const { user } = require("../routes/user")
var jwt = require('jsonwebtoken')
const crypto = require("crypto")

var expressJwt = require('express-jwt');
const { body } = require("express-validator");
const Token = require("../models/Token");
const sendEmail = require("../controllers/sendEmail");
const { url } = require("inspector");
const urll = 'http://localhost:5000/api'


/*exports.signup =(req,res)=>{
  console.log(req.body);
  const{firstName,lastName,email,password  }= req.body;
  User.findOne({email}).exec((err,User)=>{
    if(user){
      return res.status(400).json({error:"User with this email already exists"});

    }
    let newUser = new User({firstName,lastName,email,password});
    newUser.save((err,success)=>{
      if(err){
        console.log("error in sihnup:",err)

      }
      res.json({
        message:"signup success !"
      })
    })
  })
 
}*/
exports.signup = async(req,res)=>{
  try {
    console.log(req.body);
		let user = await User.findOne({ firstName,lastName,email,password  } = req.body );
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body}).save();	
    	const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${urll}/${user._id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);
    console.log()
		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
}
//---------------------signin-------------------------------//
//----------------------verify-------------------------------//
exports.Token = async(req,res)=>{
    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
      if (!token) return res.status(400).send({
          type: 'not-verified',
          msg: `We were unable to find a valid token.Your token my have expired.`
      });

      // If we found a token, find a matching user
      User.findOne({ _id: token.userId }, function (err, user) {
          if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
          if (user.verified) return res.status(400).send({
              type: 'already-verified',
              msg: 'This user has already been verified.'
          });

          // Verify and save the user
          user.verified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send("The account has been verified. Please login.");
          });
      });
  });
}
//---------------------signin-------------------------------//
exports.signin = (req , res )=>{
  User.findOne({ email : req.body.email }, function(err, user) { 
    if (user === null) { 
        return res.status(400).send({ 
            message : "User not found."
        }); 
    } 
    else { 
        if (user.validPassword(req.body.password)) { 
          return res.json({ token: jwt.sign({ email: user.email, firstName: user.firstName, _id: user._id }, 'RESTFULAPIs') ,
          user
        })
          
        } 
        else { 
            return res.status(400).send({ 
                message : "Wrong Password"
            });
        } 
      
    } 
}); 
}; 
//--------------------------signout---------------------------//
exports.signout =(req,res)=>{
  res.clearCookie("token")
  return res.json({
    message: "user signout"
  })
}

