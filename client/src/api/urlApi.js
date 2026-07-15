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

export async function createShortUrl(originalUrl) {

    const response = await api.post("/urls", {
        originalUrl,
    });

    return response.data.data;

}

export async function deleteUrl(id) {

    await api.delete(`/urls/${id}`);

}

export async function getAnalytics() {

    const response = await api.get("/urls/analytics");

    return response.data.data;

}