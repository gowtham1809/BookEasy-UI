import React, { useEffect } from "react";
import { Button, Skeleton, Typography } from "antd";
import { CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./bookings.scss";
import { actions, BookingTypes } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectBookings, selectLoading } from "../../redux/selector";
import { getTime12 } from "../../utils/dateUtils";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface BookingsProps {
  bookings?: BookingTypes[];
  goToSlots?: () => void;
}

const Bookings: React.FC<BookingsProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToSlots = () => {
    navigate("/slots");
  };

  useEffect(() => {
    dispatch(actions.fetchBookings());
  },[]);

  const bookings = useSelector(selectBookings);
  const loading = useSelector(selectLoading);

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <Title level={3}>My Bookings</Title>

        <Button type="link" onClick={() => navigate("/slots")}>
          Available Slots
        </Button>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : bookings.length === 0 ? (
        <div className="no-bookings">
          <CalendarOutlined className="no-bookings-icon" />
          <Text>No bookings yet. Book your first slot!</Text>
          <Button type="primary" onClick={goToSlots}>
            Browse Available Slots
          </Button>
        </div>
      ) : (
        bookings.map((booking: BookingTypes) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <CheckCircleOutlined className="booking-confirmed-icon" />
              <div>
                <Text strong>Booking Confirmed</Text>
                <br />
                <Text type="secondary">
                  Booked on {new Date(booking.booked_at).toLocaleDateString()}
                </Text>
              </div>
              <span className="booking-status">Confirmed</span>
            </div>
            <div className="booking-details">
              <Text>
                Date & Time:{" "}
                {new Date(booking.booking_date).toLocaleDateString()} at{" "}
                {getTime12(booking.slot?.start_time as any)}
              </Text>
              <br />
              <Text>Seat: {booking.slot?.seats}</Text>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;
