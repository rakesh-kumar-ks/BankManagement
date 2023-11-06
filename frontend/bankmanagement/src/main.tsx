import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import store from './store.ts';
import { Provider } from 'react-redux';
import Profile from './components/profile/Profile.tsx';
import NotFound from './components/notfound/NotFound.tsx';
import ApplyLoan from './components/loan/ApplyLoan.tsx';


  const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<HomePage/>}/>
            <Route  path='/login' element={<LoginPage/>}/>
            <Route  path='/register' element={<RegisterPage/>}/>
            <Route  path='/loan' element={<ApplyLoan/>}/>
             {/* Private Routes */}
      
            <Route  path='/profile/:id' element={<Profile/>}/>

            <Route path="*" element={<NotFound/>}/>
            
      </Route>
  
    )
  )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
)
