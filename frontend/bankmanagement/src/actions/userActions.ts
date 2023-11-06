/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_REGISTER_REQUEST,
         USER_REGISTER_SUCCESS,
         USER_REGISTER_FAIL,
         USER_LOGIN_REQUEST,
         USER_LOGIN_FAIL, 
         USER_LOGIN_SUCCESS, 
         USER_LOGIN_LOGOUT,
         USER_GET_PROFILE, 
         USER_GET_PROFILE_REQUEST,
         USER_DEPOSIT_REQUEST,
         USER_DEPOSIT_SUCCESS,
         USER_DEPOSIT_FAIL} from "../constants/userConstant";
import Api from '../http/HttpService';

export const login=(username:any,password:any)=> async (dispatch:any)=>{

    try{
           dispatch({type: USER_LOGIN_REQUEST})
           const {data}  = await Api.post('/auth',{username,password})
           dispatch({type: USER_LOGIN_SUCCESS,payload:data})
          
           localStorage.setItem('userInfo',JSON.stringify(data));
           localStorage.setItem('Id',JSON.stringify(data._id));
           console.log(data)
           console.log(localStorage.getItem('Id'))
      } catch(error:any){
          dispatch({
            type:USER_LOGIN_FAIL,
            payload:
             error.response && error.response.data
             && error.response.data.message
          })
      } 
       
    
}

export const logout= () =>async(dispatch:any)=>{
    await Api.post('/logout',{})
    localStorage.removeItem('userInfo');
    localStorage.removeItem('Id');
    dispatch({type:USER_LOGIN_LOGOUT})
}

export const getUserProfile=()=> async(dispatch:any)=>{
    const id= localStorage.getItem('Id').replace(/^"(.*)"$/, '$1')
    dispatch({type:USER_GET_PROFILE_REQUEST})
    
    const {data} = await Api.get(`profile/${id}`)
    
    dispatch({type:USER_GET_PROFILE,payload:data})
}

export const regist=(params:any)=>async(dispatch:any)=>{

    try{
        dispatch({type: USER_REGISTER_REQUEST});

        const {data}  = await Api.post('/',params);

        dispatch({type: USER_REGISTER_SUCCESS,payload:data});
    } catch(error:any){
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:
             error.response && error.response.data
             && error.response.data.message 
          })
    }
  
}

export const deposit=(params:any)=>async(dispatch:any)=>{
    const id= localStorage.getItem('Id').replace(/^"(.*)"$/, '$1')

    try{
        dispatch({type: USER_DEPOSIT_REQUEST});

        const {data}  = await Api.put(`profile/${id}`,params);

        dispatch({type: USER_DEPOSIT_SUCCESS,payload:data});
    } catch(error:any){
        dispatch({
            type:USER_DEPOSIT_FAIL,
            payload:
             error.response && error.response.data
             && error.response.data.message 
          })
    }
  
}