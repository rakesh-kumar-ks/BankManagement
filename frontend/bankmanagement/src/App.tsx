import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import Footer from "./components/footer/Footer";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import store from './store'
function App() {
  return (
    <>
    <Provider store={store}>
    <Header/>
    <Container className='my-2'>
    <Outlet/>
    </Container>
    <Footer/>
    </Provider>
    </>
  )
}

export default App