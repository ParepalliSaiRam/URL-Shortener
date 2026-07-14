import api from "./axios";

export async function getDashboard() {

    const response = await api.get("/urls/dashboard");

    return response.data.data;

}

export async function getUserUrls(params) {

    const response = await api.get("/urls", {
        params,
    });

    return response.data.data;

}