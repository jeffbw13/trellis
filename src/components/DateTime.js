import React, { useState, useEffect } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import x from "../../images/x.svg";

const DateTime = ({ setShowPopup, dateTime }) => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    if (dateTime !== undefined) {
      setDate(dateTime.toLocaleDateString());
      setTime(dateTime.toLocaleTimeString());
    } else {
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    }
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

  const handleDateSubmit = () => {
    event.preventDefault();

    alert("handleDateSubmit!");
  };

  return (
    <form className="date-time" onSubmit={handleDateSubmit}>
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
            type="text"
            size="10"
            value={time}
            onChange={(event) => setTime(event.target.value)}
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
