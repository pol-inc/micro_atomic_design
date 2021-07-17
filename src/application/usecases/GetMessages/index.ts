import { GetMessage } from "./type";
import { ReadUserRepository } from "../../../domain/repositories";

export class GetMessageUseCase implements GetMessage {
  //
  private readonly _repository: ReadUserRepository;

  constructor(repository: ReadUserRepository) {
    this._repository = repository;
  }

  handle(): Promise<any> {
    return this._repository.read();
  }
}
