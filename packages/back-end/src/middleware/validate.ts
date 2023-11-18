import {NextFunction, Request, Response} from 'express';
import validator from 'validator';

export function validate(req: Request, res: Response, next: NextFunction) {
  
  const currentUrl = req.originalUrl;
  const data = { username:"", password:"", displayName:"",confirmPass:""};
  if(currentUrl.includes("login")){
    data.username = req.body.username;
    data.password = req.body.password;
  }
  else{
    data.username = req.body.username;
    data.password = req.body.password;
    data.displayName = req.body.displayName;
    data.confirmPass = req.body.confirmPass;
  }
  const {username, password, displayName,confirmPass} = data;
  
  const validations = [
    { field: "username", value: username, min: 3, max: 20, message: "Username must be between 3 and 20 characters long." },
    { field: "password", value: password, min: 8, max: 20, message: "Password must be between 8 and 20 characters long." },
    { field: "displayName", value: displayName, min: 3, max: 20, message: "Display Name cannot be empty." },
    { field: "confirmPass", value: confirmPass, min: 3, max: 20, message: "Password doesn't match." }
  ];
 
  for (const validation of validations) {
    const { field, value, min, max, message } = validation;

    if (field === "displayName" && currentUrl.includes("login")) {
      continue; // Skip validation for displayName in login URL
    }
    
    if (field === "confirmPass" && currentUrl.includes("register") && confirmPass !== password) {
      return res.status(400).json({ error: message });
    }

    if(currentUrl.includes("register"))
    if (!validator.isLength(value, { min, max }) || validator.isEmpty(value)) {
      const error = field === "displayName" ? `${field} cannot be empty.` : message;
      return res.status(400).json({ error });
    }
    
  }
  next();
}