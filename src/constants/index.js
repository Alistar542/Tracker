export const STATUS_DESCRIPTION = {
  N: "New",
  P: "Proposed",
  R: "Rejected",
  D: "Done",
};

export const STATUS = {
  NEW: "N",
  PROPOSED: "P",
  REJECTED: "R",
  DONE: "D",
};

export const URL = {
  UPDATE_STUDENT: "http://localhost:5000/student/update/",
  LOGIN_USER: "http://localhost:5000/user/login",
  FIND_STUDENT: "http://localhost:5000/student/getstudent",
  SAVE_STUDENT: "http://localhost:5000/student/add",
  FIND_STUDENT_HISTORY:
    "http://localhost:5000/studenthistory/getstudenthistory",
  UPDATE_STATUS_OF_STUDENT:
    "http://localhost:5000/student/updateStatusOfStudent",
  FIND_COUNTRIES: "https://restcountries.eu/rest/v2/all?fields=name",
};

export const OPERATION_FLAG = {
  INSERT: "I",
  UPDATE: "U",
  DELETE: "D",
};

export const OPERATION_FLAG_DESC = {
  I: "Created",
  U: "Updated",
  D: "Deleted",
};

export const USER_TYPE = {
  ADMINISTRATOR: "A",
  EMPLOYEE: "E",
};

export const APPLICATION_STATUS = {
  NEW: "N",
  POSTPONED: "O",
  PROPOSED: "P",
  TRAVELLED: "T",
  CANCELLED: "C",
};

export const APPLICATION_STATUS_DESC = {
  N: "NEW",
  O: "POSTPONED",
  P: "PROPOSED",
  T: "TRAVELLED",
  C: "CANCELLED",
};

export const APPLICATION_STATUS_ARRAY = [
  { status: "New", value: "N" },
  { status: "Postponed", value: "X" },
  { status: "Proposed", value: "P" },
  { status: "Travelled", value: "T" },
  { status: "Cancelled", value: "C" },
];
