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

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // all or id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter: id',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    console.log('message from service: ', message);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter: id'
        });
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser
}   