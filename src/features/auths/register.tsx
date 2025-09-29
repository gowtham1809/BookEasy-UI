import { Button, Card, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import "./register.scss";
import { actions } from "../../redux/reducer";
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";
const { Title, Text } = Typography;

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (registerForm.password !== registerForm.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    dispatch(actions.fetchCreateUser(registerForm));
  };
  return (
    <div className="register-container">
      <Card className="register-card">
        <div className="register-header">
          <Title level={3} className="register-title">
            BookEasy
          </Title>
          <Text type="secondary">Register Now To Book Your Slot!</Text>
        </div>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              placeholder="Enter your name"
              onChange={(e) =>
                setRegisterForm({ ...registerForm, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm new password"
              onChange={(e) =>
                setRegisterForm({
                  ...registerForm,
                  confirmPassword: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="register-button"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          className="login-link"
          onClick={() => (window.location.href = "/login")}
        >
          Back to login
        </Button>
      </Card>
    </div>
  );
};

export default Register;
