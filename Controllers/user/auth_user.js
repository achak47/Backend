const Users = require("../../Models/User");
const Email = require("../../Models/emailuser");
CLIENT_URL="https://wild-plum-bunny-tam.cyclic.app";
const nodemailer = require('nodemailer');

const register = async(req,res,bcrypt,jwt)=>{
    const { email,name,password } = req.body ;
    if(!email || !name || !password){
        return res.status(200).json('Pls Enter the credentials properly') ;
    }
    Users.find({'email':email},async(err,result)=>{
        if(result.length){
            res.status(200).json("User with same mail already exists !") ;
        }
        else{
        const token = jwt.sign ({name, email, password }, process.env.ACTIVATE_API_KEY, {expiresIn : '30m'});
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'admin@flirtaid.social', // generated ethereal user
              pass: 'Bekarapp@123', // generated ethereal password
            },
            tls:{rejectUnauthorized:false}
          });
            let mailOptions = {
                from : 'admin@flirtaid.social',
                to:email,
                subject: "Verification mail from Lottle",
                text : "Welcome to Lottle ! ",
                html : `
                <h2>Please click on the given link to activate your account</h2>
                <a href="${CLIENT_URL}/verifytoken/${token}">Click Here to verify</a>
                <p>Pls do it within 30 minutes</p>
                <p>If the above link is not working then browse to ${CLIENT_URL}/verifytoken/${token} </p>
                `
              }
              let info = transporter.sendMail (mailOptions, (error, info) => {
                if(error) {
                  console.log (error);
                  res.status(500).json ({yo : 'error'});
                }else {
                  console.log ('Message sent : ' + info.response);
                  res.status(200).json ('Mail sent successfully !');
                };
                return res.end();
              });
        }
    })
}

const login = (req,res,bcrypt,jwt)=>{
    const {email, password} = req.body ;
    Users.find({'email':email},(err,result)=>{
      if(result.length)
      {
        if(bcrypt.compareSync(password , result[0].password))
        {
          const {name} = result[0] ;
          const api_key = process.env.ACTIVATE_API_KEY ;
          const token = jwt.sign ({name, email, password}, api_key, {expiresIn : '60m'});
          res.status(200).json({token}) ;
        }
        else res.status(400).json("Wrong Password") ;
      }
      else{
        return res.status(200).json('No such user exists , Pls register !') ;
      }
    })
}
const getuser = (req,res,jwt,bcrypt)=>{
    const {token} = req.params ;
    if(token){
      jwt.verify(token,process.env.ACTIVATE_API_KEY,(err, decodedToken)=>{
        if(err){
          res.status(200).json("Your current Session is timed out, Pls Login Again") ;
        }
        else{
          const {name,email,password} = decodedToken ;
          const hash = bcrypt.hashSync(password) ;
          new Users({
            name,
            email,
            password:hash
          }).save((err,result)=>{
        res.status(200).json(decodedToken) ;
          }) ;
        }
      })
    }
    else{
      res.status(400).json("Invalid token") ;
    }  
}

const registeremail = (req,res)=>{
   let {email,mobile} = req.body ;
   new Email({
       contact:(email?email:mobile)
   }).save((err,result)=>{
    if(err) res.status(200).json((email?"Email":"Phone")+" Already added !") ;
    else
    res.status(200).json("REGISTERED SUCCESFULLY") ;
   }) ;
}

const checkuser = async(req,res)=>{
  const {email,name} = req.body ;
  console.log(email,name)
  const user = await Users.findOne({'email':email}) ;
  if(!user){
    new Users({
      name,
      email,
      password:"",
      phone:""
    }).save((err,result)=>{
      if(err){
        console.log(err);
        return;
   }
  res.status(200).json("Signed Up Succesfully !!!") ;
    }) ;
  }
  else req.status(200).json(user) ;
}
module.exports = {
    register,
    login,
    getuser,
    registeremail,
    checkuser
}