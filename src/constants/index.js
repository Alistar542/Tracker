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
    "http://localhost:5000/student/updatestatusofstudent/",
  FIND_COUNTRIES: "https://restcountries.eu/rest/v2/all?fields=name",
  SAVE_PROPOSAL_INFO: "http://localhost:5000/student/saveproposalinfo",
  SAVE_ENROLLED_INFO: "http://localhost:5000/student/saveenrolledinfo",
  CREATE_NEW_USER: "http://localhost:5000/student/create",
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
  S: "Status Change",
};

export const USER_TYPE = {
  ADMINISTRATOR: "A",
  EMPLOYEE: "E",
};

export const APPLICATION_STATUS = {
  NEW: "N",
  POSTPONED: "X",
  PROPOSED: "P",
  ENROLLED: "E",
  CANCELLED: "C",
};

export const APPLICATION_STATUS_DESC = {
  N: "New",
  X: "Postponed",
  P: "Proposed",
  E: "Enrolled",
  C: "Cancelled",
};

export const APPLICATION_STATUS_ARRAY = [
  { status: "New", value: "N" },
  { status: "Postponed", value: "X" },
  { status: "Proposed", value: "P" },
  { status: "Enrolled", value: "E" },
  { status: "Cancelled", value: "C" },
];

export const APPLIED_COURSE_TYP = {
  M: "MAJOR",
  D: "DEGREE",
};

export const APPLCTN_STS_ARRY_PROPOSAL = [
  { status: "Postponed", value: "X" },
  { status: "Enrolled", value: "E" },
  { status: "Cancelled", value: "C" },
];

export const APPLCTN_STS_ARRY_PROSPECTUS = [
  { status: "Postponed", value: "X" },
  { status: "Proposed", value: "P" },
  { status: "Cancelled", value: "C" },
];

export const APPLCTN_STS_ARRY_ENROLLED = [{ status: "Cancelled", value: "C" }];

export const CURRENCY = ["USD", "CAD", "NZD", "AUD", "GBP", "EUR"];

export const PRIORITY = { H: "High", M: "Medium", L: "Low" };

export const PRIORITY_ARRAY = [
  { priority: "High", value: "H" },
  { priority: "Medium", value: "M" },
  { priority: "Low", value: "L" },
];
