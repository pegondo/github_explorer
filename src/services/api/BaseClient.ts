import axios, { AxiosRequestConfig } from "axios";

class BaseClient {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected async fetch<T>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const url = new URL(path, this.baseUrl).href;
    return axios<T>(url, config).then((response) => response.data);
  }
}

export default BaseClient;
