import React from "react";
import "tachyons";

const Rank = ({ user }) => {
  const { name, entries } = user;
  return (
    <>
      <div className="f3 white">{`${name}, your current entry count is...`}</div>
      <div className="f1 white">{entries}</div>
    </>
  );
};

export default Rank;
