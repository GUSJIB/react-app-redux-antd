import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../config/store';
import { login } from '../../shared/reducers/authentication';
import './LoginPage.css';


function LoginPage() {
  const loader = useAppSelector(state => state.spening.loading);

  const dispatch = useAppDispatch();

  const onFinishForm = (form) => {
    dispatch(login(form));
  }

  return (
    <div className="container">
      <div className='login-container'>
        <Form
          name="normal_login"
          className="form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinishForm}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input size="large"
              prefix={<UserOutlined className="site-form-item-icon"/>}
              placeholder="Username"
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon"/>}
              type="password"
              placeholder="Password"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"
              size="large">Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;