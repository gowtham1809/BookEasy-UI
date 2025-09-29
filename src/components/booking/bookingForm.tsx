import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Select, Skeleton } from "antd";
import { UserOutlined, MailOutlined, WarningOutlined } from "@ant-design/icons";
import "./booking.scss";
import { actions, SlotTypes, UserTypes } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { getTime12 } from "../../utils/dateUtils";
import { selectSlots, selectLoading, selectUser } from "../../redux/selector";

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

  const user: UserTypes | null = useSelector(selectUser);
  const slots = useSelector(selectSlots);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(actions.clear());
  });

  useEffect(() => {
    if (!loading && !user) dispatch(actions.fetchTodaysSlots());
  }, [user]);

  const handleConfirm = () => {
    dispatch(actions.fetchCreateBookingAndUser(userDetails));
  };
  const availableSlots = slots.filter((s: SlotTypes) => s.available);

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
          {slots.length === 0 && loading ? (
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Confirm Booking
          </Button>
        </Form.Item>
        <div style={{ marginTop: 24 }}>
          {availableSlots.length === 0 && !loading && (
            <>
              <Text style={{ color: "#faad14" }}>
                <WarningOutlined style={{ marginRight: 6 }} />
                Today’s slots are already booked.
              </Text>
              <br />
            </>
          )}
          <Text type="secondary">
            {" "}
            To view seatings or book for upcoming dates, kindly{" "}
            <a href="/register">register</a>.
          </Text>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;
