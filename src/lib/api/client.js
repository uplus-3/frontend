import React from 'react';
import axios from 'axios';

const client = axios.create({});

// 요청 성공시 실행할 함수
const successRequest = async (response) => {
  return response;
};

// 요청 실패시 실행할 함수
const failureRequest = async (error) => {
  return Promise.reject(error);
};

// 응답 성공시 실행할 함수
const successResponse = async (response) => {
  return response;
};

// 응답 실패시 실행할 함수
const failureResponse = async (error) => {
  return Promise.reject(error);
};

// 요청(request)) interceptor
client.interceptors.request.use(
  (config) => successRequest(config), // 정상적인 응답을 반환한 경우
  (error) => failureRequest(error), // 에러가 발생한 경우
);

// 응답(response) interceptor
client.interceptors.response.use(
  (response) => successResponse(response), // 정상적인 응답을 반환한 경우
  (error) => failureResponse(error), // 에러가 발생한 경우
);

export default client;
