
import {useEffect, useState} from 'react'
import { useAppSelector,useAppDispatch} from '../../hooks/Hooks';
import { Button, Card, Container, Modal } from 'react-bootstrap';
import { getUserProfile ,deposit} from '../../actions/userActions';
import '../../index.css'
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import Loading from '../loader/Loading';
import ErrorMessage from '../errormessage/ErrorMessage';



function Profile() {
  const dispatch= useAppDispatch()
  const userLogin= useAppSelector((state)=>state.userLogin);
  const userDeposit= useAppSelector((state)=>state.userDeposit);
  const [showModal, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
   };

  const handleShow = () => setShow(true);
  const navigate=useNavigate();
  const {loading,error}:APiCall = userLogin;
  const [isCalled,setIsCalled]= useState(false);
  const handleApplyLoan=()=>{
    navigate('/loan')
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

    useEffect(()=>{
   dispatch(getUserProfile())
    },[])

    const {userProfile}= userLogin;
    const profileData= {...userProfile};
    const availabeBalance= profileData?.deposit || 0;
    const submitHandler= async (data:any ) => {
      console.log(data)
     await dispatch(deposit(data));
     await dispatch(getUserProfile())
     console.log(userDeposit.userInfo.status)
     if(userDeposit.userInfo.status){
       setShow(false) 
     }
  
       }

  return (<div style={{height:'100vh',marginBottom:'100px'}}>
    {loading ? <Loading/> : (<>
      <Container className='d-flex justify-content-center'>
      <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75' style={{height:'90vh'}}>
            <h1 className='text-center mb-4'>Profile</h1>
            <div className='Profile-Container'>
            <div>
            <span>Name : </span>
            <span className='font-bold'> {profileData.name || 'NA'}</span>
            </div>
            <div>
            <span>User Name : </span>
            <span className='font-bold'> {profileData.username || 'NA'}</span>
            </div>
            <div>
            <span>Email : </span>
            <span className='font-bold'> {profileData.email || 'NA'}</span>
            </div>
            <div>
            <span>Account Type : </span>
            <span className='font-bold'> {profileData.accounttype || 'NA'}</span>
            </div>
            <div>
            <span>Address : </span>
            <span className='font-bold'> {profileData.address || 'NA'}</span>
            </div>
            <div>
            <span>Branch Name : </span>
            <span className='font-bold'>  {profileData.branchname || 'NA'}</span>
            </div>
            <div>
            <span>Country : </span>
            <span className='font-bold'> {profileData.country || 'NA'}</span>
            </div>
            <div>
            <span>State : </span>
            <span className='font-bold'> {profileData.state || 'NA'}</span>
            </div>
            <div>
            <span>D-O-B : </span>
            <span className='font-bold'> {profileData.dob || 'NA'} </span>
            </div>
            <div>
            <span>Identify Proof : </span>
            <span className='font-bold'> {profileData.identifyproof || 'NA'} </span>
            </div>
            <div>
            <span>Identify Document No : </span>
            <span className='font-bold'> {profileData.identificationdocumentno || 'NA'}</span>
            </div>
            <div>
            <span>Account Balance : </span>
            <span className='font-bold'> {profileData.deposit || 'NA'}</span>
            </div>
            <div>
            <span>Mobile Number : </span>
            <span className='font-bold'> {profileData.mobilenumber || 'NA'}</span>
            </div>
            <div>
            <span>Citizen Status : </span>
            <span className='font-bold'> {profileData.citizenstatus || 'NA' }</span>
            </div>
            
            </div>
        </Card>
</Container>
<div style={{display:'flex', justifyContent:'center',marginTop:'40px'}}>
       
                <Button variant="primary"  className='me-3' onClick={handleApplyLoan}>Apply for a Loan</Button>
  
            <Button variant="primary" onClick={handleShow}>
          Deposit
        </Button>
      <Modal show={showModal} onHide={handleClose}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    {loading && <Loading/>}
                      <div className="form-control" style={{margin:'50px 0px'}}>
          <label> Deposit Amount</label>
          <Controller
          name="deposit"
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
              id="deposit"
              {...field}
              onChange={(e) => {field.onChange(e.target.value)}}
            />
          )}
        />
        <p className='mt-2'>{`Available Balance:- ${availabeBalance} Rs `}</p>
        {errors.deposit?.type === "required" && (
           <small className="field-error"> Deposit is required</small>
           )}
           {errors.deposit?.type === "pattern" && (
           <small className="field-error">Input must be number and greater than zero</small>
           )}
        </div>
             
                      {error && <ErrorMessage variant={'danger'}>{error}</ErrorMessage>}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
        </form>
      </Modal>

</div></>)}
  
</div>
  )
}

export default Profile