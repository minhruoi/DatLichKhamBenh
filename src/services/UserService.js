import bcryptjs from "bcryptjs";
import db from '../models/index';


let userHandleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName']
                })
                if (user) {
                    //compare password
                    let check = bcryptjs.compareSync(password, user.password);
                    if (check) {
                        userData.errorCode = 0;
                        userData.errorMessage = 'OK';
                        //remove password before returning user data
                        user.password = undefined;
                        userData.data = user;
                    } else {
                        userData.errorCode = 3;
                        userData.errorMessage = 'Wrong password';
                    }
                }
                else {
                    userData.errorCode = 2;
                    userData.errorMessage = 'User not found';
                }
            }
            else {
                userData.errorCode = 1;
                userData.errorMessage = 'Email does not exist';

            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}



let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    userHandleLogin: userHandleLogin,

}