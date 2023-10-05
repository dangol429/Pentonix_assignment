import axios from "axios";
import jwt_decode from "jwt-decode";

export const BASE_URL = "http://localhost:5000/api/";

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    // Get the JWT token from sessionStorage
    const token = sessionStorage.getItem("jwtToken");

    if (token) {
      // Decode the JWT token to access its payload
      const decodedToken = jwt_decode(token);

      // Extract the email from the decoded token
      const userEmail = decodedToken.email;

      // Include the token and email in the request headers
      config.headers["token"] = `Bearer ${token}`;
      config.headers["email"] = userEmail;
      console.log("User Email:", userEmail);
    }
    else{
      console.log("No token")
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
