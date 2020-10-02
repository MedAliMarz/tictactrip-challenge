const express = require('express');
const router = express.Router();
const justify = require('../util/justify');


/*  Text justify route*/ 
router.post('/justify', function(req, res, next) {
  const contentType = req.headers["content-type"];
  const body = req.body;
  if(!body || contentType!=='text/plain'){
    return res.status(400).json({error:'Bad request'});
  }
  const resultat = justify(body);
  res.status(200).send(resultat);
});

module.exports = router;
