import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form, Input } from 'antd';

const ForgotPasswordVW = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: ''
  });
  const handleForgotPassword = () => {
    axios.post('http://localhost:5000/user/forgotPassword', user).then((response) => {
      if (response.data.status === true) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 2000
        });
        setTimeout(() => {
          navigate('/checkOTP');
        }, []);
      } else {
        toast.error(response.data.errors, {
          position: 'top-right',
          autoClose: 2000
        });
      }
    });
  };
  return (
    <div
      style={{
        paddingTop: 180,
        paddingLeft: 380
      }}>
      <Card
        title="Login"
        // bordered = { false }
        style={{
          width: 500
        }}>
        <Form
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}>
          <Form.Item
            label="Email"
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit" onClick={handleForgotPassword}>
              Send OTP{' '}
            </Button>{' '}
          </Form.Item>{' '}
        </Form>{' '}
        <Link to="/">
          {' '}
          <Button> Back </Button>{' '}
        </Link>{' '}
      </Card>{' '}
      <ToastContainer /> {''}{' '}
    </div>
  );
};
export default ForgotPasswordVW;
