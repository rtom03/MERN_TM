import React, { Fragment, useEffect, useRef } from "react";
import { Route, Navigate, Outlet, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Status from "./pages/Status";
import { Toaster } from "sonner";
import { Navbar, Sidebar } from "./components";
import { useDispatch, useSelector } from "react-redux";
import Settings from "./pages/Settings";
import { setOpenSidebar } from "./redux/slices/authSlice";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      <MobileSideBar />
      <div className="flex-1 overflow-y-auto ">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

const MobileSideBar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };
  useEffect(() => {
    console.log(isSidebarOpen);
  }, []);

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={`md:hidden w-full h-full bg-black/40 transition-transform duration-700 tranform",
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 pt-5 ">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoMdClose size={25} />
                </button>
              </div>
              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

const App = () => {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to={"/dashoard"} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/status" element={<Status />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/completed-task/:status" element={<Tasks />} />
          <Route path="/in-progress-task/:status" element={<Tasks />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/team" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster richColors />
    </main>
  );
};

export default App;
