const express = require('express');
const router = express.Router();
const justify = require('../util/justify');
const jwt = require('jsonwebtoken');

const accessTokenSecret = '-randomstuff-';
const users = {};
const WORDS_RATE_LIMIT = 80000; // 1000;
const MS_IN_ONE_DAY  =  86400000; // 3600000/12

// auth middleware
const authenticateJWT = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, accessTokenSecret, (err, user ) => {
        req.email = user.email;
        if (err || !users[user.email]) {
            return res.sendStatus(403);
        }
        next();
      });
  } else {
      return res.sendStatus(401);
  }

};
// rate limiting middleware
const tokenBucket = (req,res,next) => {

  const email = req.email;
  if(!users[email].lastReq || Date.now()- users[email].lastReq > MS_IN_ONE_DAY){
    users[email].lastReq = Date.now();
    users[email].count = WORDS_RATE_LIMIT;
    next();
  }else{
    const text = req.body;
    const wordsNumber = text.split(/\s+/).length;
    if(wordsNumber > users[email].count ){
      return res.status(402).end();
    }else{
      next();
    }
  }

}

/*  Text justify route*/ 
router.post('/justify', authenticateJWT ,tokenBucket, function(req, res, next) {

  const contentType = req.headers["content-type"];
  const body = req.body;
  if(!body || contentType!=='text/plain'){
    return res.status(400).json({error:'Bad request'});
  }
  const resultat = justify(body);  
  const wordsNumber = body.split(/\s+/).length;
  // reduce the 
  users[req.email].count -= wordsNumber;
  res.status(200).send(resultat);

});

/* Auth api*/
router.post('/token', function(req, res, next) {

  const body = req.body;
  if(!body || !body.email){
    return res.status(400).json({error:'Bad request'});
  }
  const email = body.email;
  const user = users[email];

  if (!user) {
    // add the new user (without rate limit related attributes)
    users[email]={email}; 
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
