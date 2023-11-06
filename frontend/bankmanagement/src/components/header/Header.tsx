/* eslint-disable @typescript-eslint/no-explicit-any */
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';



function Header() {
  let {userInfo}= useSelector((state:any)=>state.userLogin);
  const userId= localStorage?.getItem('Id')?.replace(/^"(.*)"$/, '$1')
  const dispatch:AppDispatch= useDispatch()
  const navigate= useNavigate()
  const logoutHandler= async()=>{
    await dispatch(logout())
    navigate('/')
  }

  
  return (
    <header>
         <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand href="/">City  Bank</Navbar.Brand>
        </LinkContainer>
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
             {userInfo ? (<>
                <NavDropdown title={userInfo.name} id='username' >
                      <NavDropdown.Item onClick={()=>navigate(`/profile/${userId}`)}>
                          Profile
                      </NavDropdown.Item>
                 
                  
                      <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                      </NavDropdown.Item>
                
                </NavDropdown>
             </>):(
              <>
              <LinkContainer to='/login'>
              <Nav.Link>
                  <FaSignInAlt/> Sign In
              </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/register'>
              <Nav.Link>
              <FaSignOutAlt/> Sign Out
              </Nav.Link>
              </LinkContainer>
              </>
             )}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header