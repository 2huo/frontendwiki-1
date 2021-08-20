import axios from "axios";

/* dev: "http://localhost:8001"  */
const API = axios.create({ baseURL: "http://localhost:8001" });
API.interceptors.request.use((req) => {
  // add token
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

/**
 *  users
 */
export const login = (formData) => API.post("/user/login", formData);
export const register = (formData) => API.post("/user/register", formData);
export const getUserInfo = (id) => API.get(`/user/${id}`);

/* 用户展示：点赞列表、收藏列表、浏览历史 */
export const getThumbedLinks = (id) => API.get(`/user/${id}/thumbed`);
export const getCollectedLinks = (id) => API.get(`/user/${id}/collected`);
export const getVisitedLinks = (id) => API.get(`/user/${id}/visited`);

/* 用户行为：点赞、收藏、浏览 */
/**
 * @param {*} formData {linkId}
 */
export const thumbLink = (formData, id) =>
  API.post(`/user/${id}/thumbLink`, formData);
export const collectLink = (formData, id) =>
  API.post(`/user/${id}/collectLink`, formData);
export const visitLink = (formData, id) =>
  API.post(`/user/${id}/visitLink`, formData);

/**
 *  links
 */
export const getLinksbyTerm = (term) => API.get(`/link?term=${term}}`);
export const createLink = (formData) => API.post("/link/create", formData);
export const deleteLink = (formData) => API.delete("/link/delete", formData);
export const updateLink = (formData) => API.patch("/link/update", formData);

/**
 *  comments
 */
/**
 * @param {*} formData {linkId}
 */
export const getComment = (formData) => API.post(`/comment`, formData);
/**
 * @param {*} formData {commentID}
 */
export const createComment = (formData) =>
  API.post("/comment/create", formData);
export const deleteComment = (formData) =>
  API.delete("/comment/delete", formData);
export const updateComment = (formData) =>
  API.patch("/comment/update", formData);
