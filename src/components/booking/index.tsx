import { Button, Typography } from "antd";
import "./booking.scss";
import { actions, SlotTypes, UserTypes } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { getTime12 } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { selectLoading, selectUser } from "../../redux/selector";

const { Title, Text } = Typography;

interface BookingProps {
  slot: SlotTypes | null;
  selectedDate: string;
  onBack: () => void;
}

const Booking: React.FC<BookingProps> = ({ slot, selectedDate, onBack }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const user: UserTypes | null = useSelector(selectUser);

  const data = {
    slot_id: slot?.id,
    booking_date: selectedDate,
  };
  const handleConfirm = () => {
    dispatch(
      actions.fetchCreateBooking({
        data,
        onSuccess: () => navigate("/bookings"),
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
          <Button type="default" onClick={onBack}>
            Back to Slots
          </Button>
          <Button type="primary" onClick={handleConfirm} loading={loading}>
            Confirm Booking
          </Button>
        </div>
      )}
    </div>
  );
};

export default Booking;
