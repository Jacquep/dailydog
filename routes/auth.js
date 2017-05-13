
var auth = function( req, res, next){
	console.log(req.session, req.session.id, req.session.email)
	if(req.session && req.session.id && req.session.email){
		console.log("you are a success");
		return next();
	}
	else{
		console.log("you are a failure");
		return res.sendStatus(401);
	}
}


module.exports = auth;