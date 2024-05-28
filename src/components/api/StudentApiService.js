import { apiClient } from "./ApiClient";

export const retrieveListOfStudents
=() => apiClient.get(`/students`);

export const addStudentDetail
=(student) => apiClient.post(`/addstudent`, student);

export const retrieveStudentDetail
=(id) => apiClient.get(`/students/${id}`);

export const updateStudentDetail
=(id, student) => apiClient.put(`/students/${id}`, student);

export const deleteStudentDetail
=(id) => apiClient.delete(`/students/${id}`);