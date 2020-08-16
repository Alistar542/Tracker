import axios from "axios";
import { URL } from "../constants";

export const findStudentHistory = (studentObject, currentUser) => {
  return axios.post(
    URL.FIND_STUDENT_HISTORY,
    studentObject,
    createAccessToken(currentUser)
  );
};

function createAccessToken(currentUser) {
  return {
    headers: { Authorization: `Bearer ${currentUser.accessToken}` },
  };
}
