import React, { useState } from "react";
import Popup from "./Popup";
import DateTime from "./DateTime";
import headline from "../../images/headline.svg";
import x from "../../images/x.svg";
import text from "../../images/text.svg";
import emojiHappy from "../../images/emoji-happy.svg";

const CardDetail = ({
  card,
  setModalOpen,
  handleDeleteCard,
  setSaveBoardFlag,
}) => {
  const [cardHeader, setCardHeader] = useState(card.header);
  const [cardDescription, setCardDescription] = useState(card.description);
  const [showDateTimePopup, setShowDateTimePopup] = useState(false);

  const handleSubmit = () => {
    event.preventDefault();
    card.header = cardHeader;
    card.description = cardDescription;
    setModalOpen(false);
    setSaveBoardFlag(true);
  };

  const handleChangeDate = (date) => {
    card.dueDate = date;
    setSaveBoardFlag(true);
  };

  //  if header is updated, updates card even if modal is closed
  return (
    <>
      <div className="card-detail">
        <div className="card-detail-left">
          <form className="card-detail-form" onSubmit={() => handleSubmit()}>
            <div className="card-detail-section">
              <div className="card-detail-icon">
                <img style={{ height: "24px", width: "24px" }} src={headline} />
              </div>
              <div className="card-detail-input">
                <input
                  type="text"
                  style={{
                    border: "none",
                    width: "80%",
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    backgroundColor: "#F4F5F7",
                  }}
                  value={cardHeader}
                  onChange={(event) => setCardHeader(event.target.value)}
                />
              </div>
              <img
                style={{
                  width: "24px",
                  height: "24px",
                  position: "fixed",
                  top: "20px",
                  right: "20px",
                }}
                src={x}
                onClick={() => setModalOpen(false)}
              />
            </div>
            <div className="card-detail-section">
              <div className="card-detail-icon">
                <img style={{ height: "24px", width: "24px" }} src={text} />
              </div>
              <div className="card-detail-input">
                <h3>Description</h3>
                <textarea
                  rows="5"
                  style={{
                    backgroundColor: "#eaecf0",
                    width: "80%",
                    border: "none",
                  }}
                  placeholder="Add a more detailed description..."
                  value={cardDescription}
                  onChange={(event) => setCardDescription(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="card-detail-section">
              <div className="card-detail-icon">
                <img
                  style={{ height: "24px", width: "24px" }}
                  src={emojiHappy}
                />
              </div>
              <div className="card-detail-input">
                <h3>Activity</h3>
              </div>
            </div>
            <input
              type="submit"
              className="green-add-button"
              style={{ width: "60px" }}
              value="Save"
            />
          </form>
        </div>
        <div className="card-detail-right">
          ADD TO CARD
          <div className="loz-button">Members</div>
          <div className="loz-button">Labels</div>
          <div className="loz-button">Checklist</div>
          <div
            className="loz-button"
            onClick={() => setShowDateTimePopup(!showDateTimePopup)}
          >
            Due Date
          </div>
          <div className="loz-button">Attachment</div>
          <div className="loz-button">Cover</div>
          POWER-UPS
          <br />
          <br />
          ACTIONS
          <div className="loz-button">Move</div>
          <div className="loz-button">Copy</div>
          <div className="loz-button">Make Template</div>
          <div className="loz-button">Watch</div>
          <div
            className="loz-button"
            onClick={() => {
              handleDeleteCard(card);
              setModalOpen(false);
            }}
          >
            Archive
          </div>
          <div className="loz-button">Share</div>
        </div>
        {showDateTimePopup && (
          <Popup style={{ left: "55%" }}>
            <DateTime
              setShowPopup={setShowDateTimePopup}
              dateTime={card.dueDate}
              handleChangeDate={handleChangeDate}
            />
          </Popup>
        )}
      </div>
    </>
  );
};

export default CardDetail;
