import { BadRequestException, NotFoundException } from "../../common/exceptions/application.exceptions.js";
import userModel from "../../database/model/user.model.js";
import { DatabaseRepository } from "../../database/reposatory/base.reposatory.js";
import { sendEmail } from "../../email/sendemail.js";
import { SecurityService } from "../../common/utils/security/index.js";
import { redisService } from "../../services/redis.service.js";
import { TokenService } from "../../services/token.service.js";
import { ProviderEnums } from "../../enums/user.enums.js";
class AuthService {
    userModel;
    userRepository;
    securityservice;
    redisService;
    tokenService;
    constructor() {
        this.userModel = userModel;
        this.userRepository = new DatabaseRepository(this.userModel);
        this.securityservice = new SecurityService;
        this.redisService = redisService;
        this.tokenService = new TokenService;
    }
    async login(data) {
        let { email, password } = data;
        let existUser = await this.userRepository.findOne({ email, provider: ProviderEnums.System });
        if (existUser) {
            // console.log(existUser.role);
            // let { token } = generateToken(existUser,host)
            // console.log(token);
            // console.log(signature);
            const isMatched = await this.securityservice.compareHash({ plaintext: password, cyphertext: existUser.password });
            if (isMatched) {
                let { accessToken, refreshToken } = this.tokenService.generateToken(existUser);
                return { existUser, accessToken, refreshToken };
            }
            else {
                throw new BadRequestException("password dont match");
            }
        }
        else {
            return new NotFoundException("user not found");
        }
    }
    async signup(data) {
        data.password = await this.securityservice.generateHash({ plaintext: data.password });
        let result = await this.userRepository.create(data);
        if (!result) {
            throw new BadRequestException('failed to create user');
        }
        let code = Math.floor(Math.random() * 100000);
        let hashOtp = await this.securityservice.generateHash({ plaintext: String(code) });
        await this.redisService.set({ key: `otp::${result._id}`, value: hashOtp });
        await sendEmail({
            to: data.email,
            subject: "Welcome to our Social Media App!",
            html: `<h1>Welcome, ${data.userName}!</h1><p>Thank you for signing up for our social media app. We're excited to have you on board!</p><p>Best regards,<br/>The Social Media App Team and your code: ${code}</p>`
        });
        return result;
    }
    async verifyEmail({ code, email }) {
        let user = await this.userRepository.findOne({ email });
        if (user?.confirmEmail) {
            return " tanyyyyyyyyyy ?";
        }
        if (!user) {
            throw new BadRequestException('User not found');
        }
        let redisCode = await this.redisService.get(`otp::${user._id}`);
        if (!redisCode) {
            throw new BadRequestException('Invalid or expired OTP');
        }
        //     if (await this.securityservice.compareHash({plaintext: code, cyphertext: redisCode}))
        //     {
        //       user = await this.userRepository.findOneAndUpdate({_id: user._id}, {confirmEmail: true}, {new: true})
        //     if (!user)
        //     {
        //             throw new BadRequestException('User not found')
        //     }
        //         this.redisService.redis_delete(`otp::${user._id}`)
        // }
        //     else
        //     {
        //         throw new BadRequestException('Invalid OTP')
        // }
        // }
    }
    async signupMail(data) {
        const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: data.token,
            audience: ""
        });
        const payload = ticket.getPayload();
        if (payload.email_verified) {
            throw BadRequestException("email not verified");
        }
        let exsistUser = await findOne({ model: UserModel, filter: { email: payload.email } });
        if (exsistUser) {
            throw conflictException("user already exist");
        }
        else {
            let addedUser = await insertOne({
                model: UserModel,
                data: {
                    userName: payload.name,
                    email: payload.email
                }
            });
            if (addedUser) {
                return addedUser;
            }
            else {
                throw BadRequestException("fe 7aga 8lt");
            }
        }
    }
}
export default new AuthService;
