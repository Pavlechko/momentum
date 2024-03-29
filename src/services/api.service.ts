import axios, { AxiosError } from "axios";
import jwt_decode from "jwt-decode";

import { UserRequest } from "../models/Auth/user.types";
import { User } from "../context/UserContext";
import { WeatherRequest } from "../models/Weather/weather.types";
import { ExchangeRequest } from "../models/Exchange/exchange.types";
import { MarketRequest } from "../models/Market/market.types";
import { BackgroundRequest } from "../models/Background/background.types";

type jwt = {
    exp: number,
    userId: string,
    userName: string
}

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-type": "application/json"
    }
});

export function login(user: UserRequest) {
   return getToten('auth/signin', user)

}

export async function registration(user: UserRequest) {
    return getToten('auth/signup', user)
}

async function getToten(url: string, user: UserRequest) {
    try {
        const response = await axiosInstance.post(url, user, {
            headers: {
                Authorization: "application/json"
            }
        })
        const token = response.headers['authorization'].split(' ')[1]
    
        localStorage.setItem("token", token);
        console.log(token)

        return getUser(token)
    } catch (error) {
        console.error(error)
        if (error instanceof AxiosError)
        return {
            id: '',
            name: '',
            loggedIn: false,
            isError: true,
            message: error.response?.data?.Error
        }

        return {
            id: '',
            name: '',
            loggedIn: false,
            isError: true,
            message: "Unexpected error type"
        }
    }
    
}

export function isExpirationToken(token: string): boolean {
    if (typeof(token) !== "string") {
        return false
    }
    const jwtData: jwt = jwt_decode(token);

    let num = +jwtData.exp.toString().padEnd(13, '0');

    if ((num - new Date().getTime()) > 0) {
        return true
    }
    return false
}

export function getUser(token: string): User {
    if (typeof(token) !== "string") {
        return {
            id: '',
            name: '',
            loggedIn: false,
            isError: true,
            message: 'Invalid type of token',
        }
    } else {
        const jwtData: jwt = jwt_decode(token);
        return {
            id: jwtData.userId,
            name: jwtData.userName,
            loggedIn: true,
            isError: false,
            message: '',
        }
    }
}

export async function getData() {
    const token = localStorage.getItem("token")

    try {
        const response = await axiosInstance.get("/", {
            headers: {
                Authorization: `Bearer ${token ? token : " "}`
            }
        })
        console.log("Response :", response)
        return response

    } catch (error) {
        console.error(error)
    }
}

export async function updateApiData(endpoint: string, data: WeatherRequest | MarketRequest | ExchangeRequest | BackgroundRequest | null = null) {
    const token = localStorage.getItem("token")
    try {
        const response = await axiosInstance.put(`/setting/${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token ? token : " "}`
            }
        })
        console.log("Update data :", response)
        return response

    } catch (error) {
        console.error(error)
    }
}
