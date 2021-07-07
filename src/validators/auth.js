const { check, validationResult } =require('express-validator');

exports.Validatesignuprequest =
    [
        check('firstname').notEmpty().withMessage("Please Enter Your firstname") ,
        check("lastname").notEmpty().withMessage('Please Enter Lastname '),
        check('email').isEmail().withMessage('Valid Email is required'),
        check('password').isLength({min:6}).withMessage('Password must be at least 6 charactors long'),
     ];


     exports.Validatesigninrequest =
    [
      
        check('email').isEmail().withMessage('Valid Email is required'),
        check('password').isLength({min:6}).withMessage('Password must be at least 6 charactors long'),
     ];

    
