import UserModel from '../models/userModels';
import Response from '../helpers/responseHandler';

const userController = {
  signup(req, res) {
    const register = UserModel.create(req.body);
    Response.display(register.status, register.message, register.error, register.data, res);
  },
  login(req, res) {
    const makeNewUser = UserModel.signIn(req.body);
    Response.display(makeNewUser.status, makeNewUser.message, makeNewUser.error, makeNewUser.data, res);
  },
};
export default userController;
