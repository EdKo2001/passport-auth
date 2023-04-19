import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(
    (config) => {
        // config.headers.Authorization =
        //     "Bearer " + window.localStorage.getItem("token");

        return config;
    },
    (error) => {
        if (error?.response?.status === 401) {
            console.log("error");
            return <Navigate to="/" />;
        }

        return Promise.reject(error);
    }
);

export default instance;