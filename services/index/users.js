import axios from "axios";
import Cookies from "js-cookie";
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
    const { data } = await axios.get(`${server}/api/users/logout`);

    Cookies.remove("token");
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
      withCredentials: true
    });

    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export const updateProfile = async ({ userData }) => {
  try {
    const { data } = await axios.put(
      `${server}/api/users/updateProfile`,
      userData,
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

export const uploadProfilePic = async ({ formData }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
    const { data } = await axios.delete(`${server}/api/users/deleteProfilePic`);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
