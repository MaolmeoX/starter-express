import UserModel from '../models/user';

export class UserService {
  static async getUser(id) {
    return await UserModel.findOne({ _id: id });
  }
}
