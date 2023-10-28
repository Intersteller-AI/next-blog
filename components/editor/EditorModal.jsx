import React, { useEffect, useState } from 'react'
import Button from './Button'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Input from './Input'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'
import { QueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deletePostImage, uploadPostImage } from '@/services/index/posts'

const EditorModal = ({ handleChange, post, setPost, modal, isUpadating, setModal, activeButt }) => {

  const queryClient = new QueryClient();

  const [file, setFile] = useState("");
  // uploading post thumbnail
  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => uploadPostImage({ formData: formData }),
    onSuccess: (data) => {
      setPost({ ...post, postPicture: data });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // to delete the thumbnail
  const { mutate: mutateDeleteImage, isLoading: isLoadingDeleteImage } = useMutation({
    mutationFn: () => {
      const filename = post.postPicture.split("upload/")[1];
      return deletePostImage({ filename });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast.success("Photo is removed");
      const formData = new FormData();
      formData.append("postPicture", undefined);
      setPost({ ...post, postPicture: "" });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const newForm = new FormData();
        newForm.append("name", file.name);
        newForm.append("postPicture", file);
        mutate(newForm);
      }
    };
    getImage();
  }, [file, mutate]);

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture")) {
      try {
        mutateDeleteImage();
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  const handleClickClose = () => {
    setModal(false);
    if (post.postPicture && !isUpadating) {
      handleDeleteImage();
    }
  };

  return (
    <div className={`z-[99] flex flex-col absolute md:top-0 md:translate-y-0 left-[50%] translate-x-[-50%] w-10/12 lg:w-1/2 bg-white drop-shadow-lg rounded-sm px-6 py-2 duration-300 transition-all ${modal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <button onClick={handleClickClose} disabled={activeButt} className='self-end mb-10 drop-shadow-md'>
        <AiOutlineCloseCircle
          className="text-black hover:text-red-400"
          size={20}
        />
      </button>
      <Input
        label="caption"
        onChange={handleChange}
        value={post.caption}
      />
      <div className="my-10 w-full flex flex-col items-center gap-4">
        <h1 className="self-start font-semibold text-lg">Thumbnail</h1>
        <div className="relative w-full md:h-56 h-[30vh] rounded-md border-2 border-blue-500 lutline-primary overflow-hidden">
          <label
            htmlFor="postPicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
          >
            {post.postPicture ? (
              <Image
                width={200}
                height={200}
                src={
                  post.postPicture
                    ? post.postPicture
                    : "/assets/sample.jpg"
                }
                alt="postPic"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center">
                <TbPhotoPlus className="w-7 h-auto text-primary" />
              </div>
            )}
            {isLoading && (
              <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                <Image
                  width={200}
                  height={200}
                  className="w-28 h-28"
                  src="/Infinity-loader.svg"
                  alt=""
                />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="postPicture"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {post.postPicture && (
          <button
            disabled={isLoadingDeleteImage}
            onClick={handleDeleteImage}
            type="button"
            className={`border border-red-500 hover:text-white hover:bg-red-500 transition duration-150 rounded-md px-4 py-2 md:text-[14px] font-normal text-red-500 disabled:bg-red-400`}
          >
            Remove
          </button>
        )}
        <Button disabled={isLoading || activeButt} type='submit' className="bg-green-500 disabled:bg-green-200 rounded-md px-4 py-2 text-white self-center text-lg mt-4" text={isUpadating ? "Update" : "Publish"} />
      </div>
    </div>
  )
}

export default EditorModal