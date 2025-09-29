
import { Button, Typography } from "antd";
import "./booking.scss";
import { actions, SlotTypes, UserTypes } from "../../redux/reducer";
import { useDispatch } from "react-redux";
import { getTime12 } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface BookingProps {
  slot: SlotTypes | null;
  selectedDate: string;
}

const Booking: React.FC<BookingProps> = ({ slot, selectedDate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user: UserTypes | null = (() => {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  })();

  const handleConfirm = () => {
    dispatch(
      actions.fetchCreateBooking({
        slot_id: slot?.id,
        booking_date: selectedDate,
      })
    );
  };
  if (!user) {
    toast.error("PLease Login and then Continue !");
    navigate("/login");
  }

  return (
    <div className="booking-container">
      <Title level={3}>Complete Your Booking</Title>
      <div className="selected-slot-info">
        <Text strong>Date:</Text> {new Date(selectedDate).toLocaleDateString()}{" "}
        {slot && (
          <>
            <Text strong>Time:</Text> {getTime12(slot?.start_time as any)}-
            {getTime12(slot?.end_time as any)}
          </>
        )}
        <br />
      </div>
      {user && (
        <div className="user-details">
          <div>
            <Text strong>User: {user.name}</Text>
            <Text strong>Email: {user.email}</Text>
          </div>
          <Button
            type="default"
            onClick={() => (window.location.href = "/slots")}
          >
            Back to Slots
          </Button>
          <Button type="primary" onClick={handleConfirm}>
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );
};

export default Booking;
