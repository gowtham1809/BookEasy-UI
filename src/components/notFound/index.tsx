import React from "react";
import { Button, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./notFound.scss";

const { Title, Text } = Typography;

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <Card className="notfound-card">
        <div className="notfound-header">
          <Title level={2} className="notfound-title">
            404 - Page Not Found
          </Title>
          <Text type="secondary">
            Sorry, the page you’re looking for doesn’t exist.
          </Text>
        </div>
        <Button
          type="primary"
          block
          className="notfound-button"
          onClick={() => navigate("/login")}
        >
          Go to Login Page
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
