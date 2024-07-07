import React, { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdDashboardCustomize, MdSpaceDashboard } from "react-icons/md";
import { FaLocationArrow, FaUsers } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import {
  FaEdit,
  FaHome,
  FaPlusCircle,
  FaQuestionCircle,
  FaUserAlt,
} from "react-icons/fa";
import logo from "/logo.png";
import Login from "../components/Login";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../contexts/AuthProvider";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome />
        Home
      </Link>
    </li>
    <li className="mt-3">
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li className="mt-3">
      <Link to="/menu">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li className="mt-3">
      <Link to="/menu">
        <FaQuestionCircle />
        Customer Supports
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const {loading} = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const { logOut } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        alert("Logout Succussfull!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      {
        isAdmin ? <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdSpaceDashboard />
            </label>
            <button onClick={handleLogout} className="btn rounded-full px-6 bg-red-700 flext items-center gap-2 text-white sm:hidden">
              <FaUserAlt />
              LogOut
            </button>
          </div>
          <div className="mt-5 sm:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flext justify-start mb-3">
                <img src={logo} alt="" className="h-10 w-30" />
                <span class="badge badge-primary">Admin</span>
              </Link>
            </li>
            <hr />
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboardCustomize />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-booking">
                <FaCartShopping />
                Manage Booking
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                <FaPlusCircle />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaEdit />
                Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUsers />
                All Users
              </Link>
            </li>

            <hr />

            {/* Shared nav Link */}
            {sharedLinks}
          </ul>
        </div>
      </div> : <Login/>
      }
    </div>
  );
};

export default DashboardLayout;
