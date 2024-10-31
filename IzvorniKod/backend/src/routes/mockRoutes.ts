import {Router,Request,Response} from 'express';
import bcrypt = require('bcrypt');
const {body,validationResult} = require('express-validator');
const mockRouter=Router();
mockRouter.get('/login',(req: Request, res: Response)=>{
  const message={text: "Login failed: no such email in database"};
  res.json(message);
});
mockRouter.get('/test',(req:Request, res:Response)=>{
  res.json({status:"ok"});
})
mockRouter.post('/register', (req:Request, res:Response)=>{
  const email=req.body.email;
  const password=bcrypt.hash(req.body.password,10);
  const firstName=req.body.firstname;
  const lastName=req.body.lastname;
  let resMessage="";
  const newUser = {
    email: email,
    passowrd: password,
    first_name:firstName,
    last_name:lastName
  }
  let testEmail="john.doe@gmail.com";
  if(!newUser.email.isEmail()){
    resMessage="ne valja email";
  }else if(newUser.email===testEmail){
    resMessage="email već postoji";
  }
  res.json(resMessage)
});

mockRouter.post('/login',async (req:Request, res:Response)=>{
  const email=req.body.email;
  const password=req.body.password
  let resMessage="";
  const testUser={
    email: "john.doe@gmail.com",
    password: bcrypt.hash("80085",10)
  }
  let testEmail="john.doe@gmail.com";
  const loginUser = {
    email: email,
    password: password,
  }
  if(loginUser.email!=testEmail){
    resMessage="Ne postoji korisnički račun s tom email adresom";
  }else{
    const isMatch=await bcrypt.compare(loginUser.password,await testUser.password);
    if(isMatch){
      resMessage="radi!";
    }else{
      resMessage="ne valja password";
    }
  }
  res.json(resMessage);
})
export default mockRouter;