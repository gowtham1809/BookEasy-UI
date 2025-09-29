
import { Layout as AntdLayout, Typography, Button, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import "./layout.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions, UserTypes } from "./redux/reducer";

const { Header, Content } = AntdLayout;
const { Title, Text } = Typography;

const Layout: React.FC = () => {
  //   const user: UserTypes = JSON.parse(localStorage.getItem("user") || "null");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(actions.logout());
    navigate("/login");
  };
  const user: UserTypes | null = (() => {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  })();

  return (
    <AntdLayout>
      <Header className="header">
        <Title level={2} className="header-title">
          BookEasy
        </Title>

        <div className="header-actions">
          <Text className="text">Welcome, {user ? user.name : "User"}</Text>
          <Popconfirm
            title="Are you sure you want to logout?"
            onConfirm={handleLogout}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" icon={<LogoutOutlined />} />
          </Popconfirm>
        </div>
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </AntdLayout>
  );
};

export default Layout;
