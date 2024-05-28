import { apiClient } from "./ApiClient";

export const retrieveListOfRegisteredCourses
=() => apiClient.get(`/registeredCourses`);

export const registerForCourse
=(register) => apiClient.post(`/registerCourse`, register);

export const deleteRegisterDetail
=(id) => apiClient.delete(`/register/${id}`);

export const infoRegisterDetail
=(courseId, studentId) => apiClient.get(`/infoRegister/${courseId}/${studentId}`);