import React, { useEffect, useState } from "react";
import { Button, Typography, DatePicker, Skeleton } from "antd";
import { CalendarOutlined, WarningOutlined } from "@ant-design/icons";
import "./slots.scss";
import Seats from "../../components/seats";
import { actions, SlotTypes, UserTypes } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectSlots, selectUser } from "../../redux/selector";
import dayjs, { Dayjs } from "dayjs";
import Booking from "../../components/booking";
import { getTime12 } from "../../utils/dateUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

interface SlotsProps {}

const Slots: React.FC<SlotsProps> = () => {
  const [selectedSlot, setSelectedSlot] = useState<SlotTypes | undefined>(
    undefined
  );
  const [showBooking, setShowBooking] = useState<boolean>(false);
  const [showSeats, setSeats] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slots = useSelector(selectSlots);
  const loading = useSelector(selectLoading);

  const goToBookings = () => {
    navigate("/bookings");
  };

  // Fetch slots whenever the selectedDate changes
  useEffect(() => {
      dispatch(actions.fetchSlots({ date: selectedDate.format("YYYY-MM-DD") }));
  }, [selectedDate, dispatch]);

  // Disable past dates
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf("day");
  };

  const allSlotsAreBooked = slots?.every((s: SlotTypes) => !s?.available);
  const formattedDate = selectedDate.format("dddd, MMMM D, YYYY");
  const handleBooking = () => {
    setShowBooking((prev) => !prev);
    setSeats(false);
  };

  const handleSlots = (slot: SlotTypes) => {
    if (slot.available) {
      setShowBooking(false);
      setSeats(true);
      setSelectedSlot(slot);
    } else {
      toast.warning("This Slot is Booked !");
    }
  };
  const onBack = () => {
    setShowBooking(false);
    setSeats(false);
    setSelectedSlot(undefined);
  };

  return (
    <>
      {showBooking && selectedSlot && (
        <Booking
          slot={selectedSlot}
          selectedDate={selectedDate.format("YYYY-MM-DD")}
          onBack={onBack}
        />
      )}
      {selectedSlot && showSeats && (
        <Seats
          slot={selectedSlot}
          onBack={onBack}
          handleBooking={handleBooking}
        />
      )}
      {!showBooking && !showSeats && (
        <div className="slots-container">
          <div className="slots-header">
            <Title level={3}>Available Slots</Title>

            <Button type="link" onClick={goToBookings}>
              My Bookings
            </Button>
          </div>
          {loading ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <>
              <div className="date-picker">
                <Text>Select the Date</Text>
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => date && setSelectedDate(date)}
                  disabledDate={disabledDate}
                />
              </div>

              <div className="slot-group">
                <div className="slot-group-header">
                  <CalendarOutlined className="icon" />
                  <Text strong style={{ marginLeft: 10 }}>
                    {formattedDate}
                  </Text>
                  {allSlotsAreBooked && slots && (
                    <>
                      <Text style={{ color: "#faad14" }}>
                        <WarningOutlined style={{ marginRight: 6 }} />
                        All slots are booked.
                      </Text>
                      <br />
                    </>
                  )}
                </div>
                <div className="slots-cards">
                  {slots?.map((slot: any) => (
                    <div
                      key={slot.id}
                      className={`slot-card ${
                        slot.available ? "available" : "unavailable"
                      }`}
                      onClick={() => handleSlots(slot)}
                    >
                      <p>{getTime12(slot.start_time)}</p>
                    </div>
                  ))}
                    {slots?.length === 0 && (
                      <Text>Slots Not Found Available.</Text>
                    )}
                </div>
                <div className="status-container">
                  <div className="status-item">
                    <div className="status-box available"></div>
                    <span>Available</span>
                  </div>
                  <div className="status-item">
                    <div className="status-box booked"></div>
                    <span>Booked</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Slots;
