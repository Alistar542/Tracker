import axios from "axios";
import { URL } from "../constants";

export const loginUser = (userObject) => {
  return axios.post(URL.LOGIN_USER, userObject);
};

export const createNewUser = (userObject, currentUser) => {
  return axios.post(
    URL.CREATE_NEW_USER,
    userObject,
    createAccessToken(currentUser)
  );
};

export const updateUser = (userObject, currentUser) => {
  return axios.post(
    URL.CREATE_NEW_USER,
    userObject,
    createAccessToken(currentUser)
  );
};

function createAccessToken(currentUser) {
  return {
    headers: { Authorization: `Bearer ${currentUser.accessToken}` },
  };
}
