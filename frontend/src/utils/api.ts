const BASE_URL = "https://saferoute-tkxm.onrender.com/api";

export const registerUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Registration failed");
    }

    return res.json();
};

export const loginUser = async (data: {
    email: string;
    password: string;
}) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }

    return res.json();
};