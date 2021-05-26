/* eslint-disable @typescript-eslint/no-explicit-any */

function isUndefined(v: any): v is undefined {
  return v === undefined;
}

export interface OptionMatch<T, U> {
  Some: ((val: T) => U) | U;
  None: (() => U) | U;
}

export interface ResultMatch<T, E, U> {
  Ok: ((val: T) => U) | U;
  Err: ((err: E) => U) | U;
}

interface IteratorResult<T> {
  done: boolean;
  value: Option<T>;
}

interface Iterator<T> {
  next(): IteratorResult<T>;
  [Symbol.iterator](): Iterator<T>;
}

let advancedSome: Function = (): never => {
  //unreachable code
  throw new Error("unexpected advancedSome call");
};

let advancedOk: Function = (): never => {
  //unreachable code
  throw new Error("unexpected advancedOk call");
};

let advancedErr: Function = (): never => {
  //unreachable code
  throw new Error("unexpected advancedErr call");
};

class OptionIterator<T> implements Iterator<T> {
  private value: T | undefined;
  private isDone = false;

  constructor(val: T | undefined) {
    this.value = val;
  }

  [Symbol.iterator](): Iterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    const result = {
      done: this.isDone,
      value: advancedSome(this.isDone ? undefined : this.value),
    };

    this.isDone = true;
    return result;
  }
}

function isFunction(v: any): v is Function {
  return typeof v === "function";
}

class OptionBase<T> {
  protected value: T | undefined;

  constructor(val: T | undefined) {
    this.value = val;
  }

  valueOf(): T | undefined {
    return this.value;
  }
}

export class Option<T> extends OptionBase<T> {
  static Some(val: any): Option<typeof val> {
    return new Option<typeof val>(val);
  }

  static get None(): Option<any> {
    return new Option<any>(undefined);
  }

  private constructor(val: T | undefined) {
    super(val);
  }

  isSome(): boolean {
    return this.value !== undefined;
  }

  isNone(): boolean {
    return this.value === undefined;
  }

  unwrap(): T {
    if (isUndefined(this.value)) {
      throw new Error("Trying to unwrap None.");
    }

    return this.value;
  }

  unwrapOr(def: T): T {
    if (isUndefined(this.value)) {
      return def;
    }

    return this.value;
  }

  unwrapOrElse(fn: () => T): T {
    if (isUndefined(this.value)) {
      return fn();
    }

    return this.value;
  }

  map<U>(fn: (val: T) => U): Option<U> {
    if (isUndefined(this.value)) {
      return new Option<U>(undefined);
    }
    return new Option<U>(fn(this.value));
  }

  mapOr<U>(def: U, fn: (val: T) => U): U {
    if (isUndefined(this.value)) {
      return def;
    }
    return fn(this.value);
  }

  mapOrElse<U>(fnNone: () => U, fnSome: (val: T) => U): U {
    if (isUndefined(this.value)) {
      return fnNone();
    }
    return fnSome(this.value);
  }

  match<U>(fn: OptionMatch<T, U>): U {
    if (isUndefined(this.value)) {
      if (isFunction(fn.None)) {
        return fn.None();
      }
      return fn.None;
    }

    if (isFunction(fn.Some)) {
      return fn.Some(this.value);
    }
    return fn.Some;
  }

  contains(val: T): boolean {
    if (isUndefined(this.value)) {
      return false;
    }
    return this.value === val;
  }

  expect(msg: string): T {
    if (isUndefined(this.value)) {
      throw new Error(msg);
    }

    return this.value;
  }

  iter(): Iterator<T> {
    return new OptionIterator<T>(this.value);
  }

  okOr<E>(err: E): Result<T, E> {
    if (isUndefined(this.value)) {
      return advancedErr(err);
    }

    return advancedOk(this.value);
  }

  okOrElse<E>(err: () => E): Result<T, E> {
    if (isUndefined(this.value)) {
      return advancedErr(err());
    }

    return advancedOk(this.value);
  }

  and<U>(v: Option<U>): Option<U> {
    if (isUndefined(this.value)) {
      return new Option<U>(undefined);
    }
    return v;
  }

  andThen<U>(fn: (val: T) => Option<U>): Option<U> {
    if (isUndefined(this.value)) {
      return new Option<U>(undefined);
    }
    return fn(this.value);
  }

  or(v: Option<T>): Option<T> {
    if (isUndefined(this.value)) {
      return v;
    }
    return this;
  }

  orElse(fn: () => Option<T>): Option<T> {
    if (isUndefined(this.value)) {
      return fn();
    }
    return this;
  }

  xor(v: Option<T>): Option<T> {
    if (isUndefined(this.value)) {
      if (isUndefined(v.value)) {
        return new Option<T>(undefined);
      }

      return v;
    } else {
      if (isUndefined(v.value)) {
        return this;
      }

      return new Option<T>(undefined);
    }
  }

