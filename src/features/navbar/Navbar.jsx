/* eslint-disable react/prop-types */
import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems, fetchItemsByUserIdAsync } from "../cart/cartSlice";
import { selectUserInfo, fetchLoggedInUserAsync } from "../user/userSlice";
import { useDispatch } from "react-redux";

const navigation = [
  { name: "Home", link: "/", user: true },
  { name: "Home", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
  { name: "Orders", link: "/my-orders", user: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLoggedInUserAsync());
    setTimeout(() => {
      if (userInfo?.role !== "admin") {
        dispatch(fetchItemsByUserIdAsync());
      }
    }, 600);
  }, [dispatch, userInfo?.role]);

  return (
    <>
      <div className="min-h-full">
        <div className="">
          <Disclosure as="nav" className="bg-[#000048]">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 bg-white w-14 grid place-items-center rounded-[3.5rem]">
                        <Link to={userInfo?.role === "admin" ? "/admin" : "/"}>
                          <img
                            className="h-12 w-auto"
                            src="/logo.png"
                            alt="Shopex"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation?.map((item) =>
                            item[userInfo?.role] ? (
                              <Link
                                key={item?.name}
                                to={item?.link}
                                className={classNames(
                                  item?.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-lg font-medium"
                                )}
                                aria-current={
                                  item?.current ? "page" : undefined
                                }>
                                {item?.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6 ">
                        {userInfo?.role !== "admin" && (
                          <>
                            <button
                              type="button"
                              disabled={!(items?.length > 0)}
                              onClick={() => navigate("/cart")}
                              className="rounded-full bg-slate-900 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 cursor-pointer">
                              <span className="sr-only">
                                View notifications
                              </span>
                              <ShoppingCartIcon
                                className="h-8 w-8"
                                aria-hidden="true"
                              />
                            </button>
                            {items?.length > 0 && (
                              <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                {items?.length}
                              </span>
                            )}
                          </>
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={"/avatar.jpg"}
                                alt="avatar"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/profile"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}>
                                    My Profile
                                  </Link>
                                )}
                              </Menu.Item>
                              {userInfo?.role !== "admin" && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to="/my-orders"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}>
                                      My Orders
                                    </Link>
                                  )}
                                </Menu.Item>
                              )}
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/logout"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}>
                                    Logout
                                  </Link>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-slate-950 p-2 text-gray-400 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation?.map((item) =>
                      item[userInfo?.role] ? (
                        <Disclosure.Button
                          key={item?.name}
                          as="a"
                          href={item?.link}
                          className={classNames(
                            item?.current
                              ? "bg-gray-900 text-white select-none"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium select-none"
                          )}
                          aria-current={item?.current ? "page" : undefined}>
                          {item?.name}
                        </Disclosure.Button>
                      ) : null
                    )}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-1 justify-center gap-[0.01rem]">
                      <div className="flex-shrink-0">
                        <img
                          className="h-9 w-9 rounded-full"
                          src={"/avatar.jpg"}
                          alt="avatar"
                        />
                      </div>
                      <div className="ml-2 mr-1">
                        <div className="text-base font-medium leading-none text-white">
                          {userInfo?.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo?.email}
                        </div>
                      </div>
                      {userInfo?.role !== "admin" && (
                        <>
                          <button
                            type="button"
                            disabled={!(items?.length > 0)}
                            onClick={() => navigate("/cart")}
                            className="rounded-full bg-gray-800 p-[0.4rem] hover:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                          {items?.length > 0 && (
                            <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              {items?.length}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <Disclosure.Button
                        as="a"
                        href="/profile"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        My Profile
                      </Disclosure.Button>
                      {userInfo?.role !== "admin" && (
                        <Disclosure.Button
                          as="a"
                          href="/my-orders"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          My Orders
                        </Disclosure.Button>
                      )}
                      <Disclosure.Button
                        as="a"
                        href="/logout"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        Logout
                      </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Shopex
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-2 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}

export default NavBar;
