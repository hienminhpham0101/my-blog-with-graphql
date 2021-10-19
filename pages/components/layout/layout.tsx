import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, MenuIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Logo } from "../../../shared/icons/icons";
import { setTokenToLocalStorage } from "../../auth/services/localStorageServices";
import { User, useUserContext } from "../../contexts/authContext";
import { login, menu } from "../../routes/routes";

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const router = useRouter();
  const { profile, setProfile } = useUserContext();

  const handleLogout = () => {
    router.push("/login");
    setProfile({} as User);
    setTokenToLocalStorage("");
  };

  return (
    <React.Fragment>
      <Popover className="relative bg-white">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a>
                  <span className="sr-only">Workflow</span>
                  <Image className="h-8 w-auto sm:h-10" src={Logo} alt="" />
                </a>
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              {menu.map((item, index) => {
                return (
                  <Link key={index} href={item.path}>
                    <a
                      className={`text-base font-medium text-gray-500 hover:text-gray-900 ${
                        router.pathname === item.path && "text-indigo-600"
                      }`}
                    >
                      {item.title}
                    </a>
                  </Link>
                );
              })}
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {profile?.me?.username ? (
                <div>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700">
                        <span className="font-semibold cursor-pointer">
                          Welcome {profile?.me?.username}
                        </span>
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-50"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-50"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            <div
                              className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                              onClick={handleLogout}
                            >
                              Log out
                            </div>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                login.map((item, index) => {
                  return (
                    <Link key={index} href={item.path}>
                      <a className={item.className}>{item.title}</a>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {menu.map((item, index) => {
                    return (
                      <Link key={index} href={item.path}>
                        <a
                          className={`text-base font-medium text-gray-900 hover:text-gray-700 ${
                            router.pathname === item.path && "text-indigo-600"
                          }`}
                        >
                          {item.title}
                        </a>
                      </Link>
                    );
                  })}
                </div>
                <div>
                  {profile?.me?.username ? (
                    <span>Wellcome {profile?.me?.username}</span>
                  ) : (
                    <React.Fragment>
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </a>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?{" "}
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Sign in
                        </a>
                      </p>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      {children}
    </React.Fragment>
  );
}
