import { Result } from "../../../core/Result";

export interface Repository {
  fetch(): Promise<Result<any, Error>>;
}
