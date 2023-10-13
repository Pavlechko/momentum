import axios from "axios";
import jwt_decode from "jwt-decode";

import { UserRequest } from "../models/Auth/user.types";

type jwt = {
    exp: number,
    userId: string,
    userName: string
}

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/", // .env
    headers: {
        "Content-type": "application/json"
    }
});

export async function login(user: UserRequest) {
    getToten('auth/signin', user)

}

export async function registration(user: UserRequest) {
    getToten('auth/signup', user)
}

async function getToten(url: string, user: UserRequest): Promise<void> {
    const response = await axiosInstance.post(url, user, {
        headers: {
            Authorization: "application/json"
        }
    })
    const token = response.headers['authorization'].split(' ')[1]

    localStorage.setItem("token", token);
    console.log(token)
}

export function isExpirationToken(token: string): Boolean {
    if (typeof(token) !== "string") {
        return false
    }
    const jwtData: jwt = jwt_decode(token);

    let num = +jwtData.exp.toString().padEnd(13, '0');
    if (num - new Date().getTime()) {
        return true
    }
    return false
}