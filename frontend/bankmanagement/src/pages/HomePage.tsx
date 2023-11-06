import { useEffect } from 'react';
import {Container, Card, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import {  useNavigate } from 'react-router-dom';

function HomePage() {
  const {userInfo}= useSelector((state:any)=>state.userLogin);
  const navigate= useNavigate();

  useEffect(()=>{
    if(userInfo){
      navigate(`/profile/${userInfo._id}`)
    }else{
      navigate('/')
    }
  },[])
  
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
              <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75' style={{height:'70vh'}}>
        <h1 className='text-center mb-4'>Welcome to City Bank</h1>
        <p className='text-center mb-4'>This is the City Bank platform here we will provide bank sevices like depositing, withdrwal money and other transcations to your account. Here will provide the loans also.</p>
          <div className='d-flex'>
            <LinkContainer to='/login'>
            <Button variant="primary"  className='me-3'>Sign In</Button>
            </LinkContainer>
            <LinkContainer to='/register'>
            <Button disabled={userInfo ? true : false} variant="secondary"  className='me-3'>Sign Up</Button>
            </LinkContainer>
            </div>
        </Card>
      </Container>
    </div>
  )
}

export default HomePage