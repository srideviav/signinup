import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const DashboardVW = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const Token = localStorage.getItem('token');
    if (!Token) {
      navigate('/');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div>
      <h1> Welcome, you logged in successfully </h1>{' '}
      <Link to="/">
        <Button onClick={handleLogout}> Logout </Button>{' '}
      </Link>{' '}
    </div>
  );
};

export default DashboardVW;
