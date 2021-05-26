import { Result } from "../../../core/Result";
import { MessageDriver } from "../../../infrastructure";
import { Repository } from "./type";

export class MessageRepository implements Repository {
  private readonly _driver: MessageDriver;

  constructor(driver: MessageDriver) {
    this._driver = driver;
  }

  fetch(): Promise<Result<any, Error>> {
    throw new Error("Method not implemented.");
  }
}
