var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thismytesting@gmail.com',
    pass: 'regainwealth'
  }
});

var mailOptions = {
  from: 'thismytesting@gmail.com',
  to: 'devichandinikhiya@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});