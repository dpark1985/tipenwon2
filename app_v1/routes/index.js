var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var client = mysql.createConnection({
	user: 'root',
	password: 'dp980605',
	database: 'tipenwon'
});

var id = '';
var pw = '';

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
  id = '';
  pw = '';
});

/* POST home page. */
router.post('/', function(req, res) {
  id = req.body.userId;
  pw = req.body.userPw;
  //console.log('====================' + id + ' ' + pw + '====================');
  
  client.query('SELECT * FROM membership WHERE (userid = ?) AND (userpw = ?)', [id, pw], function(error, results, fields){
  	if(error){
  		console.log('==============query error===================');
  	} 
    if(results.length > 0){
      console.log('==============query good===================');
      console.log(results[0].userid + ' ' + results[0].userpw);
      res.redirect('/timeinout'); 
    }else{
      console.log('==============query bad===================');
      res.redirect('/signup');
    }
  });
});

/* GET timeinout page. */
router.get('/timeinout', function(req, res){
	var serverTime = new Date();
	console.log('==============timeinout===================');
	//console.log('====================' + id + ' ' + pw + '====================');
	client.query('SELECT * FROM membership WHERE userid=?', [id], function(error, results, field){
		if(error){
      console.log('error');
    } else{
      res.render('timeinout', {
        userid : results[0].userid,
        data : results[0],
        currentTime : serverTime
      });
      console.log(results[0].id);
    }
    
	});
});

/* POST timeinout page. */
router.post('/timeinout', function(req, res){
	client.query('')
});

/* GET singup page. */
router.get('/signup', function(req, res){
  res.render('singup', { title: 'Express' });
});

/* POST singup page. */
router.post('/signup', function(req, res){

});


module.exports = router;
