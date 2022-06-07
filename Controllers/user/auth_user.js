const Users = require("../../Models/Users");
CLIENT_URL="https://lottle-api.herokuapp.com/";

const register = async(req,res,bcrypt,jwt)=>{
    console.log(req.body) ;
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
            service:'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'hosteer177@gmail.com', // generated ethereal user
              pass: 'Bekarapp123#', // generated ethereal password
            },
            tls:{rejectUnauthorized:false}
          });
            let mailOptions = {
                from : 'hosteer177@gmail.com',
                to:email,
                subject: "Verification mail from Lottle",
                text : "Welcome to Lottle ! ",
                html : `
                <h2>Please click on the given link to activate your account</h2>
                <a href="${CLIENT_URL}/authentication/${token}">Click Here to verify</a>
                <p>Pls do it within 30 minutes</p>
                <p>If the above link is not working then browse to ${CLIENT_URL}/authentication/${token} </p>
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
          const api_key = process.env.api_key ;
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
const getuser = (req,res,jwt)=>{
    const {token} = req.params ;
    if(token){
      jwt.verify(token,process.env.api_key,(err, decodedToken)=>{
        if(err){
          res.status(200).json("Your current Session is timed out, Pls Login Again") ;
        }
        else{
        res.status(200).json(decodedToken) ;
        }
      })
    }
    else{
      res.status(400).json("Invalid token") ;
    }  
}



module.exports = {
    register,
    login,
    getuser
}