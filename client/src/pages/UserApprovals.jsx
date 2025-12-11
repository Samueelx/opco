import { useEffect } from "react";
import { User } from "../components";
import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

function UserApprovals() {
  const { fetchData ,users } = useContext(UsersContext);

  useEffect(() => {
    fetchData();
  }, []);

  const verifiedUsers = users.filter((user) => user.verified);
  const unverifiedUsers = users.filter((user) => !user.verified);

  return (
    <section className="max-w-[1440px] mx-auto flex justify-between gap-8 p-3">
      <div className="w-full flex flex-col gap-6">
        <h2 className="font-bold text-3xl">Verified Users</h2>

        {verifiedUsers ? (
          <ul className="px-5 flex flex-col gap-3">
            {verifiedUsers.length > 0 &&
              verifiedUsers.map((user) => <User key={user.id} user={user} />)}
          </ul>
        ) : (
          <div className="flex-center border size-full">
            <p className="font-bold text-2xl italic text-gray-500">
              No Verified Users Found!
            </p>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-6">
        <h2 className="font-bold text-3xl">Unverified Users</h2>

        {unverifiedUsers.length > 0 ? (
          <ul className="px-5 flex flex-col gap-3">
            {unverifiedUsers.length > 0 &&
              unverifiedUsers.map((user) => <User key={user.id} user={user} />)}
          </ul>
        ) : (
          <div className="flex justify-center p-4 border size-full">
            <p className="font-bold text-2xl italic text-gray-500">
              No Unverified Users Found!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserApprovals;
