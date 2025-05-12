import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { searched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [currentPage, setCurrentPge] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [filterJobs, setFilterJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocation((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);
    const matchesLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
    setFilterJobs(newFilteredJobs);
    setCurrentPge(1);
  }, [jobs, selectedCategories, selectedLocation, searchFilter]);

  return (
    <div className="container  2xl:px-20 mx-auto flex flex-row lh:flex-row max-lg:space-y-4 py-4 ">
      {/* {SideBar} */}
      <div className="max-lg:hidden w-full lg:w-1/4  px-4">
        {/* {Search Fileter from header } */}
        {searched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-2">Current Search</h3>
              <div className="mb-2 flex  text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                  </span>
                )}
                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      src={assets.cross_icon}
                      alt=""
                      className="cursor-pointer"
                      onClick={(e) =>
                        setSearchFilter((prev) => ({
                          ...prev,
                          title: "",
                          location: "",
                        }))
                      }
                    />
                  </span>
                )}
              </div>
            </>
          )}
        {/* {Category filter} */}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4 ">Search by categories</h4>
          <ul className="space-y-4  text-gray-400">
            {JobCategories.map((category, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input
                  className="scale-125 cursor-pointer"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>
        {/* {Location Filter} */}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4 pt-8">Search by Locations</h4>
          <ul className="space-y-4  text-gray-400">
            {JobLocations.map((location, index) => (
              <li key={index} className="flex gap-3 items-center">
                <input
                  className="scale-125 cursor-pointer"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocation.includes(location)}
                />

                {location}
              </li>
            ))}
          </ul>
        </div>
        {/* {JobListing} */}
      </div>
      <section className="w-full lg:3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get Your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
          {filterJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>
        {/* {Pagination} */}
        {filterJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                src={assets.left_arrow_icon}
                alt=""
                onClick={() => setCurrentPge(Math.max(currentPage - 1), 1)}
              />
            </a>
            {Array.from({ length: Math.ceil(filterJobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPge(index + 1)}
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-300 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                src={assets.right_arrow_icon}
                alt=""
                onClick={() =>
                  setCurrentPge(
                    Math.min(currentPage + 1, Math.ceil(filterJobs.length / 6))
                  )
                }
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
