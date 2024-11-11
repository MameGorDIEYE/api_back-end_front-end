import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './Components/Header';  
import Footer from './Components/Footer';  
import Login from './Components/Login';
import Logout from './Components/Logout';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Inscription from './Components/Inscription';
import Use_api from './Components/Use_api';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/inscription" />;
};

const Layout = ({ children }) => {
  const location = useLocation();
  
  const noHeaderFooterRoutes = ['/login', '/signup', '/inscription'];

  return (
    <>
     {/* {!noHeaderFooterRoutes.includes(location.pathname) && <Header />} */}
      {children}
      {/*{!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}*/}
    </>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<Home />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route 
              path='/api'  
              element={
                <PrivateRoute>
                  <Use_api />
                </PrivateRoute>
              } 
            />
            <Route 
              path='/deconnexion' 
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
