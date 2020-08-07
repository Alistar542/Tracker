import axios from "axios";
import { URL } from "../constants";

export const updateStudent = (studentObject) => {
  return axios.post(
    URL.UPDATE_STUDENT + studentObject.studentId,
    studentObject
  );
};
