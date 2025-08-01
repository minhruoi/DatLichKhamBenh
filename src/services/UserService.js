import bcryptjs from "bcryptjs";
import db from '../models/index';
import { where } from "sequelize";
import e from "express";

const salt = bcryptjs.genSaltSync(10);


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcryptjs.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(e);
        }
    })
}


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
            let user = await db.User.findOne({
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'] // Exclude password from the result
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'] // Exclude password from the result
                    }
                })
            }

            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                return resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in use, please try another email!'
                });
            }

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })

            return resolve({
                errCode: 0,
                errMessage: 'User created successfully!'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }
            await db.User.destroy({
                where: { id: userId }
            });
            resolve({
                errCode: 0,
                errMessage: 'User deleted successfully!'
            })
        } catch (error) {
            reject(error);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                });
            }

            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
            }

            resolve({
                errCode: 0,
                errMessage: 'Update the user successfully!'
            });
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    userHandleLogin: userHandleLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}