import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { sideBarOprions } from "./dashboard.config";
import Dashboard from "./Dashboard/Dashboard";
import UserList from "./UserList/UserList";
import Profile from "./Profile/Profile";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";

function AdminDashboard() {
  const [options, setOptions] = useState(sideBarOprions.Dashboard);
  const [cookies] = useCookies(["accessToken"]);
  const { data } = useQuery({
    queryKey: ["me", cookies],
    queryFn: async () =>
      await axios.get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }),
    enabled: !!cookies,
  });
  return (
    <div className="flex gap-2">
      <Sidebar setOptions={setOptions} data={data?.data} />
      {options === sideBarOprions.Dashboard && <Dashboard />}
      {options === sideBarOprions.Profile && <Profile />}
      {options === sideBarOprions.UserList && <UserList />}
    </div>
  );
}

export default AdminDashboard;
