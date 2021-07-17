import * as U from "../application/usecases";
import * as R from "../domain/repositories";
import * as D from "../infrastructure";
import { ApiClient } from "../core/ApiClient";

//
type Dependency = {};
type Params = {};

/**
 * アプリ全体の依存を解決します。
 *　依存の解決は各画面が表示されるときに初めて行われる
 */
class CompositionRoot {
  // Property
  private _dependency: Dependency;
  private _params: Params;

  // リポジトリをメモ化する
  private _memoRepo: { [name: string]: unknown };

  /**
   * 依存の解決のエントリーポイント
   *
   * @return CompositionRoot
   */
  public static resolve(): CompositionRoot {
    return new CompositionRoot({}, {});
  }

  /**
   * コンストラクタは　resolve　メソッド内で呼び出されます。
   * インスタンスを直接生成することはできません。
   *
   * @param dependency 依存オブジェクト
   * @param params　パラメータオブジェクト
   */
  private constructor(dependency: Dependency, params: Params) {
    this._dependency = dependency;
    this._params = params;
    this._memoRepo = {};
  }

  // UseCases

  public get GetMessageUseCase(): U.GetMessage {
    return new U.GetMessageUseCase(this.createMessageRepository());
  }

  // Repository

  private createMessageRepository(): R.ReadUserRepository {
    // ここキャッシュしたても良い
    return new R.UserRepository(new D.UserAPIDriver(new ApiClient()));
  }
}

// 依存の解決
const composition = CompositionRoot.resolve();
export default composition;
