import { apiClient } from "./ApiClient";

export const retrieveListOfMarks
=() => apiClient.get(`/listMarks`);

export const addMark
=(mark) => apiClient.post(`/add-marks`, mark);

export const retrieveMarkDetail
=(id) => apiClient.get(`/mark/${id}`);

export const getMark
=(mark) => apiClient.post(`/getMark`, mark);

export const getMarksAverage
=(studentId, courseId) => apiClient.get('/getMarksAvg', studentId, courseId);

export const calcHighScore
=(mark) => apiClient.post('/calculate-highscore', mark);

export const calcAverage
=(mark) => apiClient.post('/calculate-average', mark);