import React from "react";
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
import { useSelector } from "react-redux";
import Settings from "./pages/Settings";
function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      {/* <MobileSidebar/> */}
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
