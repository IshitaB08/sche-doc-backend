const { check, validationResult } =require('express-validator');

exports.Validatesignuprequest =
    [
        check('fullname').notEmpty().withMessage("Please Enter Your fullname") ,
        check('email').isEmail().withMessage('Valid Email is required'),
        check('password').isLength({min:6}).withMessage('Password must be at least 6 charactors long'),
     ];


     exports.Validatesigninrequest =
    [
      
        check('email').isEmail().withMessage('Valid Email is required'),
        check('password').isLength({min:6}).withMessage('Password must be at least 6 charactors long'),
     ];

    
