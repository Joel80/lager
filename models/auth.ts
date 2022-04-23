import config from "../config/config.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        let token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        let notExpired;
        if (token !== null) {
            notExpired= (new Date().getTime() - token.date) < twentyFourHours;
        } 

        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch (`${config.base_url}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        console.log(result);
        
        await storage.storeToken(result.data.token);

        return result.data.message
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.base_url}/auth/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });

        return await response.json();
    },
    logout: async function logout() {
        console.log("Logout");
        await storage.deleteToken();
    }
};

export default auth;