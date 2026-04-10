const BASE_URL = "http://localhost:5000/api";
//const BASE_URL = "https://saferoute-tkxm.onrender.com/api";
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

function getToken() {
    return localStorage.getItem("token");
}

export const checkSafety = async (data: {
    source: string;
    destination: string;
    time: string;
    lat?: number;
    lon?: number;
}) => {
    const res = await fetch(`${BASE_URL}/safety/check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to check safety");
    return res.json();
};

export const submitFeedback = async (data: {
    source: string;
    destination: string;
    rating: number; // 1 to 5
    comment?: string;
    travelTime?: string;
}) => {
    const res = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit feedback");
    return res.json();
};

export const fetchTrips = async () => {
    const res = await fetch(`${BASE_URL}/trips`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to fetch trips");
    return res.json();
};

export const createTrip = async (data: any) => {
    const res = await fetch(`${BASE_URL}/trips`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create trip");
    return res.json();
};

export const updateTrip = async (id: string, data: any) => {
    const res = await fetch(`${BASE_URL}/trips/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update trip");
    return res.json();
};

export const deleteTrips = async () => {
    const res = await fetch(`${BASE_URL}/trips`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    if (!res.ok) throw new Error("Failed to delete trips");
    return res.json();
};