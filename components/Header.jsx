"use client"
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { BiAddToQueue } from "react-icons/bi";

import { logout } from "../store/actions/user";
import Avatar from "./Avatar";
import { useQuery } from "@tanstack/react-query";
import { logoutSession } from "../services/index/users";
import { toast } from "react-hot-toast";
import { postActions } from "../store/reducers/post";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Articles", type: "link", href: "/articles" },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/" },
      { title: "Contact us", href: "/" },
    ],
  },
];

const MenuItem = ({ onClick = () => { }, label, link = "", className = "" }) => (
  <>
    {link ? (
      <Link href={link}>
        <div
          onClick={onClick}
          className={`${className
            ? className
            : "px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            }`}
        >
          {label}
        </div>
      </Link>
    ) : (
      <div
        onClick={onClick}
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      >
        {label}
      </div>
    )}
  </>
);

const NavItem = ({ item, className = "" }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((curState) => !curState);
  };

  return (
    <div className={`relative group ${className}`}>
      {item.type === "link" ? (
        <>
          <Link href={item.href || "/"} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="px-4 flex gap-x-1 items-center"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown className="lg:block hidden" />
          </button>
          <div
            className={`${dropdown ? "block" : "hidden"
              } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    avatar: "",
  })
  const [navIsVisible, setNavIsVisible] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    setUser(userInfo)
  }, [userInfo])

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  const { refetch } = useQuery({
    refetchOnWindowFocus: false,
    enabled: false,
    queryFn: () => logoutSession(),
    onSuccess: () => {
      toast.success("Logout Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    queryKey: ["logout"],
  });

  const logoutHandler = () => {
    dispatch(logout);
    refetch();
    setNavIsVisible(false);
    redirect("/");
  };

  // to get the current URL
  const currentLocation = usePathname();

  useEffect(() => {
    currentLocation !== "/editor" && dispatch(postActions.resetPostInfo())
  }, [currentLocation, dispatch]);

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-white">
      <header className="container relative mx-auto px-5 flex justify-between py-4 items-center">
        <Link href="/">
          <Image width={200} height={200} className="w-10 rounded-lg" src="/assets/logo.jpeg" alt="logo" />
        </Link>
        <div className="lg:hidden z-50 relative block">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        {user ? (
          <div
            className={`lg:hidden transition-opacity overflow-hidden duration-200 ${navIsVisible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
              } top-16 block bg-white w-full z-50 absolute left-0 right-0 drop-shadow-md`}
          >
            <div className="flex flex-col items-center cursor-pointer gap-1">
              <MenuItem
                onClick={() => setNavIsVisible(false)}
                label={`${currentLocation === "/profile" ? "Home" : "Profile"}`}
                link={`${currentLocation === "/profile" ? "/" : "/profile"}`}
              />
              <MenuItem
                onClick={() => setNavIsVisible(false)}
                label="Articles"
                link="/articles"
              />
              <MenuItem onClick={logoutHandler} label="Logout" />
            </div>
          </div>
        ) : (
          <div
            className={`lg:hidden transition-opacity overflow-hidden duration-200 ${navIsVisible
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
              } top-16 block bg-white w-full z-50 absolute left-0 right-0 drop-shadow-md`}
          >
            <div className="flex flex-col items-center cursor-pointer gap-1">
              <MenuItem
                onClick={() => setNavIsVisible(false)}
                label="Articles"
                link="/articles"
              />
              <MenuItem
                onClick={() => setNavIsVisible(false)}
                label={`${currentLocation === "login" ? "Home" : "login"}`}
                link={`${currentLocation === "login" ? "/" : "/login"}`}
              />
            </div>
          </div>
        )}

        <div className="lg:flex gap-10 hidden">
          <div className="text-white items-center lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 gap-y-3 font-semibold">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
            {user && (
              <Link href="/editor">
                <BiAddToQueue
                  size={20}
                  className="text-blue-500 lg:block hidden"
                />
              </Link>
            )}
          </div>
          {user ? (
            <Link href="/profile" className={`cursor-pointer lg:block hidden`}>
              <Avatar
                src={
                  user?.avatar
                    ? user.avatar
                    : "/assets/images/user.png"
                }
              />
            </Link>
          ) : (
            <Link href="/login">
              <button
                className={`${currentLocation === "/login" || currentLocation === "/register"
                  ? "hidden"
                  : "block"
                  } mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300`}
              >
                Sign in
              </button>
            </Link>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
