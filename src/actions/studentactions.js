import axios from "axios";
import { URL } from "../constants";

//heroku sample request
//https://protected-gorge-55144.herokuapp.com/student/getstudent

export const updateStudent = (studentObject, currentUser) => {
  return axios.post(
    URL.UPDATE_STUDENT + studentObject.studentId,
    studentObject,
    createAccessToken(currentUser)
  );
};

export const findStudent = (studentObject, currentUser) => {
  return axios.post(
    URL.FIND_STUDENT,
    studentObject,
    createAccessToken(currentUser)
  );
};

export const saveStudent = (studentObject, currentUser) => {
  return axios.post(
    URL.SAVE_STUDENT,
    studentObject,
    createAccessToken(currentUser)
  );
};

export const updateStatusOfStudent = (studentObject, currentUser) => {
  return axios.post(
    URL.UPDATE_STATUS_OF_STUDENT + studentObject.studentId,
    studentObject,
    createAccessToken(currentUser)
  );
};

export const saveProposalInfo = (proposalObject, currentUser) => {
  return axios.post(
    URL.SAVE_PROPOSAL_INFO,
    proposalObject,
    createAccessToken(currentUser)
  );
};

function createAccessToken(currentUser) {
  return {
    headers: { Authorization: `Bearer ${currentUser.accessToken}` },
  };
}
