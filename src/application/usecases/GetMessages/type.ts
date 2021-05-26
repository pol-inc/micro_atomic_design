import { Result } from "../../../core/Result";

export interface GetMessage {
  handle(): Promise<Result<any, Error>>;
}
