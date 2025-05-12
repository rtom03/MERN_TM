import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import NotificationPanel from "./NotificationPanel";
import UserAvatar from "./UserAvatar";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { updateURL } from "../utils";
import clsx from "clsx";

const closeSidebar = () => {
  dispatch(setOpenSidebar(false));
};

const NavLink = ({ el }) => {
  const path = location.pathname.split("/")[1];

  return (
    <Link
      onClick={closeSidebar}
      to={el.link}
      className={clsx(
        "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 dark:text-gray-400 text-base hover:bg-[#2564ed2d]",
        path === el.link.split("/")[0] ? "bg-blue-700 text-white" : ""
      )}
    >
      {el.icon}
      <span className="hover:text-[#2564ed]">{el.label}</span>
    </Link>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    updateURL({ searchTerm, navigate, location });
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
  };
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-[#1f1f1f] px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4 justify-between">
        <div className="">
          <button
            onClick={() => dispatch(setOpenSidebar(true))}
            className="text-2xl text-gray-500 block md:hidden"
          ></button>
        </div>

        {/* {location?.pathname !== "/dashboard" && ( */}
        <form
          onSubmit={handleSubmit}
          className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6] dark:bg-[#1c1c1c]"
        >
          <MdOutlineSearch className="text-gray-500 text-xl" />

          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
          />
        </form>
        {/* )} */}
      </div>

      <div className={"flex gap-2 items-center"}>
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
