class AuthService {
    constructor() {
    }
    login(data) {
        console.log(DataTransfer, 'from class');
        return data;
    }
    signup(data) {
        return data;
    }
}
export default new AuthService;
