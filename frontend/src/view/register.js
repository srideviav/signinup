import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const RegisterVW = () => {
  const [user, setUser] = React.useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const handleSubmit = () => {
    axios
      .post('http://localhost:5000/user/register', user)
      .then((response) => {
        if (response.data.status === true) {
          setUser(response.data);
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
        //padding: 200,
        //paddingRight: 300,
      }}>
      <Card
        title="Register Now"
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
            label="Name"
            name="name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item
            label="Username"
            name="username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item
            label="Email"
            name="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item
            label="Password"
            name="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>{' '}
          <Form.Item label=" ">
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit{' '}
            </Button>{' '}
          </Form.Item>{' '}
        </Form>{' '}
        <Link to="/"> Already have an account ? Login Here </Link>{' '}
      </Card>{' '}
      <ToastContainer /> {''}{' '}
    </div>
  );
};
export default RegisterVW;
