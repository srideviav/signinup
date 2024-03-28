import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

const DashboardVW = () => {
  const [data, setData] = React.useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/user/dashboard', {
          headers: {
            Authorization: ` ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          if (response.status === true) {
            console.log(response, '-----------dashboard response----------');
            setData(response.data.data);
          } else {
            console.log(response, '===============================');
            toast.error(response.data.errors, {
              position: 'top-right',
              autoclose: 200
            });
          }
        })
        .catch((err) => {
          console.log(err, '---------err-------------');
        });
    } else {
      toast.error('session time out, Login again', {
        position: 'top-right',
        autoClose: 2000
      });
      setTimeout(() => {
        navigate('/');
      }, []);
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div>
      <h1> Welcome, you logged in successfully </h1>{' '}
      <Link to="/">
        <Button onClick={handleLogout}> Logout </Button>{' '}
      </Link>{' '}
      <ToastContainer />{' '}
    </div>
  );
};

export default DashboardVW;
