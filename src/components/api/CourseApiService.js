import { apiClient } from "./ApiClient";

export const retrieveListOfCourses
=() => apiClient.get(`/courses`);

export const addCourseDetail
=(course) => apiClient.post(`/addcourse`, course);

export const retrieveCourseDetail
=(id) => apiClient.get(`/courses/${id}`);

export const updateCourseDetail
=(id, course) => apiClient.put(`/courses/${id}`, course);

export const deleteCourseDetail
=(id) => apiClient.delete(`/courses/${id}`);