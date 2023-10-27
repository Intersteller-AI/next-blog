import axios from "axios";
import { server } from "../server";

export const getAllPosts = async () => {
  try {
    const { data } = await axios.get(`${server}/api/posts`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`${server}/api/posts/${slug}`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const uploadPostImage = async ({ formData }) => {
  try {
    // const config = { headers: { `Content-Type`: `multipart/form-data` } };
    const { data } = await axios.post(`${server}/api/posts/upload`, formData);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(`error.response.data.message`);
    }
    throw new Error(error.message);
  }
};

export const deletePostImage = async ({ filename }) => {
  try {
    const { data } = await axios.delete(`${server}/api/posts/upload/${filename}`);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const createPost = async ({ formData }) => {
  try {
    const { data } = await axios.post(`${server}/api/posts/`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updatePost = async ({ formData, slug }) => {
  try {
    const { data } = await axios.put(`${server}/api/posts/${slug}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const deletePost = async ({ slug }) => {
  try {
    const { data } = await axios.delete(`${server}/api/posts/${slug}`);

    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const likePost = async ({ slug }) => {
  try {
    const { data } = await axios.post(`${server}/api/posts/likePost/${slug}`);

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
