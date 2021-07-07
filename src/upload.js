const fs = require('fs');
const AWS = require('aws-sdk');
var bodyParser = require('body-parser')
const { json } = require('body-parser');

exports.uploadfile=(req,res)=>{
    const file= req.body;
   
      console.log(file)
    res.status(200).json({ file: file });
    //  const s3 = new AWS.S3({
    //     accessKeyId: "AKIAIXUDTFFMCHESNU3Q",
    //     secretAccessKey:"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",
    // });


    // const BUCKET_NAME = 'devsa';

   
    // const params = {
    //     Bucket: BUCKET_NAME,
    //     Key: 'filename', 
    //     Body: file
    // };

  
    // s3.upload(params, function(err, data) {
    //     if (err) {
    //         return res.status(400).json({err})
    //     }
    //     return res.status(200).json({data})
    // });
};