  filter(fn: (val: T) => boolean): Option<T> {
    if (isUndefined(this.value)) {
      return this;
    }

    if (fn(this.value)) {
      return this;
    }

    return new Option<T>(undefined);
  }

  getOrInsert(val: T): T {
    if (isUndefined(this.value)) {
      this.value = val;
      return this.value;
    }
    return this.value;
  }

  getOrInsertWith(fn: () => T): T {
    if (isUndefined(this.value)) {
      this.value = fn();
      return this.value;
    }
    return this.value;
  }

  take(): Option<T> {
    if (isUndefined(this.value)) {
      return this;
    }
    const ret = new Option<T>(this.value);
    this.value = undefined;
    return ret;
  }

  replace(val: T): Option<T> {
    const oldValue = this.value;
    this.value = val;
    return new Option<T>(oldValue);
  }

  cloned(): Option<T> {
    const ret = new Option<T>(undefined);

    if (!isUndefined(this.value)) {
      ret.value = JSON.parse(JSON.stringify(this.value));
    }

    return ret;
  }

  expectNone(msg: string): void {
    if (!isUndefined(this.value)) {
      throw new Error(msg);
    }
  }

  unwrapNone(): void {
    if (!isUndefined(this.value)) {
      throw new Error(
        "called `Option::unwrapNone()` on a `Some` value: " + this.value
      );
    }
  }

  flatten(): Option<T> {
    if (isUndefined(this.value)) {
      return this;
    }

    if (this.value instanceof Option) {
      return this.value as Option<T>;
    }

    return this;
  }

  [Symbol.iterator](): Iterator<T> {
    return new OptionIterator<T>(this.value);
  }

  toJSON(): object {
    if (isUndefined(this.value)) {
      return {};
    }
    return { value: this.value };
  }

  equals(v: Option<T>): boolean {
    return JSON.stringify(this) === JSON.stringify(v);
  }
}

advancedSome = Option.Some;

export class Result<T, E> {
  private value: T | undefined;
  private error: E | undefined;

  static Ok(val: any): Result<typeof val, any> {
    return new Result<typeof val, any>(val, undefined);
  }

  static Err(err: any): Result<any, typeof err> {
    return new Result<any, typeof err>(undefined, err);
  }

  private constructor(val: T | undefined, err: E | undefined) {
    this.value = val;
    this.error = err;
  }

  isOk(): boolean {
    return this.value !== undefined;
  }

  isErr(): boolean {
    return this.value === undefined;
  }

  ok(): Option<T> {
    if (isUndefined(this.value)) {
      return Option.None;
    }

    return Option.Some(this.value);
  }

  err(): Option<E> {
    if (isUndefined(this.value)) {
      return Option.Some(this.error);
    }

    return Option.None;
  }

  unwrap(): T {
    if (isUndefined(this.value)) {
      throw new Error(String(this.error));
    }

    return this.value;
  }

  unwrapErr(): E {
    if (!isUndefined(this.error)) {
      return this.error;
    }

    throw new Error("Ok value: " + String(this.value));
  }

  unwrapOr(def: T): T {
    if (isUndefined(this.value)) {
      return def;
    }

    return this.value;
  }

  unwrapOrElse(fn: (err: E) => T): T {
    if (!isUndefined(this.error)) {
      return fn(this.error);
    }

    if (isUndefined(this.value)) {
      //unreachable code
      throw new Error(
        "Unexpected Result value:" +
          String(this.value) +
          " error:" +
          String(this.error)
      );
    }

    return this.value;
  }

  map<U>(fn: (val: T) => U): Result<U, E> {
    if (isUndefined(this.value)) {
      return new Result<U, E>(this.value, this.error);
    }
    return new Result<U, E>(fn(this.value), undefined);
  }

  mapErr<U>(fn: (err: E) => U): Result<T, U> {
    if (!isUndefined(this.error)) {
      return new Result<T, U>(undefined, fn(this.error));
    }
    return new Result<T, U>(this.value, this.error);
  }

  mapOr<U>(def: U, fn: (val: T) => U): U {
    if (isUndefined(this.value)) {
      return def;
    }
    return fn(this.value);
  }

  mapOrElse<U>(fnErr: (err: E) => U, fnOk: (val: T) => U): U {
    if (!isUndefined(this.error)) {
      return fnErr(this.error);
    }

    if (isUndefined(this.value)) {
      //unreachable code
      throw new Error(
        "Unexpected Result value:" +
          String(this.value) +
          " error:" +
          String(this.error)
      );
    }

    return fnOk(this.value);
  }

