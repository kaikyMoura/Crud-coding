const express = require('express');
const app = express();
const contaRoutes = express.Router();

let Conta = require('../model/Conta');

// api to add conta
contaRoutes.route('/add').post(function (req, res) {
  let conta = new Conta(req.body);
  conta.save()
  .then(conta => {
    res.status(200).json({'status': 'success','mssg': 'conta added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get contas
contaRoutes.route('/').get(function (req, res) {
  Conta.find(function (err, contas){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','contas': contas});
    }
  });
});

// api to get conta
contaRoutes.route('/conta/:id').get(function (req, res) {
  let id = req.params.id;
  Conta.findById(id, function (err, conta){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','conta': conta});
    }
  });
});

// api to update route
contaRoutes.route('/update/:id').put(function (req, res) {
    Conta.findById(req.params.id, function(err, conta) {
    if (!conta){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        conta.name = req.body.name;
        conta.email = req.body.email;
        conta.cpf = req.body.cpf;
        conta.phone_number = req.body.phone_number;

        conta.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
contaRoutes.route('/delete/:id').delete(function (req, res) {
  Conta.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = contaRoutes;