import React, { useEffect, useState } from "react";
import { Button, Typography, DatePicker, Skeleton } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import "./slots.scss";
import Seats from "../../components/seats";
import { actions, SlotTypes, UserTypes } from "../../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectSlots } from "../../redux/selector";
import dayjs, { Dayjs } from "dayjs";
import Booking from "../../components/booking";
import { getTime12, timeIsInFuture } from "../../utils/dateUtils";
import { toast } from "react-toastify";

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

  const slots = useSelector(selectSlots);
  const loading = useSelector(selectLoading);

  const user: UserTypes | null = (() => {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  })();

  if (!user) {
    window.location.href = "/login";
  }
  const goToBookings = () => {
    window.location.href = "/bookings";
  };

  // Fetch slots whenever the selectedDate changes
  useEffect(() => {
    dispatch(actions.fetchSlots({ date: selectedDate.toISOString() }));
  }, [selectedDate, dispatch]);

  // Disable past dates
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf("day");
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 600, margin: "32px auto", padding: "18px 24px" }}>
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  const formattedDate = selectedDate.format("dddd, MMMM D, YYYY");
  const handleBooking = () => {
    setShowBooking((prev) => !prev);
    setSeats(false);
  };
  const isToday = dayjs(selectedDate).isSame(dayjs(), "day");
  const handleSlots = (slot: SlotTypes) => {
    console.log(timeIsInFuture(slot.start_time));
    if ((isToday ? timeIsInFuture(slot.start_time) : true) && slot.available) {
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
          selectedDate={selectedDate.toISOString()}
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
            </div>
            <div className="slots-cards">
              {slots?.map((slot: any) => (
                <div
                  key={slot.id}
                  className={`slot-card ${
                    (isToday ? timeIsInFuture(slot.start_time) : true) &&
                    slot.available
                      ? "available"
                      : "unavailable"
                  }`}
                  onClick={() => handleSlots(slot)}
                >
                  <p>{getTime12(slot.start_time)}</p>
                </div>
              ))}
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
        </div>
      )}
    </>
  );
};

export default Slots;
