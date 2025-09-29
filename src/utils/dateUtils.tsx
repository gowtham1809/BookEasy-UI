import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const getFormattedDate = (date: Dayjs, format?: string) =>
  dayjs(date).format(format ? format : "YYYY-MM-DD");

export const getFormattedTime = (time: Dayjs) => dayjs(time).format("hh:mm A");
export const getTime12 = (time: Dayjs) =>
  dayjs(time, "HH:mm:ss").format("hh:mm A");
export const getFormattedDateAndTime = (
  datetime: Dayjs,
  dateFormat?: string,
  timeFormat: string = "hh:mm A"
) => {
  const formattedDate = dayjs(datetime).format(
    dateFormat ? dateFormat : "YYYY-MM-DD"
  );
  const formattedTime = dayjs(datetime).format(timeFormat);
  return `${formattedDate} ${formattedTime}`;
};
export const timeIsInFuture = (start_time: string): boolean => {
  const today = dayjs();
  const getTime = dayjs(start_time, "HH:mm:ss");
  const slotDateTime = dayjs(`${today}T${getTime}`);
  console.log({ start_time, slotDateTime, today });
  return slotDateTime.isAfter(today);
};
