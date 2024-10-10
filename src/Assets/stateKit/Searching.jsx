import React from "react";
import Loader from "./Loader";

const Searching = ({ provider }) => {
  return (
    <div style={{ zIndex: 3000, right: "50vw", marginRight: -50, top: "50vh", marginTop: -50 }} className="fixed">
      <Loader />
    </div>
  );
  // return (
  //     <div className="searching-icon-container">
  //         <SearchingIcon />
  //     </div>
  // );
};

export default Searching;
