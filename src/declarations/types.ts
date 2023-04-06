import * as e from "express";

// **** Misc **** //

export type TAll = string | number | boolean | null | object;

// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
  error?: string;
}
