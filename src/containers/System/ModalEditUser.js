import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _, { add } from 'lodash';


class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userEdit.id || '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }
    componentDidMount() {
        let user = this.props.userEdit;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode', // Password is hardcoded for editing purposes
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        // Handle input changes here
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });

    }

    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'>
                <ModalHeader toggle={() => { this.toggle() }}>Edit user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input type='email' className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                    value={this.state.email}
                                    disabled
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Password</label>
                                <input type='password' className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                    value={this.state.password}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>First Name</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Last Name</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                    value={this.state.lastName}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 form-group'>
                                <label>Address</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
