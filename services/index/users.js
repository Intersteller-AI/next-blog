import axios from "axios";
import { server } from "../server";

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(
      `${server}/api/users/register`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    // Cookies.set("token", data.token, { expires: 7, secure: false });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      `${server}/api/users/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    // Cookies.set("token", data.token, { expires: 7, secure: false });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const logoutSession = async () => {
  try {
    const { data } = await axios.get(`${server}/api/users/logout`, {
      withCredentials: true,
    });

    // Cookies.remove("token");
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await axios.get(`${server}/api/users/profile`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const uploadProfilePic = async ({ formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/api/users/uploadProfilePic`,
      formData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteProfilePic = async () => {
  try {
    const { data } = await axios.delete(
      `${server}/api/users/deleteProfilePic`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
