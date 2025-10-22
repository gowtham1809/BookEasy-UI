import { Button, Card, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import "./reset.scss";
import { actions } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/selector";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const [resetForm, setResetForm] = useState({
    email: "",
    password: "",
  });

  const handleReset = async () => {
    dispatch(
      actions.resetPassword({
        email: resetForm.email,
        password: resetForm.password,
      })
    );
    setResetForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className="reset-container">
      <Card className="reset-card">
        <div className="reset-header">
          <Title level={3} className="reset-title">
            BookEasy
          </Title>
          <Text type="secondary">
            Enter your details to reset your password
          </Text>
        </div>

        <Form layout="vertical" onFinish={handleReset}>
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
                setResetForm({ ...resetForm, email: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              onChange={(e) =>
                setResetForm({ ...resetForm, password: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="reset-button"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="link"
          className="login-link"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Card>
    </div>
  );
};

export default ResetPassword;
