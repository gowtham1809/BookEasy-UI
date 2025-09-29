import { Layout as AntdLayout, Typography, Button, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import "./layout.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions, UserTypes } from "./redux/reducer";
import { selectError, selectUser } from "./redux/selector";

const { Header, Content } = AntdLayout;
const { Title, Text } = Typography;

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(actions.logout());
    navigate("/login");
  };

  const user: UserTypes | null = useSelector(selectUser);
  const error = useSelector(selectError);
  if (error === "Unauthorized") navigate("/login");
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
