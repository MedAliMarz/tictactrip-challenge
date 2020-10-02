const express = require('express');
const router = express.Router();
const justify = require('../util/justify');
const jwt = require('jsonwebtoken');

const accessTokenSecret = '-randomstuff-';
const users = [];


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, _ ) => {
          if (err) {
              return res.sendStatus(403);
          }
          next();
      });
  } else {
      return res.sendStatus(401);
  }
};

/*  Text justify route*/ 
router.post('/justify',authenticateJWT, function(req, res, next) {
  const contentType = req.headers["content-type"];
  const body = req.body;
  if(!body || contentType!=='text/plain'){
    return res.status(400).json({error:'Bad request'});
  }
  const resultat = justify(body);
  res.status(200).send(resultat);
});

/* Auth api*/
router.post('/token', function(req, res, next) {
  const body = req.body;
  if(!body || !body.email){
    return res.status(400).json({error:'Bad request'});
  }
  const email = body.email;
  const user = users.find(user => { return user.email === email });

  if (!user) {
    // add the new user 
    users.push({email});
    // Generate an access token
    const accessToken = jwt.sign({ email: email }, accessTokenSecret);
    return res.status(200).json({
      accessToken
    });
  } else {
      return res.status(403).json({error:'User exists'});
  }
});

module.exports = router;
