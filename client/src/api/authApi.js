import api from "./axios";

export async function loginUser(credentials) {
    const response = await api.post("/auth/login", credentials);
    return response.data;
}

export async function signupUser(userData) {
    const response = await api.post("/auth/signup", userData);
    return response.data;
}