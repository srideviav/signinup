import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form, Input } from 'antd';

const LoginVW = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });
  const handleSubmit = () => {
    axios
      .post('http://localhost:5000/user/login', user)
      .then((response) => {
        if (response.data.status === true) {
          setUser(response.data);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message, {
            position: 'top-right',
            autoClose: 2000
          });
          setTimeout(() => {
            navigate('/dashboard');
          }, [2000]);
        } else {
          toast.error(response.data.errors, {
            position: 'top-right',
            autoClose: 2000
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 2000
        });
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
            label="Username or Email"
            name="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            rules={[{ required: true, message: 'Please input your username or email!' }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item
            label="Password"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>{' '}
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit{' '}
            </Button>{' '}
          </Form.Item>{' '}
        </Form>{' '}
        <Link to="/register">
          {' '}
          <Button> New User ? Register Here </Button>{' '}
        </Link>{' '}
        <Link to="/forgotPassword">
          {' '}
          <Button> Forgot Password ? </Button>{' '}
        </Link>{' '}
      </Card>{' '}
      <ToastContainer /> {''}{' '}
    </div>
  );
};
export default LoginVW;
