import React, { useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import x from "../../images/x.svg";

const DateTime = ({ setShowPopup, dateTime, handleChangeDate }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [validTime, setValidTime] = useState(true);

  useEffect(() => {
    //  we'll maintain the dates within board as strings
    let useDateTime = new Date();
    if (dateTime !== undefined) {
      useDateTime = new Date(dateTime);
    }
    let timeString = useDateTime.toLocaleTimeString();
    //  split on colons
    const timeArr = timeString.split(":");
    //  put back together omitting seconds
    timeString = `${timeArr[0]}:${timeArr[1]} ${timeArr[2].substr(3, 2)}`;
    setDate(useDateTime.toLocaleDateString());
    setTime(timeString);
  }, []);

  const parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  };

  const formatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale });
  };

  const FORMAT = "MM/dd/yyyy";

  let timeBoxStyle = {};
  !validTime && (timeBoxStyle = { backgroundColor: "pink" });

  const checkValidTime = () => {
    setValidTime(true);
    const timeArr = time.split(":");
    if (parseInt(timeArr[0]) < 1 || parseInt(timeArr[0]) > 12) {
      setValidTime(false);
      console.log("first");
    } else {
      const minMerid = timeArr[1].split(" ");
      console.log(minMerid);
      if (isNaN(minMerid[0]) || minMerid[0] < "00" || minMerid > "59") {
        setValidTime(false);
        console.log("second");
      } else {
        if (minMerid[1] !== "AM" && minMerid[1] !== "PM") {
          setValidTime(false);
          console.log("third");
        }
      }
    }
  };

  const handleSubmit = () => {
    event.preventDefault();
    if (!validTime) {
      return;
    }
    dateTime = new Date(date);
    const timeArr = time.split(":");
    let hours = parseInt(timeArr[0]);
    if (timeArr[1].substr(3, 2) === "PM") {
      hours += 12;
    }
    dateTime.setHours(hours);
    dateTime.setMinutes(parseInt(timeArr[1].substr(0, 2)));
    const dateStr = JSON.stringify(dateTime);
    handleChangeDate(JSON.parse(dateStr));
    setShowPopup(false);
  };

  return (
    <form className="date-time" onSubmit={() => handleSubmit()}>
      Change Due Date
      <hr />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ textAlign: "center" }}>
          Date
          <br />
          <DayPickerInput
            value={date}
            onDayChange={setDate}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            dayPickerProps={{
              selectedDays: date,
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          Time
          <br />
          <input
            className="time-box"
            style={timeBoxStyle}
            type="text"
            size="10"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            onBlur={() => checkValidTime()}
          />
        </div>
      </div>
      Set due date reminder: <br />
      One day before <br />
      <br />
      Reminders will be sent to all members and watchers of this card.
      <br />
      <input
        type="submit"
        className="green-add-button"
        style={{ width: "60px" }}
        value="Save"
      />
      <img
        style={{
          width: "15px",
          height: "15px",
          position: "absolute",
          top: "15px",
          right: "15px",
        }}
        src={x}
        onClick={() => setShowPopup(false)}
      />
    </form>
  );
};

export default DateTime;
