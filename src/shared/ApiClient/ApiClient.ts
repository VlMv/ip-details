import { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

import { axiosInstance } from './axios';
import { generateQuery } from '../lib/utils';


export type ApiResponse<T> = {
  data: T,
  meta?: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number,
    },
  },
  error?: {
    status: number,
    name: string,
    message: string,
    details: unknown,
  },
};

class ApiClient {
  constructor() {}

  private request<TResult>(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<ApiResponse<TResult>>> {
    return axiosInstance.request<ApiResponse<TResult>>({ url, ...config })
      .then(response => {
        if (response.status >= 400) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response;
      });
  }

  private originRequest<TResult>(
    url: string,
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<TResult>> {
    return axiosInstance.request<TResult>({ url, ...config });
  }

  public get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
  ) {
    const qp = queryParams ? `?${generateQuery(queryParams)}` : '';
    return this.request<TResult>(`${endpoint}${qp}`, { method: 'GET' });
  }

  public post<TResult = unknown, TData = (Record<string, unknown> | FormData)>(
    endpoint: string,
    data?: TData,
    queryParams?: Record<string, string | number>,
    config?: { responseType?: ResponseType, validateStatus?: (s: number) => boolean, isFile?: boolean },
  ) {
    const qp = queryParams ? `?${generateQuery(queryParams)}` : '';
    return this.request<TResult>(`${endpoint}${qp}`, {
      method: 'POST',
      data,
      responseType: config?.responseType,
      validateStatus: config?.validateStatus,
    });
  }

  public filePost<TResult = unknown>(
    endpoint: string,
    config?: { responseType?: ResponseType, validateStatus?: (s: number) => boolean, isFile?: boolean },
  ) {
    return this.originRequest<TResult>(`${endpoint}`, {
      method: 'POST',
      responseType: config?.responseType,
      validateStatus: config?.validateStatus,
    });
  }

  public put<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body?: TData,
    queryParams?: Record<string, string | number>,
  ) {
    const searchParams = queryParams ? generateQuery(queryParams).toString() : null;
    const urlWithParams = searchParams ? `${endpoint}?${searchParams}` : endpoint;

    return this.request<TResult>(urlWithParams, {
      method: 'PUT',
      data: body,
    });
  }

  public delete<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
  ) {
    const searchParams = queryParams ? generateQuery(queryParams).toString() : null;
    const urlWithParams = searchParams ? `${endpoint}?${searchParams}` : endpoint;

    return this.request<TResult>(urlWithParams, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
