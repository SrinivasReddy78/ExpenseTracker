import { Outlet } from 'react-router-dom'
import './App.css'
import GlobalProvider from './context/GlobalProvider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';


function App() {

  const checkTokenExpiration = () => {
    const expiresAt = localStorage.getItem('expiresAt');
    if (expiresAt && Date.now() >= expiresAt) {
      // Token is expired, clear localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('expiresAt');
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <>
      <div className="w-full h-screen">
        <GlobalProvider>
          <Outlet />
          <ToastContainer />
        </GlobalProvider>
      </div>
    </>
  )
}

export default App
