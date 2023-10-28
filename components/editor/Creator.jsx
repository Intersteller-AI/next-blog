"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'
import { Input } from '.'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { createPost, updatePost } from '@/services/index/posts'
import { useMutation } from '@tanstack/react-query'
// import Quill from 'quill'
import "quill/dist/quill.snow.css";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'
import ReactHtmlParser from 'html-react-parser'
import Button from './Button'
import EditorModal from './EditorModal'
import { postActions } from '@/store/reducers/post'
import Cookies from 'js-cookie'

const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false });

const Creator = ({ modal, setModal, post, setPost }) => {

	const [currentSlide, setCurrentSlide] = useState(0);
	const [postSlug, setPostSlug] = useState(null);
	const [isUpadating, setIsUpadating] = useState(false);
	const dispatch = useDispatch();
	const [activeButt, setActiveButt] = useState(false)
	const [htmlBody, setHtmlBody] = useState("")

	const router = useRouter()

	const { userPost } = useSelector((state) => state.post);

	const handleChange = (e) => {
		const { name, value } = e.target
		setPost({ ...post, [name]: value });
	};

	const { mutate: submitMutate } = useMutation({
		mutationFn: ({ formData }) => createPost({ formData }),
		onSuccess: () => {
			toast.success("Post created successfully");
			setActiveButt(true)
			Cookies.remove("title")
			router.push("/");
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("title", Cookies.get("title"));
		formData.append("body", post.body);
		formData.append("postPicture", post.postPicture);
		formData.append("caption", post.caption);

		console.log(post);
		// submitMutate({ formData });
	};

	const { mutate: updateMutate } = useMutation({
		mutationFn: ({ formData, slug }) => updatePost({ formData, slug }),
		onSuccess: () => {
			toast.success("Post updated successfully");
			dispatch(postActions.resetPostInfo());
			setActiveButt(true)
			Cookies.remove("title")
			router.push("/");
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	const handleUpdate = (e) => {
		e.preventDefault();

		const formData = new FormData();

		// formData.append("title", post.title);
		formData.append("title", Cookies.get("title"));
		formData.append("body", post.body);
		formData.append("postPicture", post.postPicture);
		formData.append("caption", post.caption);

		console.log(post);
		updateMutate({ formData, slug: postSlug });
	};

	useEffect(() => {
		if (userPost) {
			setIsUpadating(true);
			setPost({
				title: userPost.title,
				caption: userPost.caption,
				postPicture:
					userPost.photo === "/assets/sample.jpg"
						? ""
						: userPost.photo,
				body: userPost.body,
			});
			setBody(userPost.body)
			setPostSlug(userPost.slug);
		}
	}, []);

	useEffect(() => {
		setPost({ ...post, body: htmlBody })
	}, [htmlBody])

	return (
		<>
			<form
				method="post"
				className="flex flex-col gap-6"
				onSubmit={isUpadating ? handleUpdate : handleSubmit}
			>
				<div className="w-full flex flex-col gap-4">
					<label className={`text-lg md:text-[24px] leading-tight font-semibold capitalize`}>
						title
					</label>
					<input
						value={post.title}
						onChange={handleChange}
						type="text"
						name="title"
						className={`p-4 font-normal text-lg md:text-[20px] bg-white border-gray-300 focus-within:border-blue-500 border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed`}
					/>
				</div>
				<div className="w-full overflow-hidden mt-4">
					<div className="w-full flex items-center">
						<div className="flex items-center justify-center rounded-t-[3px] overflow-hidden">
							<span
								className={`indicator font-normal text-[16px] md:text-[20px] cursor-pointer px-2 bg-slate-200 ${currentSlide === 0 ? "active" : ""
									}`}
								onClick={() => setCurrentSlide(0)}
							>
								Editor
							</span>
							<span
								onClick={() => setCurrentSlide(1)}
								className={`indicator font-normal text-[16px] md:text-[20px] cursor-pointer px-2 bg-slate-200 ${currentSlide === 2 ? "active" : ""
									}`}
							>
								Preview
							</span>
						</div>
					</div>
					<div className="slides-inner w-full h-full transition duration-200 flex snap-mandatory snap-x"
						style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
						<div className="w-full h-full snap-center flex-shrink-0">
							<QuillEditor post={post} setPost={setPost} />
						</div>
						<div className="w-full h-full snap-center p-2 border-2 border-slate-300 flex-shrink-0">
							<div className='w-full h-full' style={{ height: "40vh" }} >
								{ReactHtmlParser(String(post.body))}
							</div>
						</div>
					</div>
				</div>
				<Button onClick={() => setModal(!modal)} text="Next" />
				<EditorModal post={post} handleChange={handleChange} setPost={setPost} isUpadating={isUpadating} setModal={setModal} modal={modal} activeButt={activeButt} />
			</form>
		</>
	)
}

export default Creator