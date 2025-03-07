import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import Modal from "../../Modal/Modal";
import { useState } from "react";
import AddNewUser from "../../AddNewUser";

function Dashboard() {
  const [cookies] = useCookies(["accessToken"]);
  const [open, setIsOpen] = useState(false);
  const { data: allUsers } = useQuery({
    queryKey: ["userCount", cookies],
    queryFn: async () =>
      await axios.get("https://dummyjson.com/users", {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }),
    enabled: !!cookies,
  });
  //   const {} = useMutation({
  //     mutationFn: async (data) =>
  //       await axios.put(`https://dummyjson.com/users/${data.id}`,{
  //         lastName:data.lastName
  //       }),
  //   });

  return (
    <div className="flex flex-col items-center justify-center w-full h-svh">
      {open && (
        <Modal setIsOpen={setIsOpen}>
          <AddNewUser setIsOpen={setIsOpen} />
        </Modal>
      )}
      <div className="flex w-full justify-between p-2">
        <h1 className="text-4xl content-center text-center  text-bold ">
          Total Number of Users:{allUsers?.data?.users.length}
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="p-1 border rounded-2xl bg-emerald-700 hover:bg-emerald-400 px-4 cursor-pointer"
        >
          Add New User
        </button>
      </div>

      <div className="h-svh overflow-scroll w-full">
        {allUsers?.data?.users.map((user) => {
          return (
            <div key={user.id} className="p-2 border flex justify-between ">
              <span> {user?.firstName}</span>
              <div className="flex gap-2">
                <button className="border bg-green-500 px-2 cursor-pointer">
                  update
                </button>{" "}
                <button className="border bg-red-700 px-2 cursor-pointer">
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
