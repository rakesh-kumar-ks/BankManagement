/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import FormContainer from "../components/formcontainer/FormContainer";
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import Loading from '../components/loader/Loading'
import ErrorMessage from "../components/errormessage/ErrorMessage";
import '../index.css';
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../hooks/Hooks";
import {useEffect, useState} from 'react';



function LoginPage() {

  type APiCall = {
    loading?: string;
    error?: string;
  };


    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  const dispatch= useAppDispatch()
    const userLogin= useAppSelector((state)=>state.userLogin);
    const {loading,error}:APiCall = userLogin;
    const [isCalled,setIsCalled]= useState(false);
    const navigate=useNavigate()

    const submitHandler= async (data: { username: any; password: any; }) => {
    await dispatch(login(data.username,data.password));
       setIsCalled(!isCalled)
     }

  useEffect(()=>{ 
    console.log(userLogin)
     if(userLogin.userInfo?.status === 201){
       navigate(`/profile/${userLogin.userInfo?._id?.replace(/^"(.*)"$/, '$1')}`) 
     } else{
      navigate('/login')
     }
  },[isCalled])




  return (<>
    {loading && <Loading/>}
    <FormContainer>
    
    <h3>Sign In</h3>
     <form onSubmit={handleSubmit(submitHandler)}>
    <div className="form-control">
      <label className="form-label">User Name</label>
      <input type="text"  {...register("username",{required:true})} />
      {errors.username?.type === "required" && (
       <small className="field-error">User Name is required</small>
    )}
    </div>
    <div className="form-control">
      <label className="form-label">Password</label>
      <input type="password"  {...register("password",{required:true})} />
      {errors.password?.type === "required" && (
       <small className="field-error">Password is required</small>
    )}
    </div>
   
      <Button type="submit" variant="primary" className="mt-3">
           Sign In
         </Button>
  
  </form>
    {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}
   <div>
    New Customer ? <Link to='/register'>Register</Link>
    </div>
    
</FormContainer>
    </>
   
  )
}

export default LoginPage