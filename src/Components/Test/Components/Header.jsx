import React from "react";

const Header = () => {
  return (
    <div
      className=" bg-danger position-fixed "
      style={{ height: "70px", zIndex: 10, width: "100%" }}
    >
      <div
        className=" header-container  container-fluid d-flex justify-content-between align-items-center bg-primary "
        style={{ height: "100%", width: "100%" }}
      >
        <div>a</div>
        <div>a</div>
      </div>
    </div>
  );
};

export default Header;
