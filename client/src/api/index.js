import axios from "axios";


// const weburl = "https://8080-shreedattpa-aiimagegene-0vu8igimawn.ws-us117.gitpod.io/api/";
// const localurl= "http://localhost:8080/"
const WebUrl= "https://ai-image-generator-ey71.onrender.com/"
// http://localhost:8080/api/


// Public API (No token)
export const PublicAPI = axios.create({
  baseURL: WebUrl,
  headers: { "Content-Type": "application/json" },
});

// Private API (Sends token)
export const PrivateAPI = axios.create({
  baseURL: WebUrl,
  headers: { "Content-Type": "application/json" }
});

// Add token only for private requests
PrivateAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log(typeof token, token);
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const GetPosts = async () => await PrivateAPI.get("/post");

export const CreatePost = async (data) => await PrivateAPI.post("api/post/create", data);

export const authUserInfo = async (uid) =>  await PrivateAPI.get(`api/user/${uid}`);
export const UserAuth = async (data) => await PrivateAPI.post("api/userauth", data);

export const AuthLogin = async (data) => await PublicAPI.post("login", data);

export const AuthRegister = async (data) => await PublicAPI.post("register", data);

export const GenerateImageFromPrompt = async (data) =>
  await PrivateAPI.post("api/generateImage/", data);
