
import { defaultOptionsConfig } from "../../constants/config";
import { baseUrl } from '../../constants/baseUrl';
import axios from 'axios';

interface IBaseAPI {
    get: (url: string, toke?: string) => Promise<Record<string, any>>;
    post: (url: string, body: Record<string, any>, token?: string) => Promise<Record<string, any>>;
    put: (url: string, body: Record<string, any>, token?: string) => Promise<Record<string, any>>;
    delete: (url: string, body: Record<string, any>, token?: string) => Promise<Record<string, any>>;
}

const handleCallApiWithOptions = (method = "GET", url = "", body = {},): any => {

    let options: any = {
        ...defaultOptionsConfig,
        method,
        data: JSON.stringify(body),
        url: baseUrl + url,
    }

    return axios(options);
}

const handleResponse = (res: any): any => {
    if (res && res.status === 200) {
        return res.data.data
    }
};

class BaseApi implements IBaseAPI {
    // Method GET
    async get(url: string): Promise<any> {
        try {
            const res = await handleCallApiWithOptions('get', url);
            return handleResponse(res);
        } catch (err) {
            console.error('Request Fail: ', err)
        }
    }

    // Method POST
    async post(url: string, body: Record<string, any>): Promise<any> {
        try {
            const res = await handleCallApiWithOptions('POST', url, body);
            return handleResponse(res);
        } catch (err) {
            console.error('Request Fail: ', err)
        }
    }
    // Method PUT
    async put(url: string, body: Record<string, any>): Promise<any> {
        try {
            const res = await handleCallApiWithOptions('PUT', url, body);
            return handleResponse(res);
        } catch (err) {
            console.error('Request Fail: ', err)
        }
    }
    // Method DELETE
    async delete(url: string, body: Record<string, any>): Promise<any> {
        try {
            const res = await handleCallApiWithOptions('DELETE', url, body);
            
            return handleResponse(res);
        } catch (err) {
            console.error('Request Fail: ', err)
        }
    }
}

const api = new BaseApi();
export default api;