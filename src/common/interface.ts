import { Request } from "express";
import { admin } from "@prisma/client";
export interface RequestToken extends Request {
    tokenData: any
}