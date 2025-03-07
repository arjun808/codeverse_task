import React from "react";
import { sideBarOprions } from "../AdminDashboard/dashboard.config";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
const SideBaroptions = [
  {
    title: "Dashboard",
    ToRender: sideBarOprions.Dashboard,
  },
  {
    title: "User List",
    ToRender: sideBarOprions.UserList,
  },
  {
    title: "Profile",
    ToRender: sideBarOprions.Profile,
  },
];
function Sidebar({ setOptions, data }) {
  const [, , removeCookie] = useCookies(["accessToken"]);

  const handleClick = () => {
    removeCookie("accessToken", { path: "/" });
    toast.success("logged out");
  };

  return (
    <div className="w-72 bg-cyan-600  h-svh border-l-amber-200">
      <div className="flex gap-2 items-center justify-center">
        <img className="h-8 w-8" src={data?.image} alt="profile"></img>{" "}
        <h1 className="text-center text-2xl p-2.5">
          Welcome, {data?.firstName}
        </h1>
      </div>

      <div className="border-green-200 border-1"></div>
      <div className="flex flex-col items-start p-4 h-[85%]">
        {SideBaroptions.map((item) => {
          return (
            <button
              onClick={() => setOptions(item.ToRender)}
              className="cursor-pointer hover:bg-gray-700 p-1 rounded-2xl w-1/2"
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <div className="p-2">
        {" "}
        <button
          onClick={handleClick}
          className="w-full rounded-2xl cursor-pointer bg-white p-2 m-auto "
        >
          logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
