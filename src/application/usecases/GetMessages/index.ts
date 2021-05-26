import { GetMessage } from "./type";
import { Result } from "../../../core/Result";
import { Repository } from "../../../domain/repositories";

export class GetMessageUseCase implements GetMessage {
  //
  private readonly _repository: Repository;

  constructor(repository: Repository) {
    this._repository = repository;
  }

  handle(): Promise<Result<any, Error>> {
    const results = this._repository.fetch();
    return results.match({
      Ok: (v) => Result.Ok(this.convertTo(v)),
      Err: (e) => Result.Err(e),
    });
  }

  private convertTo(v: any): any {
    return {};
  }
}
