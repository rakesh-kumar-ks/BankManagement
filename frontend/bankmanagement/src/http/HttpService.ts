/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';    

// Create instance called instance
// const token = localStorage.getItem('token');
// console.log(token)
const instance = axios.create({
    baseURL: 'http://localhost:5000/api/users',
    headers: {
        'content-type':'application/json',
        'x-rapidapi-host':'example.com',
        // 'Authorization':token ? `Bearer ${token}` : ''
    },
});
export default {
    get: (url: any) =>
    instance({
        'method':'GET',
        'url':url,
    }),
    post: (url: any,obj: any) =>
    instance({
        'method': 'POST',
        'url':url,
        'data': obj
    }),
    put: (url: any,obj: any) =>
    instance({
        'method': 'PUT',
        'url':url,
        'data': obj
    })
}