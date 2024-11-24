
const baseUrl = "http://localhost:8080/";
export const GET = async (url) => {
    
    const response = await fetch(baseUrl+url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            "Access-Control-Allow-Origin": "http://localhost:5173",

        },
    });
    const data = await response.json();
    return data;
}

export const POST = async (url, data) => {
    const response = await fetch(baseUrl+url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            "Access-Control-Allow-Origin": "http://localhost:5173",
        },
        body: JSON.stringify(data),
    });
    const data1 = await response.json();
    return data1;
}
export const PUT = async (url, data) => {
    const response = await fetch(baseUrl+url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            "Access-Control-Allow-Origin": "http://localhost:5173",
        },
        body: JSON.stringify(data),
    });
    const data1 = await response.json();
    return data1;
}
export const DELETE = async (url) => {
    const response = await fetch(baseUrl+url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            "Access-Control-Allow-Origin": "http://localhost:5173",
        },
    });
    const data = await response.json();
    return data;
}
