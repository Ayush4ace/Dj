import React from "react";
import LatestJobCards from "./LatestJobCards";

const Latestjobs = () => {
  const randomjobs = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold text-blue-800">Job Openings</h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {randomjobs.map((item, index) => (
          <LatestJobCards key={index} />  {/* Ensure you pass a key prop */}
        ))}
      </div>
    </div>
  );
};

export default Latestjobs;
