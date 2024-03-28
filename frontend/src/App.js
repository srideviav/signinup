import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterVW from './view/register';
import LoginVW from './view/login';
import DashboardVW from './view/dashboard';
import ForgotPasswordVW from './view/forgotPassword';
import CheckOtpVw from './view/checkOTP';
import ResetPasswordVW from './view/resetPassword';

function App() {
  return (
    <Router>
      {' '}
      <Routes>
        <Route index element={<LoginVW />} /> <Route path="/register" element={<RegisterVW />} />{' '}
        <Route path="/dashboard" element={<DashboardVW />} />{' '}
        <Route path="/forgotPassword" element={<ForgotPasswordVW />} />{' '}
        <Route path="/checkOTP" element={<CheckOtpVw />} />{' '}
        <Route path="/resetPassword" element={<ResetPasswordVW />} />{' '}
      </Routes>{' '}
    </Router>
  );
}

export default App;
