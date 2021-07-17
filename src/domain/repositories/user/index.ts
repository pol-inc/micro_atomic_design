import { UserDriver } from "../../../infrastructure";
import { ReadUserRepository } from "./type";

export class UserRepository implements ReadUserRepository {
  private readonly _driver: UserDriver;

  constructor(driver: UserDriver) {
    this._driver = driver;
  }

  read(): Promise<any> {
    return this._driver.fetch();
  }
}
