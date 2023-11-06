/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_LOGIN_FAIL, 
        USER_LOGIN_LOGOUT, 
        USER_LOGIN_REQUEST, 
        USER_LOGIN_SUCCESS,
        USER_GET_PROFILE,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL, 
        USER_GET_PROFILE_REQUEST,
        USER_DEPOSIT_REQUEST,
        USER_DEPOSIT_SUCCESS,
        USER_DEPOSIT_FAIL} from "../constants/userConstant";

        
export const userLoginReducer= (state={},action:any)=>{
    switch (action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true};
        case USER_LOGIN_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_LOGIN_FAIL:
            return {loading:false,error:action.payload}
         case USER_GET_PROFILE_REQUEST:
            return {loading:true};
        case USER_GET_PROFILE:
            return {loading:false,userInfo: action.payload,userProfile:action.payload};
        case USER_LOGIN_LOGOUT:
            return {};
        default:
        return state;
    }
}

export const userRegisterReducer= (state={},action:any)=>{
    switch (action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload}
        default:
        return state;
    }
}

export const userDepositReducer= (state={},action:any)=>{
    switch (action.type){
        case USER_DEPOSIT_REQUEST:
            return {loading:true};
        case USER_DEPOSIT_SUCCESS:
            return {loading:false, userInfo: action.payload};
        case USER_DEPOSIT_FAIL:
            return {loading:false,error:action.payload}
        default:
        return state;
    }
}

