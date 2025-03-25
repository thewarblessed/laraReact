import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/users';

export const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addUser = async (fullName) => {
    const response = await axios.post(API_URL, { full_name: fullName });
    return response.data;
};

export const updateUser = async (id, fullName) => {
    const response = await axios.put(`${API_URL}/${id}`, { full_name: fullName });
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};