import joi from 'joi';
import data from '../data/data';
import helper from '../middleware/helper';
import schema from '../middleware/validation';
import Response from '../helpers/responseHandler';
import {
  BAD_REQUEST, REQUEST_CONFLICT, RESOURCE_CREATED, NOT_FOUND, UNAUTHORIZED, SERVER_ERROR, REQUEST_SUCCEDED,
} from '../helpers/statusCode';

class UserModel {
signup = (details) => {
  const { error } = joi.validate(
    details, schema.user,
	  );
	  if (error !== null) {
	    return Response.error(BAD_REQUEST, error.details[0].message);
		  }
	  const {
	    email, firstName, lastName, password,
	  } = details;
	  const hashedPassword = helper.hashThePassword(password);
	  const newUser = {
	    email, firstName, lastName, hashedPassword,
	  };
	  const already = data.users.find((user) => user.email === email);
	  if (already) {
	    return Response.error(REQUEST_CONFLICT, 'User already exist');
	  }

	  if (data.users.length === 0) {
	    newUser.id = 1;
	  } else {
	    newUser.id = data.users[data.users.length - 1].id + 1;
	  }
	  const output = { firstName, lastName, email };
	  output.id = newUser.id;
	  const { id } = output;
	  newUser.createdDate = new Date();
	  output.createdDate = newUser.createdDate;
	  data.users.push(newUser);
	  const payload = {
	    id, firstName, lastName, email,
	  };
	  const token = helper.getToken(payload);
	  return Response.success(RESOURCE_CREATED, 'User created successfully', { token, ...output });
}

login = (userDetails) =>{
	  const {
	    email, password,
	  } = userDetails;

	  if (!email || !password) {
	    return Response.error(BAD_REQUEST, 'All fields are required');
	  }
	  const me = data.users.find((user) => user.email === email);
	  if (!me) {
	    return Response.error(NOT_FOUND, 'User Not found');
	  }
	  const {
	    lastName, firstName, id, hashedPassword,
	  } = me;
	  try {
	    if (!helper.checkThepassword(hashedPassword, password)) {
	      return Response.error(UNAUTHORIZED, 'The password is incorrect');
	    }
	  } catch (error) {
	    return Response.error(SERVER_ERROR, 'internal error');
	  }
	  const payload = {
	    id, firstName, lastName, email,
	  };
	  const token = helper.getToken(payload);

	  if (me.email === email) {
	    return Response.success(REQUEST_SUCCEDED, 'user successfully logged in', { token, ...payload });
	  }
}
}
module.exports = new UserModel();
