import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form, Input } from 'antd';

const ResetPasswordVW = () => {
  const [otp, setOtp] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleError = (err) => {
    toast.error(err, {
      position: 'top-right',
      autoClose: 3000
    });
  };
  const validation = () => {
    if (!otp) {
      handleError('OTP Cannot be Empty');
    }
    if (!password) {
      handleError('Password Cannot be Empty');
    }
    if (!confirmPassword) {
      handleError('Confirm Password Cannot be Empty');
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const isValidPassword = passwordRegex.test(password.password);
    if (!isValidPassword) {
      handleError('Password is not valid');
    }
    if (password.password != confirmPassword.confirmPassword) {
      handleError('Password and Confirm Password Cannot be Different');
    }
    return true;
  };
  const handleSubmit = () => {
    if (validation()) {
      axios
        .post('http://localhost:5000/user/resetPassword', {
          otp: otp.otp,
          password: password.password
        })
        .then((response) => {
          if (response.data.status === true) {
            toast.success(response.data.message, {
              position: 'top-right',
              autoClose: 2000
            });
          } else {
            toast.error(response.data.errors, {
              position: 'top-right',
              autoClose: 2000
            });
          }
        });
    }
  };
  return (
    <div
      style={{
        paddingTop: 180,
        paddingLeft: 380
      }}>
      <Card
        title="Reset Password"
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
            label="OTP"
            name="otp"
            onChange={(e) => setOtp({ otp: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item
            label="password"
            name="password"
            onChange={(e) => setPassword({ password: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item
            label="confirm password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword({ confirmPassword: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit{' '}
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
export default ResetPasswordVW;
