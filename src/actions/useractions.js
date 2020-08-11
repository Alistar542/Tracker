import axios from "axios";
import { URL } from "../constants";

export const loginUser = (userObject) => {
  return axios.post(URL.LOGIN_USER, userObject);
};
