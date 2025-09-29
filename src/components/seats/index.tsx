
import { Button, Typography } from "antd";
import "./seats.scss";
import { SlotTypes } from "../../redux/reducer";

const { Title } = Typography;

interface SeatsProps {
  slot: SlotTypes;
  onBack: () => void;
  handleBooking: () => void;
}

const Seats: React.FC<SeatsProps> = ({ slot, onBack, handleBooking }) => {
  const totalSeats = +slot?.seats || 0;
  const seatsPerRow = 10;
  const totalRows = Math.ceil(totalSeats / seatsPerRow);

  const renderSeatRow = (rowIndex: number) => {
    const startSeat = rowIndex * seatsPerRow + 1;
    const leftSeats = [];
    const rightSeats = [];
    // Divide seats into left and right sections
    for (let i = 0; i < seatsPerRow; i++) {
      const seatNumber = startSeat + i;
      if (seatNumber <= totalSeats) {
        if (i < seatsPerRow / 2) {
          leftSeats.push(
            <Button key={seatNumber} className="seat">
              {seatNumber}
            </Button>
          );
        } else {
          rightSeats.push(
            <Button key={seatNumber} className="seat">
              {seatNumber}
            </Button>
          );
        }
      }
    }
    return (
      <div key={rowIndex} className="seat-row">
        <div className="seat-section">{leftSeats}</div>
        <div className="aisle" />
        <div className="seat-section">{rightSeats}</div>
      </div>
    );
  };

  return (
    <div className="seats-container">
      <Title level={3}>Your Slot Seatings</Title>

      <div className="seat-map">
        <div className="screen-indicator">
          {" "}
          <div className="screen">FRONT</div>{" "}
        </div>
        {Array.from({ length: totalRows }, (_, i) => renderSeatRow(i))}
      </div>

      <div className="seats-footer">
        <Button onClick={onBack}>Back</Button>
        <Button  onClick={handleBooking}>
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default Seats;
