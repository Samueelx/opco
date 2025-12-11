import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/20/solid";
import { Fragment, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { Link } from "react-router-dom";

export default function ProfileDropdown() {
  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center gap-2 group">
            <UserIcon
              className="-mr-1 ml-2 h-5 w-5 text-black"
              aria-hidden="true"
            />
            <span className="group-hover:underline">
              {currentUser.username}
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              {currentUser.userType === "superAdmin" && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/user-approvals"
                      className={`${
                        active ? "bg-red-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Verify Users
                    </Link>
                  )}
                </Menu.Item>
              )}

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
