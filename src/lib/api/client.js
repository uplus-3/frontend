import React from "react";
import axios from "axios";

const SERVER_URL = "서버주소";

export const client = axios.create({
  baseURL: `${SERVER_URL}`,
});
