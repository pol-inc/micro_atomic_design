import { ApiService } from "../../core/ApiService";
import { Result } from "../../core/Result";
import { MessageDriver } from "./type";

export class MessageAPIDriver implements MessageDriver {
  private readonly _api: ApiService;

  constructor(api: ApiService) {
    this._api = api;
  }

  fetch<T>(): Promise<Result<T, Error>> {
    return new Promise(async (resolve) => {
      try {
        // api通信します。
        return resolve(Result.Ok({}));
      } catch (e) {
        return resolve(Result.Err(e));
      }
    });
  }
}