  match<U>(fn: ResultMatch<T, E, U>): U {
    if (!isUndefined(this.error)) {
      if (isFunction(fn.Err)) {
        return fn.Err(this.error);
      }
      return fn.Err;
    }

    if (!isUndefined(this.value)) {
      if (isFunction(fn.Ok)) {
        return fn.Ok(this.value);
      }
      return fn.Ok;
    }

    //unreachable code
    throw new Error(
      "Unexpected Result value:" +
        String(this.value) +
        " error:" +
        String(this.error)
    );
  }

  contains(val: T): boolean {
    if (isUndefined(this.value)) {
      return false;
    }
    return this.value === val;
  }

  containsErr(err: E): boolean {
    if (isUndefined(this.value)) {
      return this.error === err;
    }
    return false;
  }

  expect(msg: string): T {
    if (isUndefined(this.value)) {
      throw new Error(msg + ": " + String(this.error));
    }

    return this.value;
  }

  expectErr(msg: string): E {
    if (!isUndefined(this.error)) {
      return this.error;
    }

    throw new Error(msg + ": " + String(this.value));
  }

  iter(): Iterator<T> {
    return new OptionIterator<T>(this.value);
  }

  and<U>(v: Result<U, E>): Result<U, E> {
    if (isUndefined(this.value)) {
      return new Result<U, E>(this.value, this.error);
    }
    return v;
  }

  andThen<U>(fn: (val: T) => Result<U, E>): Result<U, E> {
    if (isUndefined(this.value)) {
      return new Result<U, E>(this.value, this.error);
    }
    return fn(this.value);
  }

  or<F>(v: Result<T, F>): Result<T, F> {
    if (isUndefined(this.value)) {
      return v;
    }
    return new Result<T, F>(this.value, undefined);
  }

  orElse<F>(fn: (err: E) => Result<T, F>): Result<T, F> {
    if (!isUndefined(this.error)) {
      return fn(this.error);
    }
    return new Result<T, F>(this.value, undefined);
  }

  cloned(): Result<T, E> {
    const ret = new Result<T, E>(undefined, undefined);

    if (!isUndefined(this.value)) {
      ret.value = JSON.parse(JSON.stringify(this.value));
    }

    if (!isUndefined(this.error)) {
      ret.error = JSON.parse(JSON.stringify(this.error));
    }

    return ret;
  }

  transpose(): Option<Result<T, E>> {
    if (this.value instanceof Option) {
      const result = this.value as any;

      if (isUndefined(result.value)) {
        return Option.None;
      }
      return Option.Some(new Result<T, E>(result.value, undefined));
    }

    if (isUndefined(this.value)) {
      return Option.Some(new Result<T, E>(undefined, this.error));
    }

    throw new Error("Cannot transpose:" + this);
  }

  [Symbol.iterator](): Iterator<T> {
    return new OptionIterator<T>(this.value);
  }

  toString(): string {
    if (isUndefined(this.value)) {
      if (this.error instanceof Option) {
        const a = this.error as any;
        return `Err(${a.toString()})`;
      }

      if (this.error instanceof Result) {
        const a = this.error as any;
        return `Err(${a.toString()})`;
      }

      return `Err(${JSON.stringify(this.error)})`;
    }

    if (this.value instanceof Option) {
      const a = this.value as any;
      return `Ok(${a.toString()})`;
    }

    if (this.value instanceof Result) {
      const a = this.value as any;
      return `Ok(${a.toString()})`;
    }

    return `Ok(${JSON.stringify(this.value)})`;
  }

  toJSON(): object {
    if (isUndefined(this.value)) {
      return { error: this.error };
    }
    return { value: this.value };
  }

  equals(v: Result<T, E>): boolean {
    return JSON.stringify(this) === JSON.stringify(v);
  }
}

advancedOk = Result.Ok;
advancedErr = Result.Err;

//for making bi-directional dependency Option -> Result

interface OptionBase<T> {
  transpose: <E>() => Result<Option<T>, E>;
  toString(): string;
}

OptionBase.prototype.transpose = function <T, E>(): Result<Option<T>, E> {
  const value = this.valueOf();

  if (isUndefined(value)) {
    return Result.Ok(Option.None);
  }

  if (value instanceof Result) {
    const result = value as any;

    if (isUndefined(result.value)) {
      return Result.Err(result.error);
    }

    return Result.Ok(Option.Some(result.value));
  }

  throw new Error("Cannot transpose:" + this.toString());
};

OptionBase.prototype.toString = function <T>(): string {
  const value = this.valueOf();

  if (isUndefined(value)) {
    return "None";
  }

  if (value instanceof Option) {
    const a = value as any;
    return `Some(${a.toString()})`;
  }

  if (value instanceof Result) {
    const a = value as any;
    return `Some(${a.toString()})`;
  }

  return `Some(${JSON.stringify(value)})`;
};
