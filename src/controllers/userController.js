import userService from '../services/UserService';



let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check if email exists in the database
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameters'
        });
    }
    let userData = await userService.userHandleLogin(email, password);
    //password should be hashed and compared with the stored hash
    //return a success message if login is successful
    //access token: JWT (jsonwebtoken)
    return res.status(200).json({
        errCode: userData.errorCode,
        message: userData.errorMessage,
        user: userData.data || {}

    });
}

module.exports = {
    handleLogin: handleLogin,
}   