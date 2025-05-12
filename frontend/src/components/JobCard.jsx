import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="border p-6 shadow rounded">
      <div className="flex justify-between items-center">
        <img className="h-6" src={assets.company_icon} alt="" />
      </div>
      <h4 className="font-medium  text-xl mt-2">{job.title}</h4>
      <div className="flex items-center gap-3 mt-2 text-xs">
        <span className="bg-blue-100 border-blue-400 px-4 py-1.5 rounded ">
          {job.location}
        </span>
        <span className="bg-red-100 border-red-400 px-4 py-1.5 rounded ">
          {job.level}
        </span>
      </div>

      <p
        className="text-gray-500 text-sm mt-2"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>
      <div className="flex items-center gap-3 text-sm mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Apply Now
        </button>
        <button
          className="text-gray-600 border border-gray-500 px-4 py-2 rounded"
          onClick={() => {
            navigate(`/apply-job${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
