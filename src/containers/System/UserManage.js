import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { handleGetAllUsers, handlecreateNewUserService, handleDeleteUserService, handleEditUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayUsers: [],
            isOpenModalUser: false, // Control modal visibility
            isOpenModalEditUser: false,
            userEdit: {}, // Store user data for editing
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await handleGetAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrayUsers: response.users,
            })
        }

    }

    handleCreateNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    }

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    }
    toggleModalEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        });
    }
    createNewUser = async (data) => {
        try {
            let respone = await handlecreateNewUserService(data);
            if (respone && respone.errCode === 0) {
                this.setState({
                    isOpenModalUser: false,
                });
                await this.getAllUserFromReact();
                alert('Create a new user succeed!');
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            } else {
                alert(respone.errMessage);
            }
            console.log('respone create new user: ', respone);
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        console.log(user);
        try {
            let respone = await handleDeleteUserService(user.id);
            if (respone && respone.errCode === 0) {
                await this.getAllUserFromReact();
                alert('Delete the user succeed!');
            } else {
                alert(respone.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user: ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user, // Set the user data to be edited
        })
    }
    doEditUser = async (data) => {
        try {
            let respone = await handleEditUserService(data);
            if (respone && respone.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false,
                });
                await this.getAllUserFromReact();
                alert('Edit the user succeed!');
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            } else {
                alert(respone.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />

                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleModalEditUser}
                        userEdit={this.state.userEdit}
                        editUser={this.doEditUser}  // Reusing the createNewUser function for editing
                    />
                }
                <div className="title text-center">User Manage</div>
                <div>
                    <button
                        className='btn btn-primary px-3 mx-3'
                        onClick={() => this.handleCreateNewUser()} >
                        <i className='fa fa-plus'></i>Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-3'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {this.state.arrayUsers && this.state.arrayUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash-alt'></i></button>
                                    </td>
                                </tr>
                            )
                        })
                        }


                    </table>
                </div>

            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
