import UserModel from '../models/userModels';
const userController = {
	signup(req, res) {
		const { status,  message, error, data } = UserModel.signup(req.body);
		res.status(status).json({ status, message ,error, data });
	},
	login(req, res) {
		const { status, message,error,data } = UserModel.login(req.body);
		res.status(status).json({ status, message, error,data });
	}
};
export default userController;