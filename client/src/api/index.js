import axios from "axios";

// http://localhost:8080/api/
const API = axios.create({
  baseURL: "https://8080-shreedattpa-aiimagegene-0vu8igimawn.ws-us117.gitpod.io/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/create", data);
export const AuthLogin = async (data) => await API.post("/login", data);
export const AuthRegister = async (data) => await API.post("/register", data);
export const GenerateImageFromPrompt = async (data) =>
  await API.post("/generateImage/", data);
