import { Result } from "../../core/Result";

export interface MessageDriver {
  fetch<T>(): Promise<Result<T, Error>>;
}
