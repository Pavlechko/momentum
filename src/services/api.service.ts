import axios, { AxiosInstance } from "axios";

import ApiServiceAbstract from "./api-service.abstract"

export interface RequestService extends AxiosInstance {}

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/", // .env
    headers: {
        "Content-type": "application/json"
    }
});

export class ApiService extends ApiServiceAbstract {
    constructor(private requestService: RequestService) {
        super();
    }

    post = async <R = void, B = unknown>(url: string, body?: B): Promise<R> => {
        const res = await this.requestService.post<R>(url, body);
        return res.data;
    };

    get = async <R = void>(url: string, query?: Record<string, string | number | boolean>): Promise<R> => {
        const res = await this.requestService.get<R>(url, { params: query });
        return res.data;
    };
}

export default new ApiService(axiosInstance);