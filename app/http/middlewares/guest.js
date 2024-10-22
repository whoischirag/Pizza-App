
function guest(req,res,next){

 if(!req.isAuthenticated()){
    req.next()
 }

 return res.redirect('/')
}



module.exports = guest