import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const generateAuthToken = (data) => {
  const token = jwt.sign({ id: data.id, email: data.email }, process.env.JWTSECRET);
  return token;
};

export default generateAuthToken;
