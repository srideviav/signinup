import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Form, Input } from 'antd'

const RegisterVW = () => {
  const [user, setUser] = React.useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })
  const handleSubmit = () => {
    console.log('adcd')
    axios
      .post('http://localhost:5000/user/register', user)
      .then((response) => {
        console.log(response, '---response----')
        if (response.status === true) {
          setUser(response.data)
          toast.success(response.message, {
            position: 'top-right',
            autoClose: 2000,
          })
        } else {
          toast.error(response.errors, {
            position: 'top-right',
            autoClose: 2000,
          })
        }
      })
      .catch((err) => {
        toast.error(err, {
          position: 'top-right',
          autoClose: 2000,
        })
      })
  }

  return (
    <div>
      <Form
        name="wrap"
        labelCol={{ flex: '110px' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Name"
          name="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="Username"
          name="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="Email"
          name="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item
          label="Password"
          name="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>{' '}
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit{' '}
          </Button>{' '}
        </Form.Item>{' '}
      </Form>{' '}
    </div>
  )
}
export default RegisterVW
