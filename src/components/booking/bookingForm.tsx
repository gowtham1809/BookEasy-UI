import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Skeleton,
} from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import "./booking.scss";
import { actions, SlotTypes, UserTypes } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { getTime12 } from "../../utils/dateUtils";
import { selectSlots, selectLoading } from "../../redux/selector";

const { Title, Text } = Typography;

interface BookingProps {}

const BookingForm: React.FC<BookingProps> = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    slot_id: "",
    password: "",
  });
  const dispatch = useDispatch();

  const user: UserTypes | null = (() => {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  })();
  const slots = useSelector(selectSlots);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (!user) {
      dispatch(actions.fetchTodaysSlots());
    }
  }, [user]);

  const handleConfirm = () => {
    dispatch(actions.fetchCreateBookingAndUser(userDetails));
  };
  const availableSlots = slots.filter((s:SlotTypes) => s.available);

  return (
    <div className="booking-container">
      <Title level={3}>Book Your Today's Slot</Title>
      <Form layout="vertical" onFinish={handleConfirm}>
        <Form.Item
          name="name"
          label={
            <>
              <UserOutlined /> Full Name
            </>
          }
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input
            placeholder="Enter your full name"
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          name="email"
          label={
            <>
              <MailOutlined /> Email Address
            </>
          }
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          name="slot"
          label="Select Today's Slot"
          rules={[{ required: true, message: "Please select a slot" }]}
        >
          {loading ? (
            <Skeleton.Input active style={{ width: 200 }} />
          ) : (
            <Select
              style={{ width: 200 }}
              placeholder="Select slot time"
              value={userDetails.slot_id}
              onChange={(v) => setUserDetails({ ...userDetails, slot_id: v })}
            >
              {availableSlots.map((slot: any) => (
                <Select.Option key={slot.id} value={slot.id}>
                  {getTime12(slot.start_time)} - {getTime12(slot.end_time)}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="New Password"
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
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm Booking
          </Button>
        </Form.Item>
        <div style={{ marginTop: 24 }}>
          <Text type="secondary">
            For view seats or future bookings, please be a{" "}
            <a href="/register">Register User</a>.
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;
