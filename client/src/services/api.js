import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = config.headers || {};
            
            // This is a safety check. It says: "If the headers object doesn't exist yet, create an empty one." This prevents the code from crashing if config.headers is undefined.

            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
    // This passes the error down the line to your own try/catch blocks or .catch() methods in your components so you can handle the failure gracefully.
);

// api : instance of axios
// interceptors : a buit in feauture of axios , that lets you globally handle req or responses.
// .request : specifically targets the ongoing req
// .use : this is a method that accepts two functions :-
// function-1 = success : runs if the req is being prepared successfully
// function-2 = error : runs if something goes wrong even before the req is being sent.


export default api;