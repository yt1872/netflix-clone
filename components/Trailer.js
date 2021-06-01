import React from "react";

function Trailer({ youtubeID }) {
  console.log(youtubeID);
  return (
    <div className="h-screen">
      <h2>{youtubeID}</h2>
    </div>
  );
}

export default Trailer;
