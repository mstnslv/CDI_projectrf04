import axios from './axios';

export const getMainData = () => {
    return axios.get('/main/getMainData');
};

export const getFilterData = () => {
    return axios.get('/filter/getFilterData');
};

export const filterCars = (payload) => {
    return axios.post('/filter/filter',payload);
};

export const getCar = (payload) => {
    return axios.get('/car/getCar', { params:payload});
};

export const contactMe = (payload) => {
    return axios.post('/main/contactMe', { data:payload});
};