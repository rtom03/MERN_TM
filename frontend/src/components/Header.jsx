import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { setSearchFilter, setSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-2">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-6 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          connects job seekers with employers, offering features like job
          listings, resume uploads, AI-driven recommendations, and real-time
          application tracking. It streamlines the hiring process by enabling
          users to search, apply, and communicate with recruiters efficiently.
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
          <div className="flex items-center ">
            <img src={assets.search_icon} alt="" className="h-4 sm:h-5" />
            <input
              type="text"
              placeholder="search for jobs"
              className="max-sm-text-xs p-2 rounded outline-none w-full"
              ref={titleRef}
            />
          </div>
          <div className="flex items-center ">
            <img src={assets.location_icon} alt="" className="h-4 sm:h-5" />
            <input
              type="text"
              placeholder="location"
              className="max-sm-text-xs p-2 rounded outline-none w-full"
              ref={locationRef}
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-blue-600 px-6 py-2 rounded text-white m-1"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
