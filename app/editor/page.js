"use client";
import { useEffect, useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { deletePostImage, uploadPostImage } from "@/services/index/posts";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Creator from "@/components/editor/Creator";
import { usePathname } from "next/navigation";

const EditorPage = () => {
  const currentLocation =
    usePathname().split("/")[usePathname().split("/").length - 1];

  const [modal, setModal] = useState(false);
  const [post, setPost] = useState({
    title: "",
    caption: "",
    body: "",
    postPicture: "",
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [modal, currentLocation]);

  return (
    <div className="min-h-screen px-8 md:px-36 flex flex-col relative overflow-hidden">
      <h1 className="self-center font-semibold md:text-[28px]">
        Create a new blog
      </h1>
      <hr className="w-full bg-gray-400 mt-3" />
      <div className="mt-6">
        <div
          className={`absolute w-full h-full bg-white z-10 ${
            modal ? "block" : "hidden"
          } opacity-70`}
        />
        <Creator
          post={post}
          setPost={setPost}
          modal={modal}
          setModal={setModal}
        />
      </div>
    </div>
  );
};

export default EditorPage;
