import UserModel from '../models/userModels';
import Response from '../helpers/responseHandler';

const userController = {
  signup(req, res) {
    const currentUser = UserModel.create(req.body);
    Response.display(currentUser.status, currentUser.message, currentUser.error, currentUser.data, res);
  },
  login(req, res) {
    
    const signUser = UserModel.signIn(req.body);
    Response.display(signUser.status, signUser.message, signUser.error, signUser.data, res);
  },
};
export default userController;
