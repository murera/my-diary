import UserModel from '../models/userModels';

const userController = {
  signup(req, res) {
    const {
      status, message, error, data,
    } = UserModel.create(req.body);
    res.status(status).json({
      status, message, error, data,
    });
  },
  login(req, res) {
    const {
      status, message, error, data,
    } = UserModel.signIn(req.body);
    res.status(status).json({
      status, message, error, data,
    });
  },
};
export default userController;
