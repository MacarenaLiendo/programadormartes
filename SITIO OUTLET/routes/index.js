var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
var novedadesModel = require('../models/novedadesModel');


/* GET home page. */
router.get('/', async function(req, res, next) {

var novedad = await novedadesModel.getNovedades()

  res.render('index', {
    novedades
  });
});

router.post('/', async (req,res,next) => {

  console.log(req.body)

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.tel;
  var mensaje = req.body.mensaje;

  var obj = {
    to:'macarenaliendo475@gmail.com',
    subject: 'contacto desde la web',
    html: nombre + ' ' + apellido + ' se contacto y quiere mas info a este correo: '
     + email + '. <br> Ademas, envio el siguiente mensaje: ' + mensaje + ', <br> Su tel es: ' + telefono
  }

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    }
  })

  var info = await transporter.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente',
  });
})

module.exports = router;
