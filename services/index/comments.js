import axios from "axios";
import { server } from "../server";

export const createNewComment = async ({ desc, slug, parent, replyOnUser }) => {
  try {
    const { data } = await axios.post(
      `${server}/api/comments`,
      {
        desc,
        slug,
        parent,
        replyOnUser,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateComment = async ({ desc, commentId }) => {
  try {
    const { data } = await axios.put(
      `${server}/api/comments/${commentId}`,
      {
        desc,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteComment = async ({ token, commentId }) => {
  try {
    const { data } = await axios.delete(`${server}/api/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
