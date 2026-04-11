import axios from "axios";
import { BACKEND_URL } from "../../config";
import { SignupInput } from "@100xbansal/medium-common";

export const BloggingService = {
    auth: (type: "signup" | "signin", data: SignupInput) => {
        return axios.post(`${BACKEND_URL}/api/v1/user/${type}`, data)
    }
}