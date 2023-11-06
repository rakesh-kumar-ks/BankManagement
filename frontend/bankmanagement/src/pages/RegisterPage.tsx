/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormContainer from "../components/formcontainer/FormContainer";
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import ErrorMessage from "../components/errormessage/ErrorMessage";
// import Api from "../http/HttpService";
import Loading from "../components/loader/Loading";
import { useForm ,Controller} from "react-hook-form";
import axios from 'axios';
import '../index.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hooks";
import {regist} from '../actions/userActions';


function RegisterPage() {


    type APiCall = {
      loading?: string;
      error?: string;
    };

    const [countries,setCountries]= useState([]);
    const [states,setStates]= useState([]);
    const [isCalled,setIsCalled]= useState(false);
    const [selectedCountry,setSelectedCountry]= useState<string>('')
    const countriesUrl='https://countriesnow.space/api/v0.1/countries';
    const onlyAlphabetsAndSpaces = /^[A-Za-z\s]+$/;
    const emailPattern= /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    const mobilePattern= /^[0-9]{10}$/;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
    const currentDay = currentDate.getDate();
    const maxDate = `${currentYear}-${currentMonth
    < 10 ? '0' + currentMonth : currentMonth}
    -${currentDay < 10 ? '0' + currentDay : currentDay}`;
    const navigate= useNavigate();
    const dispatch= useAppDispatch();
    const userRegister= useAppSelector((state)=>state.userRegister);
    const {loading,error}:APiCall = userRegister;
    const [age, setAge] = useState(null);


    interface register{
         accounttype:string,
         address:string,
         branchname:string,
         country:string,
         dob:string,
         email:string,
         identificationdocumentno:string,
         identifyproof:string,
         deposit:number,
         mobilenumber:string,
         name:string,
         password:string,
         state:string,
         username:string,
         citizenstatus:string,

    }
   
 

    const getCountries= async()=>{
      return await axios.get(`${countriesUrl}/positions`)
    }
    
    const handleCountryChange= (event: React.SyntheticEvent<HTMLSelectElement>)=>{
        setSelectedCountry(event.currentTarget.value)
      console.log(event.currentTarget.value,selectedCountry,states)
    }
    const getStates= async(country:string)=>{
      return await axios.get(`${countriesUrl}/states/q?country=${country}`)
    }

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
    } = useForm();

 
   
  

    const submitHandler= async(data:any) =>{
      let status:string;
      const birthDate = new Date(data.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const calculateAge = () => {
       
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          setAge(age - 1);
        } else {
          setAge(age);
        }
      };
  console.log(age);
      const checkAge = () => {
        if (age > 60) {
          return status='Senior';
        } 
        else if(age < 18) {
          return status='Minor';
        } else if(age >18 && age<=60){
            status='Normal';
        }
      };
      calculateAge();
      checkAge()

      const registerParams:register = {
        name:data.name,
        username:data.username,
        email:data.email,
        password:data.password,
        accounttype:data.accounttype,
        address:data.address,
        branchname:data.branchname,
        country:data.country,
        dob:data.dob,
        identificationdocumentno:data.identificationdocumentno,
        identifyproof:data.identifyproof,
        deposit:data.initialdeposit,
        mobilenumber:data.mobilenumber,
        state:data.state,
        citizenstatus:status
      }
      console.log(registerParams,age)
    
 
           await   dispatch(regist(registerParams));
           setIsCalled(!isCalled)
            // if(error===''){
            //   navigate('/login')
            // }
           
             
    }

    useEffect(()=>{
      getCountries().then((result:any)=>{
        setCountries(result.data.data)
      })
    },[])

    useEffect(()=>{ 
      if(userRegister.userInfo?.status === 201){
        navigate('/login')
      } else{
        navigate(`/register`) 
      }
   },[isCalled])

    useEffect(()=>{
      console.log(selectedCountry)
      if(selectedCountry !=='Select Country' && selectedCountry !== ''){
        getStates(selectedCountry).then((result:any) => {
          // console.log(result.data.data.states)
           setStates(result.data.data.states)
  
        }) 
      } else{
        setStates([])
      }
     
    },[selectedCountry])


  return (
    <div className='register'>
    <FormContainer>
       {loading && <Loading/>}
        <h3>Sign Up</h3>

          <form onSubmit={handleSubmit(submitHandler)}>

        <div className="form-control">
          <label>Name</label>
          <input type="text"  {...register("name",{ required: true,
                              validate: {
                                matchPattern: (v) => onlyAlphabetsAndSpaces.test(v),
                              },})} />
        </div>
        {errors.name?.type === "required" && (
           <small className="field-error">Name is required</small>
        )}
        {errors.name?.type === "matchPattern" && (
                  <small className="field-error">Name Should only contain alphabets and spaces</small>
                )}

        <div className="form-control">
          <label>User Name</label>
          <input type="text"  {...register("username",{ required: true,
                                validate: {
                                  matchPattern: (v) => onlyAlphabetsAndSpaces.test(v),
                                },})} />
        </div>
        {errors.username?.type === "required" && (
           <small className="field-error">Username is required</small>
           )}
           {errors.username?.type === "matchPattern" && (
           <small className="field-error">Name Should only contain alphabets and spaces</small>
           )}

        <div className="form-control">
          <label>Password</label>
          <input type="password"  {...register("password",{ required: true})} />
        </div>
        {errors.password?.type === "required" && (
           <small className="field-error">Password is required</small>
           )}
           
        <div className="form-control">
          <label>Address</label>
          <textarea  rows={4} cols={50} {...register("address",{ required: true
                                       })}></textarea>
        </div>
        {errors.address?.type === "required" && (
           <small className="field-error">Address is required</small>
           )}

       <div className='form-control'>
        <label>Country</label>
          <Controller
          name="country"
          control={control}
          rules={{required:"Country is required"}}
          defaultValue="" // set default value if needed
          render={({ field }) => (
                <select {...field} onChange={(e) => {field.onChange(e.target.value);
                                                    handleCountryChange(e)}}> 
                <option>Select Country</option>
                {countries.map((option,i)=>{
                    return <option key={i}>{'name' ? option['name'] : option}</option>
                })}
                </select>
              )}
          />
    </div>
    {errors.country?.type === "required" && (
           <small className="field-error">Country is required</small>
           )}

<div className='form-control'>
        <label>State</label>
          <Controller
          name="state"
          control={control}
          rules={{required:"State is required"}}
          render={({ field }) => (
                <select {...field} onChange={(e) => {field.onChange(e.target.value)}}> 
                <option>Select State</option>
                {states.map((option,i)=>{
                    return <option key={i}>{'name' ? option['name'] : option}</option>
                })}
                </select>
              )}
          />
    </div>
    {errors.state?.type === "required" && (
           <small className="field-error">State is required</small>
           )}

         <div className="form-control">
          <label>Email</label>
          <input type="text"  {...register("email",{ required: true,
                              validate: {
                                matchPattern: (v) => emailPattern.test(v),
                              },})} />
        </div>
        {errors.email?.type === "required" && (
           <small className="field-error">Email is required</small>
           )}
         {errors.email?.type === "matchPattern" && (
           <small className="field-error">Invalid Email</small>
           )}

        <div className="form-control">
          <label>Contact no</label>
          <input  type='tel' {...register("mobilenumber",{ required: true,
                              validate: {
                                matchPattern: (v) => mobilePattern.test(v),
                              }})}/>
        </div>
        {errors.mobilenumber?.type === "required" && (
           <small className="field-error">Mobiile Number is required</small>
           )}
         {errors.mobilenumber?.type === "matchPattern" && (
           <small className="field-error">Invalid Mobile Number</small>
           )}

        <div className="form-control">
          <label>Date of Birth</label>
        <Controller
          name="dob"
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              const selectedDate = new Date(value);
              return selectedDate <= currentDate;
            }}}
          render={({ field }) => (
            <input
              type="date"
              id="dob"
              max={maxDate}
              {...field}
            />
          )}
        />
        {errors.dob?.type === "required" && (
           <small className="field-error">DOB is required</small>
           )}
         {errors.dob?.type === "validate" && (
           <small className="field-error">Date of birth cannot be in the future</small>
           )}
        </div>
        
        <div className="form-control">
        <label>Account type</label>
        <Controller
          name="accounttype"
          control={control}
          rules={{required:true}}
          render={({ field }) => (
            <select {...field} onChange={(e) => {field.onChange(e.target.value)}}>
            <option value=''>Select Account type</option>
            <option value='salary'>Salary</option>
            <option value='savings'>Savings</option>
        </select>
              )}
          />
        {errors.accounttype?.type === "required" && (
           <small className="field-error">Account type is required</small>
           )}
        </div>

        <div className="form-control">
          <label>Branch Name</label>
          <input  type='text' {...register("branchname",{required:true})}/>
          {errors.branchname?.type === "required" && (
           <small className="field-error">Branch name is required</small>
           )}
        </div>

        <div className="form-control">
          <label>Initial Deposit Amount</label>
          <Controller
          name="initialdeposit"
          control={control}
          rules={{
            required: "Numeric value is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Invalid input, must be a positive number greater than zero",
            },
          }}
          render={({ field }) => (
            <input
              type="text"
              id="initialdeposit"
              {...field}
              onChange={(e) => {field.onChange(e.target.value)}}
            />
          )}
        />
        {errors.initialdeposit?.type === "required" && (
           <small className="field-error">Initial Deposit is required</small>
           )}
           {errors.initialdeposit?.type === "pattern" && (
           <small className="field-error">Input must be number and greater than zero</small>
           )}
        </div>


        <div className="form-control">
          <label>Identification Proof Type</label>
          <Controller
          name="identifyproof"
          control={control}
          rules={{required:true}}
          render={({ field }) => (
            <select {...field} onChange={(e) => {field.onChange(e.target.value)}}>
           <option value=''>Select Identification Proof</option>
            <option value='authorcard'>Author Card</option>
            <option value='passport'>Pass Port</option>
            <option value='voterid'>Voter Id</option>
            <option value='drivinglicence'>Driving Licence</option>
            <option value='pancard'>Pan Card</option>
        </select>
              )}
          />
        {errors.identifyproof?.type === "required" && (
           <small className="field-error">Identification Proof is required</small>
           )}
        </div>
        <div className="form-control">
          <label>Identification Document No</label>
          <input  type='text' {...register("identificationdocumentno",{required:true})}/>
          {errors.identificationdocumentno?.type === "required" && (
           <small className="field-error">Identification Document no is required</small>
           )}
        </div>
          <Button type="submit" variant="primary" className="mt-3">
               Sign Up
             </Button>
      
      </form>
      {console.log(error)}
      {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}
       <div>
        New Customer ? <Link to='/login'>Login</Link>
        </div>
    </FormContainer>
    </div>
  )
}

export default RegisterPage