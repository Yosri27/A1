import userModel from "../../database/model/user.model.js";
import { DatabaseRepository } from "../../database/reposatory/base.reposatory.js";
import { BadRequestException } from "../../common/exceptions/application.exceptions.js";
export class UserService {
    userReposatory;
    constructor() {
        this.userReposatory = new DatabaseRepository(userModel);
    }
    async getUserprofile(userid) {
        let userdata = await this.userReposatory.findById(userid, "-password");
        if (!userdata) {
            throw new BadRequestException("no data found");
        }
        return userdata;
    }
}
export const userservice = new UserService();
