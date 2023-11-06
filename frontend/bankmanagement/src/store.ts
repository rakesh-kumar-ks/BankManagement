import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer,userRegisterReducer,userDepositReducer } from './reducers/userReducers';



const reducer= combineReducers({
   userLogin:userLoginReducer,
   userRegister:userRegisterReducer,
   userDeposit:userDepositReducer,
   
   
})

const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')) : null;


const initialState={userLogin:{userInfo:userInfoFromStorage}};

const middleware=[thunk]
const composeEnhancers= composeWithDevTools({
   trace:true,traceLimit:20
})
const store= createStore(reducer,
                        initialState,
                        composeEnhancers(applyMiddleware(...middleware)))

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>