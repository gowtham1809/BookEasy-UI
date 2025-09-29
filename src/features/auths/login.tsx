import React, { useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/reducer";
import { selectAuthLoading } from "../../redux/selector";

const { Title, Text } = Typography;

const LoginForm: React.FC = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const loading = useSelector(selectAuthLoading);

  const handleLogin = async () => {
    dispatch(actions.login(loginForm));
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <Title level={3} className="login-title">
            BookEasy
          </Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{
            email: loginForm.email,
            password: loginForm.password,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="login-button"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          className="register-link"
          onClick={() => (window.location.href = "/register")}
        >
          Don't have an account? Register
        </Button>
        <Button
          type="link"
          className="register-link"
          onClick={() => (window.location.href = "/reset")}
        >
          Forgot password?
        </Button>
      </Card>
    </div>
  );
};

export default LoginForm;
