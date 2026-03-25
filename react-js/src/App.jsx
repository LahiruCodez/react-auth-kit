import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        {/* 
        Change allowedRoles to access control :
        This digit is equal to your backend roles table role id. 
        If this digit and your backend user's role id is matched user can access this route
        */}
        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
      {/* 
      This ToastContainer component for Toast flash message. 
      If it was deleted, Toast messages are not working 
      */}
      <ToastContainer />
    </>
  );
}

export default App;
