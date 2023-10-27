"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ManagePosts from "@/components/admin/ManagePosts";
import { ProfilePicture } from "@/components";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/services/index/users";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    email: "",
    posts: [],
    verified: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      redirect("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, isLoading } = useQuery({
    queryFn: () => getUserProfile(),
    queryKey: ["profile"],
  });

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

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
    redirect("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="w-full py-6 px-4 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <button
            onClick={logoutHandler}
            className="lg:block hidden px-4 py-2 bg-red-500 hover:bg-red-400 transition-colors duration-150 rounded-sm font-semibold text-white"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex lg:flex-row flex-col-reverse items-center">
        <ManagePosts posts={data?.posts} isLoading={isLoading} />
        <div className="w-full md:w-[80%] lg:w-1/3 p-1 h-screen lg:bg-[#f8f8f8] lg:drop-shadow-md lg:border-b-[3px] border-b">
          <div className="pb-4 w-full h-full lg:bg-white lg:shadow-inner pt-20">
            <div className="w-full h-full flex flex-col items-center gap-4">
              <ProfilePicture avatar={user?.avatar} />
              <h1 className="md:text-xl text-sm font-normal mt-3">
                {user?.name}
              </h1>
              <h2 className="md:text-[14px] text-xs">
                Fullstack Developer | Nextjs Expert | Designer
              </h2>
              <h1 className="text-center max-w-sm text-xs leading-normal md:text-[16px]">
                Strategising, questioning, designing, challenging, planning and
                building digital experiences. That is what gets me out of bed.
              </h1>
              <div className="flex justify-center items-center w-full gap-16 mt-8">
                <div className="flex flex-col items-center capitalize">
                  <h1 className="font-semibold">2123</h1>
                  <h1>followers</h1>
                </div>
                <div className="h-9 border-[1px] sm:border-[1px] border-slate-300" />
                <div className="flex flex-col items-center capitalize">
                  <h1 className="font-semibold">{data?.posts?.length}</h1>
                  {data?.posts?.length > 1 ? <h1>posts</h1> : <h1>post</h1>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
