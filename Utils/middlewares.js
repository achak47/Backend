const checkAdmin = (req,res)=>{
    if(!req.body.admin) res.status(400).json("Access Denied !!!") ; 
}

module.exports = {
    checkAdmin
}