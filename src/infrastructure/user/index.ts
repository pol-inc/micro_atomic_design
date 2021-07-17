import { ApiClient } from "../../core/ApiClient";
import { UserDriver } from "./type";

export class UserAPIDriver implements UserDriver {
  private readonly _api: ApiClient;

  constructor(api: ApiClient) {
    this._api = api;
  }

  fetch<T>(): Promise<T> {
    try {
      const response = this._api.request("/sample");
      // api通信します。
      return Promise.resolve(response.data as T);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
