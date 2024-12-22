import type { AxiosRequestConfig, AxiosResponse, AxiosInstance as BaseAxiosInstance } from 'axios';

declare module 'axios' {
  export interface AxiosInstance extends BaseAxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  }

  export interface AxiosStatic {
    create(config?: AxiosRequestConfig): AxiosInstance;
  }
} 