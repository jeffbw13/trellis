import React from "react";
import home from "../../images/home.svg";
import search from "../../images/search.svg";
import plus_sm from "../../images/plus-sm.svg";
import info from "../../images/info.svg";
import bell from "../../images/bell.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="header-sub" style={{ width: "40%" }}>
        <div className="header-icon-box">
          <img
            className="svg-filter-white"
            style={{ width: "25px", height: "25px" }}
            src={home}
          />
        </div>
        <div className="header-icon-box">Boards</div>
        <div
          className="header-icon-box"
          style={{ width: "200px", justifyContent: "flex-end" }}
        >
          <img
            className="svg-filter-white"
            style={{ width: "25px", height: "25px" }}
            src={search}
            onClick={() => alert("search!")}
          />
        </div>
      </div>
      <div className="header-sub">Trellis!!</div>
      <div
        className="header-sub"
        style={{ width: "40%", justifyContent: "flex-end" }}
      >
        <div className="header-icon-box">
          <img
            className="svg-filter-white"
            style={{ width: "25px", height: "25px" }}
            src={plus_sm}
          />
        </div>
        <div className="header-icon-box">
          <img
            className="svg-filter-white"
            style={{ width: "25px", height: "25px" }}
            src={info}
          />
        </div>
        <div className="header-icon-box">
          <img
            className="svg-filter-white"
            style={{ width: "25px", height: "25px" }}
            src={bell}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
