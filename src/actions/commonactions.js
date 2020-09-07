import axios from "axios";
import { URL } from "../constants";

export const findCountries = () => {
  return axios.get(URL.FIND_COUNTRIES);
};
