import axios from "axios";
import { API_PATH } from "@/app/_lib/api_paths.js";

const be = axios.create({
    baseURL: `http://${API_PATH.ORIGIN}/`,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
    },
});

export default be;
