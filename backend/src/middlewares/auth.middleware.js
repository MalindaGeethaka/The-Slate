import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function checkAuth(req,res,next) {
  console.log("request checked");

  if (req.headers.authorization == null){
    return res.status (404).send("auth requested")
  }
  else{
    const token = req.headers.authorization

    try{
      const isValid = jwt.verify(token,process.env.JWT_SECRET);
      req.user = isValid;
    
    if (isValid){
      next();
    }else{
      return res.status(401).send("unauthorized");  
  }
}  catch (error){
    return res.status(500).send("server error");
  }}};

  export default checkAuth;