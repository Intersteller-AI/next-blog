"use client";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { TbShare3 } from "react-icons/tb";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

import { ErrorMessage, ArticleDetailSkeleton, BreadCrumbs } from "@/components";
import CommentsContainer from "@/components/comments/CommentsContainer";
import { postActions } from "@/store/reducers/post";
import Link from "next/link";
import Image from "next/image";
import { deletePost, getSinglePost, likePost } from "@/services/index/posts";

const ArticleDetailPage = ({ params }) => {
  const { slug } = params;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);
  const [like, setLike] = useState(false);
  const [bookmarks, setBookmarks] = useState(false);

  const [user, setUser] = useState({
    name: "",
    avatar: "",
    _id: ""
  });

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["articles", slug],
    onSuccess: (data) => {
      setLike(
        data.likes.includes(user?._id) === true ? true : false
      );
      setbreadCrumbsData([
        { name: "Home", link: "/" },

        { name: "Articles", link: "/articles" },

        { name: `${data?.title}`, link: `/articles/${data.slug}` },
      ]);
      setBody(parse(data?.body));
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { mutate: deletePostMutate } = useMutation({
    mutationFn: (slug) => deletePost({ slug }),
    onSuccess: (message) => {
      toast.success(message.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const handleDeletePost = () => {
    deletePostMutate(slug);
  };

  const { mutate: likePostMutate } = useMutation({
    mutationFn: (slug) => likePost({ slug }),
    onSuccess: (postData) => {
      data.likes = postData.likes;
    },
    mutationKey: ["articles"],
  });
  const handleLike = () => {
    setLike((value) => !value);
    like ? toast.success("Like removed") : toast.success("Liked the post");

    likePostMutate(slug);
  };

  const handleUpdatePost = () => {
    dispatch(postActions.setPostInfo(data));
    navigate("/editor");
  };

  return (
    <div className="flex lg:flex-row flex-col min-h-screen">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="w-full lg:flex-1 flex flex-col px-5 pl-5 lg:pl-44 py-5 lg:gap-x-5 border-r">
          <article className="flex flex-col">
            <BreadCrumbs data={breadCrumbsData} />
            <div className="mt-4 flex gap-2">
              {data?.categories?.map((category, index) => (
                <Link
                  key={index}
                  href={`/articles?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category?.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-medium font-roboto text-dark-hard md:text-[32px]">
              {data?.title}
            </h1>
            <h2>{data?.subtitle}</h2>
            <Image
              width={100}
              height={100}
              className="rounded-md w-full mt-6"
              src={
                !isLoading && !isError && data
                  ? data.photo
                  : "/assets/sample.jpg"
              }
              alt="imgsa"
            />
            <hr className="w-full border-b border-gray-200 mt-2" />
            <div className="prose prose-sm sm:prose-base my-4">{body}</div>
            <hr className="w-full border-b border-gray-200" />
            <h2 className="text-2xl font-bold mt-4">Comments</h2>
            <CommentsContainer
              comments={data?.comments}
              className="mt-10"
              logginedUserId={user?._id}
              postSlug={slug}
            />
          </article>
        </section>
      )}
      <div className="lg:block hidden mt-20 w-full h-[70vmin] pt-16 md:w-1/3 z-10">
        <div className="w-full h-full flex flex-col items-center gap-3 border-b">
          <div className="relative w-36 h-36 rounded-full border-2 border-blue-500 lutline-primary overflow-hidden">
            <Image
              width={100}
              height={100}
              src={data?.user?.avatar ? data?.user?.avatar : "/assets/images/user.png"}
              alt="o"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="md:text-xl text-sm font-normal mt-3">
            {data?.user.name}
          </h1>
          <h2>Headlines</h2>
          <h1 className="text-center max-w-sm text-base">
            Strategising, questioning, designing, challenging, planning and
            building digital experiences. That is what gets me out of bed.
          </h1>
          <div className="flex justify-center items-center w-full gap-16 mt-8">
            <div className="flex flex-col items-center capitalize">
              <h1 className="font-semibold">2123</h1>
              <h1>followers</h1>
            </div>
            <div className="md:h-full h-9 border-[1px] sm:border-[1px] border-slate-300" />
            <div className="flex flex-col items-center capitalize">
              <h1 className="font-semibold">{data?.user?.posts?.length}</h1>
              {data?.user?.posts.length > 1 ? <h1>posts</h1> : <h1>post</h1>}
            </div>
          </div>
        </div>
        {user?._id === data?.user?._id && (
          <div className="mt-6 w-full flex items-center justify-center gap-4">
            <button
              onClick={handleUpdatePost}
              className="rounded-sm px-6 py-2 capitalize font-semibold bg-green-500 hover:bg-green-400 hover:text-white"
            >
              edit
            </button>
            <button
              onClick={handleDeletePost}
              className="rounded-sm px-6 py-2 capitalize font-semibold bg-red-500 hover:bg-red-400 hover:text-white"
            >
              delete
            </button>
          </div>
        )}
        <div className="flex justify-center mt-10 gap-6">
          <div
            className="cursor-pointer flex flex-col items-center"
            onClick={handleLike}
          >
            {like ? <FcLike size={35} /> : <FcLikePlaceholder size={35} />}
            {data?.likes?.length}
          </div>
          <div className="cursor-pointer">
            <TbShare3 size={35} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setBookmarks(bookmarks ? false : true)}
          >
            {bookmarks ? (
              <BsBookmarkCheckFill size={30} />
            ) : (
              <BsBookmark size={30} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
