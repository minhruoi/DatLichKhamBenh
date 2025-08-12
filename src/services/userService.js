import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

const handleGetAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`);
}

const handlecreateNewUserService = (data) => {
    return axios.post('api/create-new-user', data);
}

const handleDeleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const handleEditUserService = (data) => {
    return axios.put('api/edit-user', data);
}
export { handleLoginApi, handleGetAllUsers, handlecreateNewUserService, handleDeleteUserService, handleEditUserService };