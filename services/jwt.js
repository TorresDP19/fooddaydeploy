'use strict';

const
    jwt = require ('jwt-simple'),
    moment = require ('moment'),
	config = require('../config')
;

exports.createToken = function(users) {
	let payload = {
		sub: users._id,
		name: users.name,
		fathersurname: users.fathersurname,
		mothersurname: users.mothersurname,
		creditcard: users.creditcard,
		nip: users.nip,
		expiration_date: users.expiration_date,
		email: users.email,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix
	};

	return jwt.encode(payload, config.TOKEN_SECRET);
};